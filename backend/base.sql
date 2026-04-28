CREATE DATABASE solar_app_v3;
\c solar_app_v3

CREATE TABLE famille (
  id         SERIAL PRIMARY KEY,
  nom        VARCHAR(100) NOT NULL,
  adresse    VARCHAR(200),
  telephone  VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appareil (
  id           SERIAL PRIMARY KEY,
  famille_id   INT NOT NULL,
  nom          VARCHAR(100) NOT NULL,
  puissance_w  FLOAT NOT NULL,
  heures_nuit  FLOAT NOT NULL DEFAULT 0,
  created_at   TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (famille_id) REFERENCES famille(id) ON DELETE CASCADE
);

CREATE TABLE resultat_calcul (
  id                   SERIAL PRIMARY KEY,
  famille_id           INT NOT NULL,
  total_w_jour         FLOAT NOT NULL,
  total_wh_nuit        FLOAT NOT NULL,
  puissance_panneau_w  FLOAT NOT NULL,
  capacite_batterie_wh FLOAT NOT NULL,
  date_calcul          TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (famille_id) REFERENCES famille(id) ON DELETE CASCADE
);