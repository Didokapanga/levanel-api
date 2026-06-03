# Levannel API

API REST sécurisée développée avec Node.js, TypeScript, Express et PostgreSQL pour la gestion des opérations métier de Levannel.

## Fonctionnalités

- Authentification JWT
- Gestion des utilisateurs
- Gestion des rôles
- Gestion des agences
- Gestion des employés
- Gestion des transferts clients
- Gestion des retraits clients
- Contrôle d'accès par rôle
- Journalisation des opérations
- Documentation Swagger
- Déploiement Docker
- Intégration CI/CD GitHub Actions

## Technologies

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Docker
- Docker Compose
- JWT
- Swagger OpenAPI

## Installation

### Cloner le projet

```bash
git clone <repository-url>
cd levannel-api
```

## Installer les dépendances

```bash
npm install
```
## Variables d'environnement

### Créer un fichier .env

```bash
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=levannel_db

JWT_SECRET=secret
```
## Lancement en développement

```bash
npm run dev
```
## Build production

```bash
npm run build
npm start
```
## Docker

### Développement

```bash
docker compose up
```
## Production

```bash
docker compose -f docker-compose.prod.yml up --build
```



