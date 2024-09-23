// Import the Express.js framework
const express = require('express');
// Create a new router using the Express Router() function
const router = express.Router();
// Import the Posts.js model from '../models' directory
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const {validateToken} = require('../middlewares/AuthMiddleware');
const {validateAdminToken} = require('../middlewares/AuthMiddlewareAdmin');

const {sign} = require('jsonwebtoken');



// Route to create a new user
router.post("/", async (req, res)=>{
    const {username, password,email, age} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            email: email,
            age: age
        });
        res.json("User Created")
    });
});

// Route to log a user in
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
      res.json({ error: "User Doesn't Exist" });
      return;
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Username And Password Combination" });
        return;
      }
      // Fetch user details from the user object
      const { id, username, userType } = user;

      // Generate a JWT Token with userType included
      const accessToken = sign({ username, id, userType }, "privatekey");

      res.json({ token: accessToken, username, id, userType });
    });
  });

  router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
  });
  
  router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
  
    const basicInfo = await Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  
    res.json(basicInfo);
  });

  router.get("/users", validateAdminToken, async (req, res) => {
    try {
        // Query the database to fetch all users
        const allUsers = await Users.findAll({ attributes: { exclude: ["password"] } });
        // Return the list of users as a response
        res.json(allUsers);
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

  // Route to delete a user
  router.delete("/:id", validateAdminToken, async (req, res) => {
    try {
        // Find the user by ID and delete it from the database
        await Users.destroy({ where: { id: req.params.id } });
        // Return a success message
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        // If an error occurs, send an error response
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;