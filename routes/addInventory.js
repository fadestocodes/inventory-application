const {Router} = require('express');
const addInventoryRouter = Router();
const {getAllProducts, getAllCategories, addProduct} = require('../db/queries');
const {body, validationResult} = require('express-validator');



const validateEntry = [
    body('productName').trim().isLength({min:1, max:100}),
    body('productDescription').trim().optional(),
    body('productPrice').trim().isDecimal({decimal_digits: '2'}).withMessage('Price must be decimal with 2 decimal places.'),
    body('productStock').trim().isInt().withMessage('Must be a integer.'),
];


addInventoryRouter.get('/', async (req,res)=>{
    const allProducts = await getAllProducts();
    const allCategories = await getAllCategories();
    res.render('addInventory', {allProducts,allCategories});
});

addInventoryRouter.get('/product', async (req,res)=>{
    const allCategories = await getAllCategories();
    res.render('addProduct', {allCategories});

});

addInventoryRouter.post('/', validateEntry, async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
  


    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productPrice = req.body.productPrice;
    const productStock = req.body.productStock;
    const category = req.body.category;

    await addProduct( productName, productDescription, productPrice, productStock, category );
    res.redirect('/add');

});

module.exports = {addInventoryRouter};