"use strict";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let categories = ["funnyJoke", "lameJoke"];

let funnyJoke = [
  {
    joke: "Dlaczego komputer poszedł do lekarza?",

    response: "Bo złapał wirusa!",
  },

  {
    joke: "Dlaczego komputer nie może być głodny?",

    response: "Bo ma pełen dysk!",
  },

  {
    joke: "Co mówi jeden bit do drugiego?",

    response: "„Trzymaj się, zaraz się przestawiamy!”",
  },
];

let lameJoke = [
  {
    joke: "Dlaczego programiści preferują noc?",

    response: "Bo w nocy jest mniej bugów do łapania!",
  },

  {
    joke: "Jak nazywa się bardzo szybki programista?",

    response: "Błyskawiczny kompilator!",
  },
];

const jokeCategories = {
  funnyJoke,
  lameJoke,
};

app.get("/jokebook/categories", (req, res) => {
  res.json({ categories });
});

app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  const joke =
    jokeCategories[category][
      Math.floor(Math.random() * jokeCategories[category].length)
    ];

  if (!joke) {
    return res.status(404).json({ error: "No jokes for category " + category });
  }

  res.json(joke);
});

app.get("/jokebook/joke", (req, res) => {
  const allJokes = Object.values(jokeCategories).flat();
  const joke = allJokes[Math.floor(Math.random() * allJokes.length)];

  res.json(joke);
});

app.post("/jokebook/joke/:category", express.json(), (req, res) => {
  const category = req.params.category;
  const { joke, response } = req.body;

  if (!jokeCategories[category]) {
    return res.status(404).json({ error: "Category not found" });
  }

  jokeCategories[category].push({ joke, response });
  res.json({ message: "Joke added successfully" });
});

app.get("/jokebook/stats", (req, res) => {
  const counts = {};
  categories.forEach((category) => {
    counts[category] = jokeCategories[category].length;
  });

  res.json(counts);
});

app.get("/jokebook/search", (req, res) => {
  const query = req.query.word?.toLocaleLowerCase();
  if (!query) {
    return res
      .status(400)
      .json({ error: "Query parameter 'word' is required" });
  }

  const results = Object.entries(jokeCategories).flatMap(([category, jokes]) =>
    jokes
      .filter(
        (joke) =>
          joke.joke.toLocaleLowerCase().includes(query) ||
          joke.response.toLocaleLowerCase().includes(query),
      )
      .map((joke) => ({ ...joke, category })),
  );

  res.json({ count: results.length, jokes: results });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
