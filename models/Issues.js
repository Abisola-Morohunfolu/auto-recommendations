const { pool } = require("../db/db");

const getDomainId = async (domainName) => {
  try {
    const domainId = await pool.query(
      "SELECT d.id FROM my_schema.domains d WHERE d.domain_name = $1",
      [domainName]
    );
    return domainId.rows[0]?.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createDomain = async (domainName) => {
  try {
    const domainId = await pool.query(
      "INSERT INTO my_schema.domains (domain_name) VALUES ($1) RETURNING id",
      [domainName]
    );
    return domainId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getDomainId, createDomain };
