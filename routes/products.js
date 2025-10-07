const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { Product } = require("../models/product")
const db = require('monk')('localhost:27017/Ebay')
const _ = require('lodash');
var collection = db.get('Products');

// Get All Products by price_min or just all the products
router.get("/", async (req, res) => {
  try {
    const price_min = parseFloat(req.query.price_min) || 0;
    var products = [];
    if (price_min) {
      products = await collection.find({ price_min: { $lt: price_min } });
    } else {
      products = await collection.find();
    }
    res.render("home",{ products: products.slice(0,8) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route pour filtrer par catégories avec pagination et tri par prix croissant si une plage de prix est sélectionnée et recherche 

router.get("/:categories", async (req, res) => {
  const categories = req.params.categories.split(','); // Séparer les catégories par des virgules
  const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
  const limit = 20; // Nombre total de produits à afficher par page

  const priceMin = parseFloat(req.query.price_min) || 0;
  const priceMax = parseFloat(req.query.price_max) || Infinity;
  const isPriceFilter = req.query.price_min !== undefined || req.query.price_max !== undefined;
  const query = req.query.query ? new RegExp(req.query.query, 'i') : null;

  try {
    const promises = categories.map(async (category) => {
      const filter = {
        category: category,
        image: { $regex: /\.webp$/ },
        price_min: { $gte: priceMin, $lte: priceMax }
      };

      if (query) {
        filter.title = { $regex: query };
      }

      return collection.find(filter);
    });

    const productsByCategory = await Promise.all(promises);
    const allProducts = _.flatten(productsByCategory);

    let sortedProducts;
    if (isPriceFilter) {
      sortedProducts = _.sortBy(allProducts, 'price_min');
    } else {
      sortedProducts = allProducts;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    res.render('products', {
      products: paginatedProducts,
      currentPage: page,
      totalPages: Math.ceil(sortedProducts.length / limit),
      category: categories.join(',')
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur de serveur');
  }
});




// Route pour afficher tous les produits  avec pagination, filtrage des prix en ordre croissant et de selection des categories 

router.get("/MarketPulse/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
  const limit = 20; // Nombre total de produits à afficher par page
  const priceMin = parseFloat(req.query.price_min) || 0;
  const priceMax = parseFloat(req.query.price_max) || Infinity;
  const isPriceFilter = req.query.price_min !== undefined || req.query.price_max !== undefined;
  const query = req.query.query ? new RegExp(req.query.query, 'i') : null;
  const selectedCategories = req.query.categories ? req.query.categories.split(',') : [];

  try {
    // Récupérer les catégories uniques
    const categories = await collection.distinct('category');

    let filter = {
      image: { $regex: /\.webp$/ },
      price_min: { $gte: priceMin, $lte: priceMax }
    };

    if (query) {
      filter.title = { $regex: query };
    }

    if (selectedCategories.length > 0) {
      filter.category = { $in: selectedCategories };
    }

    // Requête avec ou sans tri selon le filtre de prix
    let products;
    if (isPriceFilter) {
      products = await collection.find(filter, { sort: { price_min: 1 } });
    } else {
      products = await collection.find(filter);
    }

    // Filtrer et trier par catégories sélectionnées
    if (selectedCategories.length > 0) {
      products = products.filter(product => selectedCategories.includes(product.category));
      products.sort((a, b) => a.price_min - b.price_min);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.render('products_All', {
      products: paginatedProducts,
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      categories,
      selectedCategories // Passer les catégories sélectionnées pour pré-cocher les cases
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur de serveur');
  }
});


// Route pour la page "À propos"
router.get("/MarketPulse/about", (req, res) => {
  res.render("about", {
      title: "A propos de nous"
  });
});

module.exports = router;
