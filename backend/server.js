const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/familles',  require('./routes/familles'));
app.use('/api/appareils', require('./routes/appareils'));
app.use('/api/calculs',   require('./routes/calculs'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur demarre sur http://localhost:${PORT}`);
});