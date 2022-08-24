require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
    res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const users = require("./users")

const { validateMovie } = require("./validator");
const {validateUser} = require("./validator")
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", users.getUser);
app.get("/api/users/:id", users.getUserById);
app.post("/api/users", validateUser, users.getNewUser);
app.put("/api/users/:id", validateUser, users.updateUser);
app.put("/api/movies/:id", validateMovie, movieHandlers.getMovies);
app.delete("/api/users/:id", users.deleteUser);




app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened");
    } else {
        console.log(`Server is listening on ${port}`);
    }
});