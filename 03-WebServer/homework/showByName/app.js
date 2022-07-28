var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor
http
	.createServer(function (req, res) {
		fs.readFile(`./images${req.url}.jpg`, (err, data) => {
			if (err) {
				res.writeHead(404); //Ponemos el status del response a 404: Not Found
				res.end(); //No devolvemos nada más que el estado.
			}
			res.writeHead(200, { "Content-Type": "image/jpg" });
			res.end(data);
		});
	})
	.listen(3000);
