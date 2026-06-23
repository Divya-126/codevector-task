const { faker } = require("@faker-js/faker");
const pool = require("../db/db");

const categories = ["Electronics", "Books", "Clothing", "Sports", "Home"];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

async function seed() {
  try {
    const totalBatches = TOTAL_PRODUCTS / BATCH_SIZE;

    for (let batch = 0; batch < totalBatches; batch++) {
      const values = [];

      for (let i = 0; i < BATCH_SIZE; i++) {
        values.push(`
        (
          '${faker.commerce.productName().replace(/'/g, "''")}',
          '${categories[Math.floor(Math.random() * categories.length)]}',
          ${faker.number.int({ min: 100, max: 100000 })},
          NOW() - INTERVAL '${faker.number.int({ min: 0, max: 365 })} days',
          NOW() - INTERVAL '${faker.number.int({ min: 0, max: 365 })} days'
        )
      `);
      }

      await pool.query(`
        INSERT INTO products
        (name, category, price, created_at, updated_at)
        VALUES ${values.join(",")}
      `);

      console.log(`✅ Batch ${batch + 1}/${totalBatches} completed`);
    }

    console.log("🎉 200000 Products Inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
