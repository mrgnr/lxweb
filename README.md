# lxweb

An experimental web-based instance manager for LXD.

This project is implemented using the [Flask][flask] web framework, [React][react] for frontend
components and [Vanilla Framework][vanilla] for layout and styling.

## Local development

The simplest way to run lxweb locally is to use [dotrun][dotrun].

If you want to manage a local LXD server listening on a Unix socket, you will need to give dotrun
permission to access the socket:

```
$ sudo snap connect dotrun:lxd lxd:lxd
```

Run the project with:

```
$ dotrun
```

Once the server has started, you cah visit http://localhost:8701/ in your browser.

[flask]: https://flask.palletsprojects.com/en/2.1.x/
[react]: https://reactjs.org/
[vanilla]: https://vanillaframework.io/
[dotrun]: https://github.com/canonical-web-and-design/dotrun/
