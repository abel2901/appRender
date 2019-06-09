var express = require('express');
var router = express.Router();
var faker = require('faker')
var Product = require('../models/product')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-product', function(req, res, next) {
  res.render('main/add-product')
})

router.post('/add-product', function(req, res, next) {
  var product = new Product()

  product.category = req.body.category_name
  product.name = req.body.product_name
  product.price = req.body.product_price
  product.cover = faker.image.image()

  product.save(function(err) {
      if (err) throw err
      res.redirect('/add-product')
  })
})

router.get('/generate-fake-data', function(req, res, next){
  for(var i = 0; i < 100; i++){
    var product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.cover = faker.image.image()
    
    product.save(function(err) {
          if (err) throw err
     })
  }
  res.redirect('/add-product')
})

module.exports = router;
