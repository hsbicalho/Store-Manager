const connection = require('./connection');

// Busca todas as pessoas autoras do banco.

const getAll = async () => {
  const [result] = await connection
    .query('SELECT * FROM StoreManager.products ORDER BY id');
  return result;
};

const getProductsById = async (id) => {
  const query = `SELECT date, product_id AS productId, quantity
    FROM StoreManager.sales_products as sp
    JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?`;
  const [result] = await connection.query(query, [id]);

  if (result.length === 0) return null;
  return result;
};

const getById = async (id) => {
  const [result] = await connection
    .query('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  if (!result) return null;
  return result;
};
const postProduct = async (name) => {
  const [result] = await connection
    .query('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
};
module.exports = { getAll, getById, postProduct, getProductsById };
