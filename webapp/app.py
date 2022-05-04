from quart import render_template, Quart

from webapp.views import (
    instance_restart,
    instance_start,
    instance_stop,
    instances_list,
    events,
)

app = Quart(
    __name__,
    template_folder="../templates",
    static_folder="../static",
    static_url_path="/static",
)

app.add_url_rule("/api/instance/restart/<name>", view_func=instance_restart)
app.add_url_rule("/api/instance/start/<name>", view_func=instance_start)
app.add_url_rule("/api/instance/stop/<name>", view_func=instance_stop)
app.add_url_rule("/api/instances/list", view_func=instances_list)
app.add_url_rule("/api/events", view_func=events)


@app.route("/")
async def index():
    return await render_template("index.html")
