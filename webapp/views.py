import json
import queue
import threading
import traceback

from quart import (jsonify, Response)
import pylxd
from pylxd import Client

client = Client()


async def instance_restart(name):
    try:
        instance = client.instances.get(name)

        if instance.status == "Stopped":
            instance.start()
        else:
            instance.restart()
    except pylxd.exception.NotFound:
        return jsonify({"errors": "Instance not found"}, 404)

    return jsonify({"status": "success"})


async def instance_start(name):
    try:
        instance = client.instances.get(name)
        instance.start()
    except pylxd.exception.NotFound:
        return jsonify({"errors": "Instance not found"}, 404)

    return jsonify({"status": "success"})


async def instance_stop(name):
    try:
        instance = client.instances.get(name)
        instance.stop()
    except pylxd.exception.NotFound:
        return jsonify({"errors": "Instance not found"}, 404)

    return jsonify({"status": "success"})


async def instances_list():
    instances_info = client.instances.all()
    instances = []

    for instance in instances_info:
        instances.append(
            {
                "name": instance.name,
                "description": instance.description,
                "type": instance.type,
                "created_at": instance.created_at,
                "last_used_at": instance.last_used_at,
                "status": instance.status,
                "dirty": instance.dirty,
                "stateful": instance.stateful,
                "ephemeral": instance.ephemeral,
                "config": instance.config,
            }
        )

    return jsonify(instances)


async def events():
    class EventsClient(pylxd.client._WebsocketClient):
        def handshake_ok(self):
            self.messages = queue.Queue()

        def received_message(self, message):
            message = message.data.decode("utf-8")
            self.messages.put(message)

    def stream_events():
        filter = set([pylxd.EventType.Lifecycle])
        events_client = client.events(
            websocket_client=EventsClient, event_types=filter
        )
        events_client.connect()
        thread = threading.Thread(target=events_client.run)
        thread.start()

        try:
            while True:
                message = events_client.messages.get()
                yield f"event: message\n\ndata: {message}\n\n"
        except GeneratorExit:
            print("!!! close connection")
            if events_client is not None:
                events_client.close()
            thread.join()
            print("!!! connection closed")

    return Response(stream_events(), mimetype="text/event-stream")
