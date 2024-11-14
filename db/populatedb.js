require('dotenv').config();
const {Client} = require('pg');

const SQL = `
INSERT INTO categories (name) VALUES
('Outerwear'), ('Shirts'), ('Pants'), ('Footwear'), ('Hats');
`;

async function main(){
    console.log('seeding...');

    const client = new Client({
        connectionString : process.env.DB_CONNECTION
    });
    try {
        await client.connect();
        await client.query(SQL);
        const resOuterwear = await client.query("SELECT category_id FROM categories WHERE name = 'Outerwear'");
        const outerwearCategoryId = resOuterwear.rows[0].category_id;
        const resShirts = await client.query("SELECT category_id FROM categories WHERE name = 'Shirts'");
        const shirtsCategoryId = resShirts.rows[0].category_id;
        const resPants = await client.query("SELECT category_id FROM categories WHERE name = 'Pants'");
        const pantsCategoryId = resPants.rows[0].category_id;
        const resFootwear = await client.query("SELECT category_id FROM categories WHERE name = 'Footwear'");
        const footwearCategoryId = resFootwear.rows[0].category_id;
        const resHats = await client.query("SELECT category_id FROM categories WHERE name = 'Hats'");
        const hatsCategoryId = resHats.rows[0].category_id;
        
        
        await client.query(`
            INSERT INTO products ( name, description, price, stock, category_id) VALUES 
            ('Sueded Casual Jacket', 'Embroidered floral crest at left chest', 124.99, 4, ${outerwearCategoryId}),
            ('Long-Sleeve Waffle Knit Polo', 'Button placket with faux horn button closure at front', 94.99, 2, ${shirtsCategoryId}),
            ('New Balance SONNY NY Hoodie', 'Round braided drawstrings', 132.99, 1, ${outerwearCategoryId} ),
            ('New Balance SONNY NY Practice Tee', 'Black long-sleeve tee', 74.99, 2, ${shirtsCategoryId} ),
            ('Single Pleated Check Wool Trouser', 'Embroidered floral crest at front waistband', 164.99, 1, ${pantsCategoryId}),
            ('Gabardine Pintuck Trouser', 'Black suit trouser', 114.99, 6, ${pantsCategoryId} ),
            ('Blanket Overshirt', 'Multi-color overshirt', 164.99, 1, ${outerwearCategoryId}),
            ('New Balance SONNY NY Warmup Tank Top', 'Grey warm up tank', 69.99, 6, ${shirtsCategoryId} ),
            ('Donegal Turtleneck Sweater', 'Brown turtleneck sweater', 114.99, 1, ${shirtsCategoryId}),
            ('Western Full-Zip Hoodie', 'Grey hoodie', 134.99, 5, ${outerwearCategoryId} ),
            ('Wool Suit Trouser', 'Black suit trouser', 129.99, 4, ${pantsCategoryId} ),
            ('Basketweave Elasticated Waist Trouser', 'Light brown suit trouser', 114.99, 1, ${pantsCategoryId}),
            ('New Balance HESI LOW V2', 'Black & green', 194.99, 0, ${footwearCategoryId} ),
            ('Timberland Heritage Mid Lace GTX Boot', 'Black boots', 194.99, 3, ${footwearCategoryId} ),
            ('Skull Cap', 'Black skull cap', 64.99, 2, ${hatsCategoryId} ),
            ('New Era Mets Corduroy Hat', 'White hat', 74.99, 0, ${hatsCategoryId} ),
            ('Blackwatch Crest Bucket Hat', 'Plaid bucket hat', 134.99, 5, ${hatsCategoryId} );
        `);

        
        
        await client.query(`
            INSERT INTO customers (name, email, address, phone) VALUES
            ('Andrew Jung','andrew-jung@hotmail.com', '6115 148 St', '+16048621227'),
            ('Drew J','drewjhair@gmail.com', '2003 Surrey St', '+16041231227'),
            ('Fadesto Cameras','fadestocameras@gmail.com', '2019 Surrey St', '+16044561227'),
            ('Fadesto Codes','fadestocodes@gmail.com', '2024 Langley St', '+16047891227');
        `);

        const andrew = await client.query("SELECT customer_id FROM customers WHERE name = 'Andrew Jung'");
        const andrewId = andrew.rows[0].customer_id;
        const drew = await client.query("SELECT customer_id FROM customers WHERE name = 'Drew J'");
        const drewId = andrew.rows[0].customer_id;
        const cameras = await client.query("SELECT customer_id FROM customers WHERE name = 'Fadesto Cameras'");
        const camerasId = andrew.rows[0].customer_id;
        const codes = await client.query("SELECT customer_id FROM customers WHERE name = 'Fadesto Codes'");
        const codesId = andrew.rows[0].customer_id;
        
            
        await client.query(`
           INSERT INTO orders (order_date, customer_id, total_amount) VALUES
            ('2024-09-12 10:05:00', ${andrewId}, '301.72'), ('2024-10-05 09:25:00', ${drewId}, '224.38'), ('2024-10-22 16:02:00', ${camerasId}, '111.72'), 
            ('2024-10-23 18:32:22', ${codesId}, '123.12'), ('2024-10-23 19:05:00', ${drewId}, '321.12'), ('2024-10-23 20:05:00', ${codesId}, '78.98'), 
            ('2024-10-23 21:05:00', ${andrewId}, '54.23'), ('2024-10-23 22:05:00', ${andrewId}, '120.22');
        `);
        
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await client.end();
        console.log('done!');
    }
}

main();
