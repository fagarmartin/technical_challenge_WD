const router = require("express").Router();
module.exports = router;
const phones = require("../db/data/phones.json");

//GET "/phones" get all phones from json
router.get("/", (req, res, next) => {
  res.json(phones);
});

// GET "/phones/:id" return phone details
router.get("/:id", (req, res, next) => {
  const phoneId = Number(req.params.id);

  const newPhonesArr = phones.filter((eachPhone) => {
    return eachPhone.id === phoneId;
  });

  res.json(newPhonesArr[0]);
});
