const {Router} = require('express');
const addInventoryRouter = Router();
const {getAllProducts, getAllCategories, addProduct, addCategory} = require('../db/queries');
const {body, validationResult} = require('express-validator');
const pool = require('../db/pool');



const validateEntry = [
    body('productName').trim().isLength({min:1, max:100}),
    body('productDescription').trim().optional(),
    body('productPrice').trim().isDecimal({decimal_digits: '2'}).withMessage('Price must be decimal with 2 decimal places.'),
    body('productStock').trim().isInt().withMessage('Must be a integer.'),
];

const validateAddCategory = [
    body('categoryName').trim().isLength({min:1, max:100}).custom(async (value)=>{
        const result = await pool.query(`SELECT * FROM categories WHERE name = $1`, [value]);
        if (result.rows.length > 0){
            throw new Error ('Product name must be unique');
        }
        return true;
    })
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

addInventoryRouter.post('/product', validateEntry, async (req, res)=>{

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

addInventoryRouter.get('/category', (req,res)=>{
    res.render('addCategory');
})


addInventoryRouter.post('/category',validateAddCategory , async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const categoryName = req.body.categoryName;
    await addCategory(categoryName);
    res.redirect('/add');

} );



module.exports = {addInventoryRouter};