const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log("Erreur MongoDB", err));

const User = require("./models/User");

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.post("/api/users", async (req, res) => {

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    10
  );

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  await newUser.save();

  res.json({
    message: "Utilisateur créé avec succès"
  });
});

app.post("/api/login", async (req, res) => {

  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    return res.json({
      message: "Utilisateur introuvable"
    });
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validPassword) {
    return res.json({
      message: "Mot de passe incorrect"
    });
  }

  res.json({
    message: "Connexion réussie"
  });
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Utilisateur modifié avec succès",
      user: {
        id: updatedUser._id,
        name: updatedUser.name
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Utilisateur supprimé avec succès"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});

