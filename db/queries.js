const pool = require('./pool');

async function getAllCategories(){
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getAllProducts(){
    const { rows } = await pool.query('SELECT * FROM products');
    return rows;
}

async function getAllCustomers(){
    const { rows } = await pool.query('SELECT * FROM customers');
    return rows;
}
async function getAllOrders(){
    const { rows } = await pool.query('SELECT * FROM orders');
    return rows;
}

async function getProductsFromCategory(category){
    const {rows} = await pool.query('SELECT products.* FROM products JOIN categories ON products.category_id = categories.category_id WHERE categories.name ILIKE $1', [category]);
    return rows;
}

async function addProduct( name, description, price, stock, category ){
    await pool.query( `INSERT INTO products (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5)`, [name, description, price, stock, category] );
}

module.exports = { getAllCategories, getAllProducts, getAllCustomers, getAllOrders, getProductsFromCategory, addProduct  };