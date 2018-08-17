const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const axios = require("axios")
const cheerio = require("cheerio")
const logger = require("morgan")

const app = express();

const db = require("./models");

const PORT = process.env.PORT || 8080;

app.use(logger("dev"));


app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(express.static("public"));



const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)


app.get("/scrape", (req, res) => {
    axios.get("http://www.bbc.com").then(response => {
        const $ = cheerio.load(response.data);
        $("div img").each((i, element) => {
            var result = {};

            result.title = $(this).text();
            result.src = $(this).text();

            result.link = $(this).attr("href");

            db.Article.create(result).then((dbArticle) => {

                res.json(dbArticle);
            })
                .catch(err => res.json("!!!!!! " + err));

            res.send("scrape complete");


        })
    });
});
    app.get("/articles", (req, res) => {
        db.Article.find({})
            .then((dbArticle) => res.json(dbArticle))
            .catch(err => res.json(err))
    });

   


    app.listen(PORT, () =>
    console.log("listening to PORT http://localhost:" + PORT));