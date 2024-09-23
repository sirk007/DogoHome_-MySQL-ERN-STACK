// Import the Express.js framework
const express = require('express');
// Create a new router using the Express Router() function
const router = express.Router();
// Import the Posts.js model from '../models' directory
const { Shelters } = require('../models');
const bcrypt = require('bcrypt');
const {validateShelterToken} = require('../middlewares/AuthMiddlewareShelter');
const {sign} = require('jsonwebtoken');

// Route to fetch all shelters
router.get("/", async (req, res) => {
  try {
    const shelters = await Shelters.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(shelters);
  } catch (error) {
    console.error("Error fetching shelters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Route to create a new shelter
router.post("/", async (req, res)=>{
  const { username, password, email, shelterName, county, address, phoneNumber } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
        Shelters.create({
            username: username,
            password: hash,
            email: email,
            shelterName: shelterName,
            county: county,
            address: address,
            phoneNumber: phoneNumber
        });
        res.json("Shelter Created")
    });
});

// Route to log a shelter in
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const shelter = await Shelters.findOne({ where: { username: username } });
    if (!shelter) {
        res.json({ error: "Shelter Profile Doesn't Exist" });
        return;
      }
    bcrypt.compare(password, shelter.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Username And Password Combination" });
        return;
      }

      // Fetch admin details from the admin object
      const { id, username, userType, email, shelterName, county, address, phoneNumber } = shelter;

      const accessShelterToken = sign(
        { id, username, userType, email, shelterName, county, address, phoneNumber },
        "privateShelterKey"
      );
      res.json({ token: accessShelterToken, id, username, userType, email, shelterName, county, address, phoneNumber });
    });
  });


  router.get("/auth", validateShelterToken, (req, res) => {
    res.json(req.shelter);
  });
  
  router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
  
    const basicInfo = await Shelters.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  
    res.json(basicInfo);
  });

module.exports = router;