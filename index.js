"use strict";

const express = require("express");
const app = express();

// define endpoint for exercise 1 here
app.get("/math/circle/:r", (req, res) => {
  const r = Number(req.params.r);
  const area = Math.PI * r * r;
  const circumference = 2 * Math.PI * r;

  if (!Number.isFinite(r) || r < 0) {
    return res.status(400).json({ error: "Promień musi być liczbą nieujemną" });
  }

  const result = {
    area: Number(area.toFixed(2)),
    circumference: Number(circumference.toFixed(2)),
  };

  res.json(result);
});

app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = Number(req.params.width);
  const height = Number(req.params.height);

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width < 0 ||
    height < 0
  ) {
    return res
      .status(400)
      .json({ error: "Szerokość i wysokość muszą być liczbami nieujemnymi" });
  }

  const area = width * height;
  const perimeter = 2 * (width + height);

  const result = {
    area: Number(area.toFixed(2)),
    perimeter: Number(perimeter.toFixed(2)),
  };

  res.json(result);
});

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = Number(req.params.base);
  const exponent = Number(req.params.exponent);
  const root = req.query.root === "true";

  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = Math.pow(base, exponent);

  if (root) {
    const root = Math.sqrt(base);
    return res.json({
      result: Number(result.toFixed(2)),
      root: Number(root.toFixed(2)),
    });
  }

  res.json({ result: Number(result.toFixed(2)) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
