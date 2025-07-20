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

router.post('/login', async (req, res) => {
  const { email, mdp } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: '❌ Utilisateur non trouvé' });
    }

    if (user.mdp !== mdp) {
      return res.status(401).json({ message: '❌ Mot de passe incorrect' });
    }

    res.status(200).json({ message: '✅ Connexion réussie', user });
  } catch (error) {
    console.error('❌ Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


module.exports = router;
