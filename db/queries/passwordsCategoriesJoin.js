const db = require('../connection');

const getPasswordsCategoriesJoin = () => {
  return db.query('SELECT p.id, p.website_name, p.url, p.username, p.password, p.organization_id, c.name AS category_name FROM passwords p LEFT JOIN categories c ON p.category_id = c.id;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPasswordsCategoriesJoin };
