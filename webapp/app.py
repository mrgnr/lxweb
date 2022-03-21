from gevent import monkey

monkey.patch_all()
from gevent.pywsgi import WSGIServer
import flask
from canonicalwebteam.flask_base.app import FlaskBase

from webapp.views import (
    container_start,
    container_stop,
    containers_list,
    events,
    vms_list,
)

app = FlaskBase(
    __name__,
    "lxweb",
    template_folder="../templates",
    static_folder="../static",
)

app.add_url_rule("/api/container/start/<name>", view_func=container_start)
app.add_url_rule("/api/container/stop/<name>", view_func=container_stop)
app.add_url_rule("/api/containers/list", view_func=containers_list)
app.add_url_rule("/api/virtual_machines/list", view_func=vms_list)
app.add_url_rule("/api/events", view_func=events)


@app.route("/")
def index():
    return flask.render_template("index.html")
