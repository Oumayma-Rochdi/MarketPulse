# MarketPulse 🛍️

![MarketPulse Logo](public/img/Logo.png)

**MarketPulse** est une plateforme e-commerce innovante basée sur le web scraping et le data mining, développée dans le cadre d'un Projet de Fin d'Études (PFE) pour la Licence Professionnelle d'Enseignement en Technologies des Multimédias et du Web (LPE/TMW).

## 📋 Table des matières

- [À propos du projet](#à-propos-du-projet)
- [Processus ETL](#processus-etl)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Équipe](#équipe)
- [Vidéo de démonstration](#vidéo-de-démonstration)
- [Licence](#licence)

## 🎯 À propos du projet

MarketPulse est une solution révolutionnaire qui transforme le paysage du commerce électronique en automatisant la collecte de données produits à partir de multiples sources en ligne. Le projet vise à :

- **Automatiser la collecte de données** : Utilisation du web scraping pour extraire des informations produits (titres, descriptions, prix, images) depuis plusieurs sites e-commerce
- **Analyser la concurrence** : Application du data mining pour obtenir des insights sur les tendances de prix et les stratégies de vente
- **Améliorer l'expérience utilisateur** : Offrir une interface intuitive pour la recherche et la comparaison de produits
- **Optimiser la prise de décision** : Fournir des analyses approfondies en temps réel

### Objectifs principaux

1. **Acquisition de données** : Collecte automatisée via web scraping
2. **Analyse de la concurrence** : Insights sur les tendances du marché
3. **Pricing dynamique** : Ajustement des prix en fonction de l'offre et la demande
4. **Amélioration de la recherche** : Résultats pertinents et navigation facilitée
5. **Détection des tendances** : Identification des produits émergents

## 🔄 Processus ETL

Le processus ETL (Extract, Transform, Load) est au cœur de MarketPulse. Il permet de convertir les données brutes collectées en informations exploitables.

### 1. **Extraction (Extract)**

L'extraction consiste à collecter des données à partir de diverses sources en ligne :

#### Technologies utilisées :
- **Python** : Langage principal pour le scraping
- **Playwright** : Automatisation des navigateurs web pour l'extraction de contenu HTML
- **BeautifulSoup** : Parsing et extraction de données depuis HTML/XML
- **Scrapy** : Framework pour le web crawling et scraping à grande échelle
- **Chromium** : Navigateur utilisé pour le rendu des pages web

#### Processus d'extraction :
1. Configuration automatisée avec Playwright
2. Ouverture des pages web cibles (eBay, Jumia, etc.)
3. Extraction du contenu HTML
4. Utilisation de sélecteurs CSS pour cibler les éléments spécifiques
5. Collecte des informations produits (images, titres, prix, descriptions, catégories)

\`\`\`python
# Exemple de code d'extraction
async with async_playwright() as p:
    browser = await p.chromium.launch()
    page = await browser.new_page()
    await page.goto('https://example-ecommerce.com')
    
    # Extraction des données avec sélecteurs CSS
    products = await page.query_selector_all('.product-item')
    for product in products:
        title = await product.query_selector('.product-title')
        price = await product.query_selector('.product-price')
        # ... extraction d'autres données
\`\`\`

### 2. **Transformation (Transform)**

La transformation nettoie, normalise et enrichit les données extraites :

#### Étapes de transformation :
- **Nettoyage des données** :
  - Suppression des doublons
  - Correction des erreurs typographiques
  - Gestion des valeurs manquantes
  - Uniformisation des formats (dates, devises)

- **Normalisation** :
  - Conversion des unités de mesure
  - Standardisation des catégories de produits
  - Harmonisation des formats de prix

- **Intégration** :
  - Fusion des données de différentes sources
  - Résolution des conflits entre données
  - Création d'une structure cohérente

#### Technologies utilisées :
- **pandas** : Manipulation et analyse de données
- **NumPy** : Calculs numériques et opérations sur tableaux

\`\`\`python
# Exemple de transformation
import pandas as pd

# Nettoyage et normalisation
df = pd.DataFrame(raw_data)
df = df.drop_duplicates()
df['price'] = df['price'].str.replace('$', '').astype(float)
df['category'] = df['category'].str.lower().str.strip()
\`\`\`

### 3. **Chargement (Load)**

Le chargement stocke les données transformées dans la base de données :

#### Types de chargement :
- **Chargement complet** : Rechargement total des données
- **Chargement incrémental** : Ajout uniquement des nouvelles données ou mise à jour des données modifiées

#### Technologies utilisées :
- **MongoDB** : Base de données NoSQL orientée documents
- **Monk** : Bibliothèque Node.js pour interagir avec MongoDB

\`\`\`javascript
// Exemple de chargement dans MongoDB
const db = monk('localhost:27017/marketpulse');
const products = db.get('products');

await products.insert({
  title: productTitle,
  price: productPrice,
  category: productCategory,
  image: productImage,
  source: 'ebay',
  scrapedAt: new Date()
});
\`\`\`

### Flux ETL complet

\`\`\`
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  EXTRACT    │────▶│  TRANSFORM   │────▶│    LOAD     │
│             │     │              │     │             │
│ Web Scraping│     │  Nettoyage   │     │  MongoDB    │
│ (Playwright)│     │ Normalisation│     │  Storage    │
│ BeautifulSoup│     │  Intégration │     │             │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
  Sites e-commerce    Données propres      Base de données
  (eBay, Jumia)       et structurées       prête pour l'analyse
\`\`\`

### Avantages du processus ETL

- ✅ **Automatisation** : Collecte et traitement automatiques des données
- ✅ **Qualité des données** : Nettoyage et validation systématiques
- ✅ **Scalabilité** : Capacité à traiter de grands volumes de données
- ✅ **Cohérence** : Données uniformisées et structurées
- ✅ **Temps réel** : Mise à jour régulière des informations produits

## ✨ Fonctionnalités

### Pour les utilisateurs

- 🔍 **Recherche de produits** : Recherche avancée dans différents magasins en ligne
- 📊 **Comparaison de prix** : Visualisation des prix de différentes sources
- 🏷️ **Filtrage par catégories** : Navigation par catégories de produits
- 💰 **Tri par prix** : Classement des produits par ordre croissant/décroissant
- 📱 **Interface responsive** : Expérience optimale sur tous les appareils
- 🔗 **Accès direct** : Redirection vers les sites marchands pour l'achat

### Fonctionnalités techniques

- 🤖 **Web Scraping automatisé** : Collecte continue de données
- 📈 **Data Mining** : Analyse des tendances et patterns
- 🗄️ **Base de données NoSQL** : Stockage flexible avec MongoDB
- ⚡ **Performance optimisée** : Chargement rapide et pagination efficace
- 🔄 **Mise à jour en temps réel** : Données actualisées régulièrement

## 🛠️ Technologies utilisées

### Backend
- **Node.js** : Environnement d'exécution JavaScript
- **Express.js** : Framework web pour Node.js
- **MongoDB** : Base de données NoSQL
- **Monk** : Client MongoDB pour Node.js

### Frontend
- **EJS** : Moteur de templates
- **HTML5 & CSS3** : Structure et style
- **Bootstrap** : Framework CSS responsive
- **JavaScript** : Interactivité côté client

### Web Scraping & Data Mining
- **Python** : Langage de programmation
- **Playwright** : Automatisation de navigateurs
- **BeautifulSoup** : Parsing HTML/XML
- **Scrapy** : Framework de web scraping
- **pandas** : Manipulation de données
- **NumPy** : Calculs numériques

### Outils de développement
- **Figma** : Prototypage et design UI/UX
- **Canva** : Création du logo
- **StarUML** : Modélisation UML
- **Git** : Contrôle de version

## 📦 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- Python (v3.8 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
\`\`\`bash
git clone https://github.com/votre-username/marketpulse.git
cd marketpulse
\`\`\`

2. **Installer les dépendances Node.js**
\`\`\`bash
npm install
\`\`\`

3. **Installer les dépendances Python**
\`\`\`bash
pip install playwright beautifulsoup4 scrapy pandas numpy pymongo
playwright install chromium
\`\`\`

4. **Configurer MongoDB**
\`\`\`bash
# Démarrer MongoDB
mongod --dbpath /path/to/your/data/directory
\`\`\`

5. **Configuration de l'environnement**
Créer un fichier `.env` à la racine du projet :
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/marketpulse
PORT=3000
NODE_ENV=development
\`\`\`

6. **Lancer le serveur**
\`\`\`bash
npm start
\`\`\`

7. **Accéder à l'application**
Ouvrir votre navigateur et aller à `http://localhost:3000`

## 🚀 Utilisation

### Lancer le scraping

\`\`\`bash
# Exécuter le script de scraping Python
python scraper/main.py
\`\`\`

### Démarrer le serveur de développement

\`\`\`bash
npm run dev
\`\`\`

### Accéder aux différentes pages

- **Page d'accueil** : `http://localhost:3000/`
- **Tous les produits** : `http://localhost:3000/products`
- **Produits par catégorie** : `http://localhost:3000/category/:categoryName`
- **À propos** : `http://localhost:3000/about`

## 👥 Équipe

Ce projet a été réalisé par une équipe de trois étudiants de la Licence Professionnelle TMW :

### Développeurs

| Nom | Rôle | Contribution |
|-----|------|--------------|
| **ROCHDI Oumayma** | Développeur Full-Stack | Frontend, Design UI/UX, Documentation |
| **ISMGANE Kawtar** | Développeur Backend | Web Scraping, ETL, Base de données |
| **EZZROUIL Mohammed** | Développeur Backend | Data Mining, API, Optimisation |

### Encadrement

- **Pr. ELMOUNADI Abdelali** - Professeur Encadrant


### Institution

**École Normale Supérieure de Rabat**  
Département Informatique  
Université Mohammed V de Rabat  
Année Universitaire 2023-2024

## 🎥 Vidéo de démonstration

[![Démonstration MarketPulse](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)



Pour voir une démonstration complète du projet, consultez notre vidéo de présentation qui couvre :
- L'architecture du système
- Le processus ETL en action
- Les fonctionnalités principales
- Les résultats obtenus

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

### MIT License

\`\`\`
MIT License

Copyright (c) 2024 MarketPulse Team - ROCHDI Oumayma, ISMGANE Kawtar, EZRIOUIL Mohamed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
\`\`\`

## 📊 Statistiques du projet

- **Durée du projet** : 3 mois (mai 2024 - juillet 2024)
- **Lignes de code** : ~5000+
- **Sites scrapés** : eBay, Jumia, et autres
- **Produits collectés** : 1000+
- **Technologies utilisées** : 15+

## 🙏 Remerciements

Nous tenons à exprimer notre profonde gratitude envers :

- **Pr. Abdelali ELMOUNADI** pour son encadrement exceptionnel et ses conseils précieux
- **L'équipe pédagogique** du Département Informatique de l'ENS Rabat
- **Nos familles** pour leur soutien inconditionnel
- **La communauté open-source** pour les outils et bibliothèques utilisés

## 📞 Contact

Pour toute question ou suggestion concernant ce projet :

- **Email** : oumaymarochdi01@gmail.com
- **GitHub** : [MarketPulse Repository](https://github.com/Oumayma-Rochdi/MarketPulse)

---

**Développé avec ❤️ par l'équipe MarketPulse - ENS Rabat 2024**
\`\`\`

```text file="LICENSE"
MIT License

Copyright (c) 2024 MarketPulse Team - ROCHDI Oumayma, ISMGANE Kawtar, EZRIOUIL Mohamed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
