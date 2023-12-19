const db = require('../connection');

const getPasswords = () => {
  return db.query('SELECT * FROM passwords;')
    .then(data => {
      return data.rows;
    });
};

const createPassword = (website_name, username, password, url, category_id, organization_id) => {
  return db.query(`
    INSERT INTO passwords(website_name, username, password, url, category_id, organization_id)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [website_name, username, password, url, category_id, organization_id])
    .then(data => {
      return data.rows[0]; // Assuming you expect only one row to be returned
    });
};


module.exports = { getPasswords , createPassword};
const createPassword = (website_name, username, password, url, category_id, organization_id) => {
  return db.query(`
    INSERT INTO passwords(website_name, username, password, url, category_id, organization_id)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [website_name, username, password, url, category_id, organization_id])
    .then(data => {
      console.log("yo there!")
      return data.rows[0]; // Assuming you expect only one row to be returned
    });
};


module.exports = { getPasswords , createPassword};
