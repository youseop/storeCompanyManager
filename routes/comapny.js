const express = require("express");
const router = express.Router();
const Company = require("../models/company");

router.get("/api", async (req, res) => {
  try {
    const companies = await Company.find();
    res.send(companies);
  } catch (error) {
    res.send(400, err);
  }
});

router.post("/api", async (req, res) => {
  try {
    const { engName, korName, brandUrl, tags, isBranded } = req.body;
    const company = new Company({
      engName,
      korName,
      brandUrl,
      tags,
      isBranded,
    });
    await company.save();
    res.send(company);
  } catch (error) {
    res.send(400, err);
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
    res.send(company);
  } catch (error) {
    res.send(400, err);
  }
});

router.delete("/api/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    await company.remove();
    res.send({ message: "Successfully removed" });
  } catch (error) {
    res.send(400, err);
  }
});

module.exports = router;
