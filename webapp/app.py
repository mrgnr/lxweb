import flask
from canonicalwebteam.flask_base.app import FlaskBase

from webapp.views import (
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

app.add_url_rule("/api/containers/list", view_func=containers_list)
app.add_url_rule("/api/virtual_machines/list", view_func=vms_list)
app.add_url_rule("/api/events", view_func=events)


@app.route("/")
def index():
    return flask.render_template("index.html")
