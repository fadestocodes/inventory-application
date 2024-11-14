const express = require('express');
const app = express();
app.use(express.urlencoded({extended : true}));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const {indexRouter} = require('./routes/indexRouter');
const {categoryRouter} = require('./routes/categoryRouter');
const {productRouter} = require('./routes/productRouter');
const {addInventoryRouter} = require('./routes/addInventory');

app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/add', addInventoryRouter);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Express App Listening On Port: ${PORT}`);
});