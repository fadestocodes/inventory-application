const {Router} = require('express');
const categoryRouter = Router();

categoryRouter.get('/', (req,res) => {
    res.render('category');
});

categoryRouter.get('/:category_name', (req, res) =>{
    const {category_name} = req.params;
    res.send(`${category_name}`);
})

categoryRouter.get('/:category_name/:product_id', (req,res) =>{
    const {category_name, product_id} = req.params;
})

module.exports = {categoryRouter};