const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/auth'));

app.listen(PORT, () => {
  console.log("🚀 Serveur lancé sur le port ${PORT}");
});