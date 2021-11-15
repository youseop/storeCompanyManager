const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const CompanyView = require("../models/companyView");

let companies = [];
let companyViewObject = {};

router.get("/api", async (req, res) => {
  if (companies.length > 0) {
    res.send(companies);
    return;
  }
  try {
    companies = await Company.find();
    res.send(companies);
  } catch (err) {
    res.status(400).send(err);
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
    res.status(400).send(err);
  }
});

router.delete("/api/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    await company.remove();
    companies = await Company.find();
    res.send({ message: "Successfully removed" });
  } catch (err) {
    res.status(400).send(err);
  }
});

const addCompanyView = (korName) =>{
  if(companyViewObject[korName] === undefined){
    companyViewObject[korName] = 1;
  }else{
    companyViewObject[korName] += 1;
  }
}

router.get("/view/api", async (req, res) => {
  if(Object.keys(companyViewObject).length > 0){
    res.status(200).send(companyViewObject);
    return;
  }
  try {
    const companyViews = await CompanyView.find();
    for (const {korName} of companyViews){
      addCompanyView(korName);
    }
    res.status(200).send(companyViewObject);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/view/api", async (req, res) => {
  try {
    const {  korName } = req.body;
    const companyView = new CompanyView({
      korName: korName,
    });
    await companyView.save();
    addCompanyView(korName);
    res.status(200).send(companyView);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
