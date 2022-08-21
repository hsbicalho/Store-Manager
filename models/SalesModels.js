const connection = require('./connection');

const postSales = async () => {
  const [{ insertId }] = await connection
    .query('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  return { id: insertId };
};

const getAllSales = async () => {
  const query = `SELECT sale_id AS saleId, date, product_id AS productId, quantity
    FROM StoreManager.sales_products as sp
    JOIN StoreManager.sales as s
    ON sp.sale_id = s.id`;
  const [result] = await connection.query(query);
  return result;
};

const getSalesById = async (id) => {
  const query = `SELECT date, product_id AS productId, quantity
    FROM StoreManager.sales_products as sp
    JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?`;
  const [result] = await connection.query(query, [id]);

  if (result.length === 0) return null;
  return result;
};

const postSalesProducts = async (saleProduct) => {
  const { saleId, productId, quantity } = saleProduct;
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?,?,?)`;
  await connection.query(query, [saleId, productId, quantity]);
  return { productId, quantity };
};

const deleteSale = async (id) => {
  await connection.query('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

module.exports = { postSales, postSalesProducts, getAllSales, getSalesById, deleteSale };
