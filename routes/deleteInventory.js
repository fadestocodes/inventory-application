const {Router} = require('express');
const deleteRouter = Router();
const {getAllProducts, getAllCategories, deleteProduct} = require("../db/queries");
require('dotenv').config();


deleteRouter.get('/', async (req,res)=>{
    
    const allProducts = await getAllProducts();
    const allCategories = await getAllCategories();
    res.render('deleteInventory', {allProducts,allCategories});
});

deleteRouter.get('/product', async (req,res)=>{
    const allProducts = await getAllProducts();
    res.render('deleteProduct', {allProducts});
});

deleteRouter.get('/:productName/:productId',  (req, res) =>{
    const productId = req.params.productId;
    const toDelete = "Product";
    const productName = req.params.productName;
    res.render('deleteConfirm', {toDelete, productId, productName});
});

deleteRouter.post('/confirm', async (req,res)=>{
    const toDelete = "Product";
    const productId = req.query['product-id'];
    const password = req.body.password;
    const name = req.query.productName;    


    if (password===process.env.DELETE_PW){
        try{
            await deleteProduct(productId);
            res.render('deleteSuccess', {toDelete,name, productId });

        } catch (err) {
            console.error(err);
        }
    } else {
        res.render('deleteFailed');
    }
});

deleteRouter.get('/failed', (req,res)=>{
    res.render('deleteFailed');
})

module.exports = {deleteRouter};