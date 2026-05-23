const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.json({ message: "API fonctionne" });
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html")
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});
