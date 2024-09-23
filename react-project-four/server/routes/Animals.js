// Import the Express.js framework
const express = require('express');
// Create a new router using the Express Router() function
const router = express.Router();
// Import the Posts.js & Likes.js models from '../models' directory
const { Animals } = require('../models');

const {validateShelterToken} = require('../middlewares/AuthMiddlewareShelter');

// Route to get a list of Animals
router.get("/", async (req, res)=>{
    // Use the Animals.js model to fetch all animals from the database
    const listOfAnimals = await Animals.findAll();  
    // Respond with the list of posts as JSON
    res.json({ listOfAnimals: listOfAnimals });
});
// Route to get animals by Shelter ID
router.get('/byShelterId/:shelterId', async (req, res) => {
    try {
        const shelterId = req.params.shelterId;
        // Find all animals belonging to the specified shelter
        const animals = await Animals.findAll({ where: { ShelterId: shelterId } });
        // Respond with the retrieved animals as JSON
        res.json(animals);
    } catch (error) {
        console.error("Error fetching animals by shelter ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get a specific animal by its ID
router.get('/byId/:id', async (req, res) =>{
    // Retreive the ID parameter from the URL 3002...
    const id = req.params.id;
    // Use Animal.js model to find a animal by its primary key
    const animal = await Animals.findByPk(id);
    // Respond with the retreived post as JSON
    res.json(animal);
});


router.post("/", validateShelterToken, async (req, res)=>{
    try{
        const newAnimal = req.body;
        newAnimal.ShelterId = req.shelter.id;
        // Use the Post.js model to create a new post in the database
        await Animals.create(newAnimal);
    } catch (error){
        // If an error occurs, send an error response
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});




module.exports = router;