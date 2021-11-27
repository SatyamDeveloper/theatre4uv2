require("./db/conn");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 2000;
const Movie = require("./models/movie");
const Website = require("./models/website");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));

app.get("/database/movie", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get("/database/website", async (req, res) => {
  const website = await Website.find();
  res.json(website);
});

app.get("/", async (req, res) => {
  res.render("index", { page: "home" });
});

app.get("/watchlist", async (req, res) => {
  res.render("index", { page: "watchlist" });
});

app.get("/movie/:slug", async (req, res) => {
  res.render("index", { page: "player", currVidId: req.params.slug });
});

app.get("/movie/:slug/:e", async (req, res) => {
  res.render("index", { page: "player", currVidId: req.params.slug });
});


app.listen(port, () => console.log(`http://localhost:${port}`));
