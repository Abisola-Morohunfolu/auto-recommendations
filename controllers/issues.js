const asyncWrapper = require("../middleware/asyncWrapper");
const { getDomainId, createDomain } = require("../models/Issues");

const createIssues = async (req, res) => {
  const { domain_name } = req.body;
  const domainId = await getDomainId(domain_name);

  if (domainId) {
    res.json({ domain_id: domainId });
    return;
  }

  // const newDomainId = await createDomain(domain_name);

  // res.status(newDomainId ? 201 : 401).json({ domain_id: domainId });
};

module.exports = { createIssues };
