// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
server.use(express.json());
// to enable parsing of json bodies for post requests
// server.use(express.json());

// TODO: your code to handle requests

// Request de "/posts" get,post,put,delete
server
	.route("/posts")
	.get((req, res) => {
		res.send(posts);
	})
	.post((req, res) => {
		let propsTest = ["author", "title", "contents"];
		let post = req.body;
		let err = {
			error: "No se recibieron los parámetros necesarios para crear el Post",
		};

		if (propsTest.every((p) => p in post)) {
			posts.push(post);
			res.status(200).send(post);
		} else {
			res.status(404).send(err);
		}
	})
	.put((req, res) => {
		let propsTest = ["id", "title", "contents"];
		let post = req.body;
		let err = {
			error:
				"No se recibieron los parámetros necesarios para modificar el Post",
		};
		if (posts.length === 0) {
			res.status(404).send({ error: "id no valido" });
		} else if (posts.length === 1 && post.id === 0) {
			if (propsTest.every((p) => p in post)) {
				posts[post.id].title = post.title;
				posts[post.id].contents = post.contents;

				res.status(200).send(posts[post.id]);
			} else {
				res.status(404).send(err);
			}
		} else if (post.id <= posts.length - 1) {
			if (propsTest.every((p) => p in post)) {
				posts[post.id].title = post.title;
				posts[post.id].contents = post.contents;

				res.status(200).send(posts[post.id]);
			} else {
				res.status(404).send(err);
			}
		} else {
			res.status(404).send(err);
		}
	})
	.delete((req, res) => {
		let body = req.body;

		if (posts.length === 0) {
			res.status(404).send({ error: "no se puede eliminar, posts vacíos" });
		} else {
			if (body.id <= posts.length - 1) {
				posts = posts.filter((p) => posts.indexOf(p) != body.id);
				res.status(200).send({ success: true });
			} else {
				res.status(404).send({ error: "id no valida" });
			}
		}
	});

//Request de post para "/posts/author/:author"
server.post("/posts/author/:author", (res, req) => {
	let author = req.params.author;
	let propTest = ["title", "contents"];
	let buscador = (name) => {
		posts.forEach((p) => {
			if (p.author === name) return true;
			return false;
		});
		if (buscador(author)) {
			if (propTest.every((p) => p in req.body)) {
				let obj = {
					author: author,
					title: req.body.title,
					contents: req.body.contents,
				};
				res.status(200).send(obj);
			} else {
				res.status(404).send({
					error:
						"No se recibieron los parámetros necesarios para crear el Post",
				});
			}
		}
	};
});

// Request de get para ruta "/posts/:author"

server.get("/posts/:author", (req, res) => {
	let postAuthor = [];
	let autor = req.params.author;
	let comprobarAutor = (name) => {
		posts.some((p) => p.author === name);
	};

	if (comprobarAutor(autor)) {
		posts.forEach((p) => {
			if (p.author === autor) {
				postAuthor.push(p);
			}
		});
		res.status(200).send(post);
	} else {
		res.status(404).send({
			error: "No existe ningun post del autor indicado",
		});
	}
});

module.exports = { posts, server };
