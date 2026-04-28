const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM famille ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur getAll familles:', err);
    res.status(500).json({ erreur: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM famille WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erreur: 'Famille non trouvee' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur getById famille:', err);
    res.status(500).json({ erreur: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { nom, adresse, telephone } = req.body;

    console.log('BODY RECU:', req.body);

    if (!nom || nom.trim() === '') {
      return res.status(400).json({ erreur: 'Le nom est obligatoire' });
    }

    const result = await pool.query(
      `INSERT INTO famille (nom, adresse, telephone)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        nom.trim(),
        adresse && adresse.trim() !== '' ? adresse.trim() : null,
        telephone && telephone.trim() !== '' ? telephone.trim() : null
      ]
    );

    res.status(201).json({
      message: 'Famille creee avec succes',
      famille: result.rows[0]
    });
  } catch (err) {
    console.error('Erreur create famille:', err);
    res.status(500).json({ erreur: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM famille WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ erreur: 'Famille non trouvee' });
    }

    res.json({ message: 'Famille supprimee avec succes' });
  } catch (err) {
    console.error('Erreur remove famille:', err);
    res.status(500).json({ erreur: err.message });
  }
};

module.exports = { getAll, getById, create, remove };