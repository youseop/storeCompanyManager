const express = require("express");
const router = express.Router();
const Password = require("../models/password");

router.post("/api/validate", async (req, res) => {
  try {
    const { userpwd } = req.body;
    passwords = await Password.find();
    if(passwords.filter((password)=>password.pwd===userpwd)){
      res.status(200).send({result: true});
    }
    res.status(200).send({result: false});
  } catch (err) {
    res.send(400).send(err);
  }
});

router.post("/api/add", async (req, res) => {
  try {
    const { userpwd } = req.body;
    const password = new Password({
      pwd:userpwd
    });
    await password.save();
    res.status(200).send({success: true});
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
