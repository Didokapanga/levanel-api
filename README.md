# Levannel API

API backend de gestion d'agence de voyage développée avec Node.js, TypeScript, Express et PostgreSQL.

## Technologies

* Node.js
* TypeScript
* Express
* PostgreSQL
* Docker
* Docker Compose
* JWT Authentication

## Installation

### Cloner le projet

```bash
git clone <repository-url>
cd levannel-api
```

### Installer les dépendances

```bash
npm install
```

### Configurer les variables d'environnement

Créer un fichier `.env` :

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=levannel_db
JWT_SECRET=secret
```

### Lancer en développement

```bash
npm run dev
```

## Docker

### Mode développement

```bash
docker compose up
```

### Mode production

```bash
docker compose -f docker-compose.prod.yml up --build
```

## Structure du projet

```txt
src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middleware/
├── database/
└── utils/
```

## Auteur

Dido Kapanga
