# SuperHero Manager

## Description

SuperHero Manager est une application full-stack permettant de gérer une base de données de super-héros.

Le projet a été développé avec :
- React + TypeScript + Vite
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT pour l’authentification

L’application permet :
- l’authentification utilisateur
- la gestion des rôles
- l’ajout, la modification et la suppression de héros
- l’upload d’images
- la recherche et le filtrage des héros
- l’historique des actions administrateur

---

# Technologies utilisées

## Frontend
- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Yup

## Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- Multer
- bcrypt

---

# Installation du projet

## Prérequis

Installer :
- Node.js
- MongoDB Community Server
- MongoDB Compass (optionnel)

---

# 1. Backend

Ouvrir un terminal :

```bash
cd backend
npm install
```

Créer un fichier `.env` dans le dossier `backend` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/superhero-manager
JWT_SECRET=supersecretkey
```

Lancer le backend :

```bash
npm run dev
```

Résultat attendu :

```txt
MongoDB connecté
Serveur lancé sur http://localhost:5000
```

---

# 2. Import des héros

Dans un nouveau terminal :

```bash
cd backend
npx ts-node src/seed.ts
```

Les héros seront automatiquement importés dans MongoDB.

---

# 3. Frontend

Ouvrir un nouveau terminal :

```bash
cd frontend
npm install
npm run dev
```

Ouvrir ensuite :

```txt
http://localhost:5173
```

---

# Comptes de test

## Admin

```txt
Email : admin@test.com
Mot de passe : 123456
```

### Permissions
- Ajouter un héros
- Modifier un héros
- Supprimer un héros
- Accès à la page administration
- Accès aux logs

---

## Editor

```txt
Email : editor@test.com
Mot de passe : 123456
```

### Permissions
- Ajouter un héros
- Modifier un héros

---

## Visitor

```txt
Email : visitor@test.com
Mot de passe : 123456
```

### Permissions
- Consultation uniquement

---

# Fonctionnalités principales

- Connexion utilisateur avec JWT
- Protection des routes
- Dashboard avec recherche et filtres
- Affichage détaillé des héros
- Ajout de héros avec upload d’image
- Modification des héros
- Suppression des héros
- Gestion des rôles
- Historique des actions administrateur

---

# Images

Les images des héros existants sont stockées dans :

```txt
frontend/public/images
```

Les images uploadées sont stockées dans :

```txt
backend/src/uploads
```

---

#
---

# Auteur

Projet réalisé par Mehdi Khinouche dans le cadre du TP SuperHero Manager