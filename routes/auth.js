const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  console.log("✅ Requête reçue :", req.body);
  const { nom, email, mdp } = req.body;

  if (!nom || !email || !mdp) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  try {
    const newUser = await prisma.user.create({
      data: { nom, email, mdp }
    });

    console.log("🎉 Utilisateur inscrit :", newUser);
    res.json({ message: "Utilisateur inscrit avec succès !" });

  } catch (err) {
    console.error("❌ Erreur Prisma :", err);
    res.status(500).json({ error: "Erreur serveur lors de l'inscription" });
  }
});

module.exports = router;
