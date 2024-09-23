// Import the Express.js framework
const express = require('express');
// Create a new router using the Express Router() function
const router = express.Router();
// Import the Posts.js model from '../models' directory
const { Admins } = require('../models');
const bcrypt = require('bcrypt');
const {validateAdminToken, } = require('../middlewares/AuthMiddlewareAdmin');


const {sign} = require('jsonwebtoken');



// Route to create a new admin
router.post("/", async (req, res)=>{
    const {username, password,email, age} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Admins.create({
            username: username,
            password: hash,
            email: email,
            age: age
        });
        res.json("Admin Created")
    });
});

// Route to log a admin in
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admins.findOne({ where: { username: username } });
    
    if (!admin) {
        res.json({ error: "Admin Doesn't Exist" });
        return;
      }
    bcrypt.compare(password, admin.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Username And Password Combination" });
        return;
      }
      // Fetch admin details from the admin object
      const { id, username, userType } = admin;
      // Generate a JWT Token
      const adminAccessToken = sign({id, username, userType}, 
        "privateAdminKey"
        );
        res.json({ token: adminAccessToken, username, id, userType });
    });
  });

  router.get("/auth", validateAdminToken, (req, res) => {
    res.json(req.admin);
  });
  
  router.get("/basicinfo/:id", validateAdminToken, async (req, res) => {
    const id = req.params.id;
  
    const basicInfo = await Admins.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  
    res.json(basicInfo);
  });

module.exports = router;