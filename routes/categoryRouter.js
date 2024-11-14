const {Router} = require('express');
const categoryRouter = Router();
const {getAllProducts, getAllCategories, getProductsFromCategory} = require('../db/queries');

categoryRouter.get('/', async (req,res) => {
    const categories = await getAllCategories();
    res.render('category', {categories});
});

// categoryRouter.get('/:category_name', (req, res) =>{
//     const {category_name} = req.params;
//     res.send(`${category_name}`);
// })

categoryRouter.get('/:categoryName', async (req,res) =>{
    const category = req.params.categoryName;
    const products = await getProductsFromCategory(category);
    res.render('allProducts', {allProducts:products});

});

module.exports = {categoryRouter};