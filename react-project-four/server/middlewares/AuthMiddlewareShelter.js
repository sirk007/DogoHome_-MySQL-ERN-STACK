const { verify } = require("jsonwebtoken");

const validateShelterToken = (req, res, next) => {
  const accessShelterToken = req.header("accessShelterToken");
  if (!accessShelterToken) return res.json({ error: "Shelter not logged in!" });
  try {
    const validShelterToken = verify(accessShelterToken, "privateShelterKey");
    req.shelter = validShelterToken; // Assign the validShelterToken to req.shelter
    if (validShelterToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err.message });
  }
};


module.exports = { validateShelterToken };
