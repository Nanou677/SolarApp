const pool = require('../config/db');

const getByFamille = async (req, res) => {
  try {
    console.log('[API] GET appareils famille:', req.params.famille_id);

    const result = await pool.query(
      'SELECT * FROM appareil WHERE famille_id = $1 ORDER BY created_at DESC',
      [req.params.famille_id]
    );

    console.log('[API] appareils trouvés:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('[API] Erreur getByFamille appareil:', err);
    res.status(500).json({ erreur: err.message });
  }
};

const create = async (req, res) => {
  try {
    console.log('[API] POST appareil body:', req.body);

    const { famille_id, nom, puissance_w, heures_nuit } = req.body;

    if (!famille_id || !nom || !puissance_w) {
      return res.status(400).json({
        erreur: 'famille_id, nom et puissance_w sont obligatoires'
      });
    }

    const result = await pool.query(
      `INSERT INTO appareil (famille_id, nom, puissance_w, heures_nuit)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [famille_id, nom, puissance_w, heures_nuit || 0]
    );

    console.log('[API] appareil inséré:', result.rows[0]);
    res.status(201).json({
      message: 'Appareil ajoute avec succes',
      appareil: result.rows[0]
    });
  } catch (err) {
    console.error('[API] Erreur create appareil:', err);
    res.status(500).json({ erreur: err.message });
  }
};

const remove = async (req, res) => {
  try {
    console.log('[API] DELETE appareil id:', req.params.id);

    const result = await pool.query(
      'DELETE FROM appareil WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erreur: 'Appareil non trouve' });
    }

    console.log('[API] appareil supprime:', result.rows[0]);
    res.json({ message: 'Appareil supprime avec succes' });
  } catch (err) {
    console.error('[API] Erreur remove appareil:', err);
    res.status(500).json({ erreur: err.message });
  }
};

module.exports = { getByFamille, create, remove };