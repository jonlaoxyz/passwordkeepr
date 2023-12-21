const db = require('../connection');

const getPasswords = () => {
  return db.query('SELECT * FROM passwords;')
    .then(data => {
      return data.rows;
    });
};

const createPassword = (websiteName, userName, password, url, categoryId, organizationId) => {
  return db.query(`
    INSERT INTO passwords(website_name, username, password, url, category_id, organization_id)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [websiteName, userName, password, url, categoryId, organizationId])
    .then(data => {
      return data.rows[0]; // Assuming you expect only one row to be returned
    });
};


module.exports = { getPasswords , createPassword };
