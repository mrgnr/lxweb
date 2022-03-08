import json
import queue
import threading
import traceback

import flask
import pylxd
from pylxd import Client

client = Client()

def containers_list():
    containers_info = client.containers.all()
    containers = []

    for container in containers_info:
        containers.append(
            {
                "name": container.name,
                "description": container.description,
                "type": container.type,
                "created_at": container.created_at,
                "last_used_at": container.last_used_at,
                "status": container.status,
                "dirty": container.dirty,
                "stateful": container.stateful,
                "ephemeral": container.ephemeral,
                "config": container.config,
            }
        )

    return flask.jsonify(containers)


def vms_list():
    vms_info = client.virtual_machines.all()
    vms = []

    for vm in vms_info:
        vms.append(
            {
                "name": vm.name,
                "description": vm.description,
                "type": vm.type,
                "created_at": vm.created_at,
                "last_used_at": vm.last_used_at,
                "status": vm.status,
                "dirty": vm.dirty,
                "stateful": vm.stateful,
                "ephemeral": vm.ephemeral,
                "config": vm.config,
            }
        )

    return flask.jsonify(vms)


def events():
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
        threading.Thread(target=events_client.run).start()

        try:
            while True:
                message = events_client.messages.get()
                yield f"event: message\n\ndata: {message}\n\n"
        except GeneratorExit:
            print("killing thread")
            events_client.terminate()
            print("thread stopped")

    return flask.Response(stream_events(), mimetype="text/event-stream")
