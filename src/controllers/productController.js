const pool = require("../db/db");

const getProducts = async (req, res) => {
  try {
    const { category, cursorId, cursorTime } = req.query;

    let query = `
      SELECT *
      FROM products
    `;

    const values = [];
    const conditions = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (cursorId) {
      values.push(cursorId);

      conditions.push(`
    id < $${values.length}
  `);
    }

    if (conditions.length) {
      query += `
        WHERE ${conditions.join(" AND ")}
      `;
    }

    query += `
      ORDER BY updated_at DESC, id DESC
      LIMIT 20
    `;

    const result = await pool.query(query, values);
    console.log("QUERY:");
    console.log(query);
    console.log("cursorId:", cursorId);
    console.log("cursorTime:", cursorTime);

    console.log("VALUES:");
    console.log(values);
    console.log("ROWS:", result.rows.length);

    const products = result.rows;

    let nextCursor = null;

    if (products.length > 0) {
      const lastProduct = products[products.length - 1];

      nextCursor = {
        id: lastProduct.id,
        updated_at: lastProduct.updated_at,
      };
    }

    res.json({
      products,
      nextCursor,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProducts,
};
