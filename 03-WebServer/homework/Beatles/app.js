var http = require("http");
var fs = require("fs");
const { isGeneratorFunction } = require("util/types");

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

http
	.createServer(function (req, res) {
		//ruta /api, devuelve obj beatles
		if (req.url === "/api") {
			res
				.writeHead(200, { "Content-Type": "application/json" })
				.end(JSON.stringify(beatles));
		}
		//ruta /api/name devuelve obj del beatle individual
		if (req.url.substring(0, 5) === "/api/" && req.url.length > 5) {
			//req.url example: john%20lennon, tienen que matchear John Lennon
			let beatleReq = req.url.split("/").pop();
			let beatlefound = beatles.find(
				(b) =>
					beatleReq.toLocaleLowerCase() ===
					encodeURI(b.name.toLocaleLowerCase())
			);

			if (beatlefound) {
				res
					.writeHead(200, { "Content-Type": "application/json" })
					.end(JSON.stringify(beatlefound));
			} else {
				res
					.writeHead(404, { "Content-Type": "text/plain" })
					.end("Sorry, nothing was found :C");
			}
		}
		//ruta / retorna home pagina html
		if (req.url === "/") {
			res.writeHead(200, { "Content-Type": "text/html" });
			/* let html = fs.readFileSync(__dirname + "/index.html");
			res.end(html); */
			fs.createReadStream("./index.html").pipe(res);
		}

		//beatle html profile page

		let beatleReq = req.url.split("/").pop();
		let beatlefound = beatles.find(
			(b) =>
				beatleReq.toLocaleLowerCase() === encodeURI(b.name.toLocaleLowerCase())
		);

		/* if (beatlefound) {
			res.writeHead(200, { "Content-Type": "text/html" });
			let html = fs.readFile(__dirname + "/beatle.html");
			html.replace(/{name}/g, beatlefound.name);
			html.replace("{birthday}", beatlefound.birthdate);
			html.replace("{url}", beatlefound.profilePic);
			res.end(html);
		} else {
			res
				.writeHead(404, { "Content-Type": "text/plain" })
				.end("Sorry, nothing was found :C");
		} */

		//-----------------------------------------------------------------------------
		/* let searchedBeatle = req.url.split("/").pop(); // john%20lennon
		let foundBeatle = beatles.find(
			(beatle) =>
				searchedBeatle.toLowerCase() === encodeURI(beatle.name.toLowerCase())
		); //"John Lennon"
		if (foundBeatle) {
			res.writeHead(200, { "Content-Type": "text/html" });
			let html = fs.readFileSync(`${__dirname}/beatle.html`, "utf-8");
			html = html.replace(/{name}/g, foundBeatle.name);
			html = html.replace("{birthday}", foundBeatle.birthdate);
			html = html.replace("{url}", foundBeatle.profilePic);
			res.end(html);
		} else {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("No se encontro un Beatle!");
		} */
	})
	.listen(3000);
