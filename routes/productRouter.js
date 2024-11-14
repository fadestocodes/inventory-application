const {Router} = require('express');
const productRouter = Router();
const { getAllProducts } = require('../db/queries');


productRouter.get('/all-products', async (req,res)=>{
    const allProducts = await getAllProducts();
    res.render('allProducts', {allProducts});
});

productRouter.get('/:productName', async (req, res) =>{
    const productName = req.params.productName;
    const allProducts = await getAllProducts();
    console.log(allProducts);
    
    try {
        const matchedProduct = allProducts.find(item => item.name.toLowerCase().replace(/ /g, '-') === productName);
        if (matchedProduct){
            // res.send(`Product: ${matchedProduct.name}`);
            res.render('productPage', {matchedProduct});
        } else {
            throw new Error (`Product: "${productName}" Not Found`);
        }
    } catch (err) {
        res.status(404).json({
            error : 'Product Not Found',
            message : err.message
        });
    };
});

module.exports = {productRouter};