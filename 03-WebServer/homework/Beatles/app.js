var http = require("http");
var fs = require("fs");

var beatles = [
	{
		name: "John Lennon",
		birthdate: "09/10/1940",
		profilePic:
			"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
	},
	{
		name: "Paul McCartney",
		birthdate: "18/06/1942",
		profilePic:
			"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
	},
	{
		name: "George Harrison",
		birthdate: "25/02/1946",
		profilePic:
			"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
	},
	{
		name: "Richard Starkey",
		birthdate: "07/08/1940",
		profilePic:
			"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
	},
];

let separate = (name) => {
	return name.split(" ");
};

let nameChecker = (name) => {
	beatles.forEach((b) => {
		if (b.name === name) {
			return b;
		} else {
			throw new Error();
		}
	});
};

http
	.createServer(function (req, res) {
		//home-html
		if (req.url === "/") {
			res.writeHead(200, { "Content-Type": "text/html" });
			let html = fs.readFileSync(`${__dirname}/index.html`);
			res.end(html);
		}

		//obj beatles-json
		if (req.url === "/api") {
			res.writeHead(200, { "Content-Type": "application/json" }); //Vamos a devolver texto en formato JSON
			res.end(JSON.stringify(beatles)); //Antes de enviar el objeto, debemos parsearlo y transformarlo a un string JSON
		}

		//obj individual beatle-json
		if (req.url.substring(0, 1) === "/api" && req.url.length > 5) {
			let beatleInfo = req.url.split("/").pop().split("%20").join(" ");
			let found = beatles.find((b) => beatleInfo === b.name);
			if (found) {
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify(found));
			} else {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end("beatle not found!");
			}
		} else {
			res.writeHead(404, { "Content-Type": "application/json" }); //Ponemos el status del response a 404: Not Found
			res.end("beatle not found!"); //No devolvemos nada más que el estado.
		}
	})
	.listen(3001);
