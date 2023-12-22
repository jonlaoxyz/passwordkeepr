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
      return data.rows[0];
    });
};

const getPasswordById = (passwordId) => {
  return db.query('SELECT * FROM passwords WHERE id = $1', [passwordId])
    .then(data => {
      return data.rows;
    });
};


const deletePassword = (passwordId) => {
  return db.query('DELETE FROM passwords WHERE id = $1', [passwordId])
    .then(data => {
      return data.rows;
    });
};

const updatePassword = (passwordId, updatedPasswordDetails) => {
  const query = `
    UPDATE passwords
    SET
      website_name = $1,
      url = $2,
      username = $3,
      password = $4,
      category_id = $5
    WHERE id = $6
  `;

  const values = [
    updatedPasswordDetails.websiteName,
    updatedPasswordDetails.url,
    updatedPasswordDetails.userName,
    updatedPasswordDetails.outputPassword,
    updatedPasswordDetails.categoryId,
    passwordId,
  ];

  return db.query(query, values)
    .then(data => {
      return data.rows;
    });
};


module.exports = { getPasswords, createPassword, getPasswordById, deletePassword, updatePassword };
