from gevent import monkey
monkey.patch_all()

import flask
from canonicalwebteam.flask_base.app import FlaskBase

from webapp.views import (
    instance_restart,
    instance_start,
    instance_stop,
    instances_list,
    events,
)

app = FlaskBase(
    __name__,
    "lxweb",
    template_folder="../templates",
    static_folder="../static",
)

app.add_url_rule("/api/instance/restart/<name>", view_func=instance_restart)
app.add_url_rule("/api/instance/start/<name>", view_func=instance_start)
app.add_url_rule("/api/instance/stop/<name>", view_func=instance_stop)
app.add_url_rule("/api/instances/list", view_func=instances_list)
app.add_url_rule("/api/events", view_func=events)


@app.route("/")
def index():
    return flask.render_template("index.html")
