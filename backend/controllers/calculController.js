const pool = require('../config/db');

const calculer = async (req, res) => {
  const famille_id = req.params.famille_id;
  try {
    const result = await pool.query(
      'SELECT * FROM appareil WHERE famille_id = $1',
      [famille_id]
    );

    const appareils = result.rows;
    if (appareils.length === 0)
      return res.status(400).json({ erreur: 'Aucun appareil trouve pour cette famille' });

    let total_w_jour  = 0;
    let total_wh_nuit = 0;

    appareils.forEach(a => {
      total_w_jour  += a.puissance_w;                    // somme des watts uniquement
      total_wh_nuit += a.puissance_w * a.heures_nuit;    // watts × heures nuit
    });

    const puissance_panneau_w  = (total_w_jour + total_wh_nuit) * 100 / 40;
    const capacite_batterie_wh = total_wh_nuit / 1.5;

    await pool.query(
      `INSERT INTO resultat_calcul
        (famille_id, total_w_jour, total_wh_nuit, puissance_panneau_w, capacite_batterie_wh)
       VALUES ($1, $2, $3, $4, $5)`,
      [famille_id, total_w_jour, total_wh_nuit, puissance_panneau_w, capacite_batterie_wh]
    );

    res.json({
      total_w_jour,
      total_wh_nuit,
      puissance_panneau_w,
      capacite_batterie_wh
    });
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};

const getHistorique = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM resultat_calcul
       WHERE famille_id = $1
       ORDER BY date_calcul DESC`,
      [req.params.famille_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
};

module.exports = { calculer, getHistorique };