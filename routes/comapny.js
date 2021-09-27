const express = require("express");
const router = express.Router();
const Company = require("../models/company");

let companies = [];

router.get("/api", async (req, res) => {
  if (companies.length > 0) {
    res.send(companies);
    return;
  }
  try {
    companies = await Company.find();
    res.send(companies);
  } catch (err) {
    res.send(400, err);
  }
});

router.post("/api", async (req, res) => {
  try {
    const { engName, korName, brandUrl, tags, isBranded } = req.body;
    const company = new Company({
      engName: engName,
      korName: korName,
      brandUrl: brandUrl,
      tags: tags,
      isBranded: isBranded,
    });
    await company.save();
    companies = await Company.find();
    res.status(200).send(company);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/api/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    for (let key in req.body) {
      if (company[key] !== req.body[key]) {
        company[key] = req.body[key];
      }
    }
    await company.save();
    companies = await Company.find();
    res.send(company);
  } catch (err) {
    res.send(400, err);
  }
});

router.delete("/api/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    await company.remove();
    companies = await Company.find();
    res.send({ message: "Successfully removed" });
  } catch (err) {
    res.send(400, err);
  }
});

module.exports = router;
