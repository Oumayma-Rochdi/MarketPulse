const mongoose = require("mongoose");
const cors = require('cors');
const express = require("express");
const products = require('./routes/products');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.set('view engine', 'ejs');

// Routes
app.use("/", products);
//app.use("/about", products);

// // about
// app.get("/about", async (req, res) =>{
//     console.log("hi");
//     res.render("about")
// })
//app.use("/products_All",products);

// app.get('/', (req, res) => {
//     res.render('index', { title: 'Home Page', message: 'Bienvenue sur MarketPulse' });
// });

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Ebay", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error(err));

// Server
app.listen(3000, () => {
    console.log("Listening to port 3000");
});
