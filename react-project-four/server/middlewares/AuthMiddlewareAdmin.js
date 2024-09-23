const { verify } = require("jsonwebtoken");

const validateAdminToken = (req, res, next) => {
  const adminAccessToken = req.header("adminAccessToken");
  if (!adminAccessToken) return res.json({ error: "Admin not logged in!" });
  try {
    const validAdminToken = verify(adminAccessToken, "privateAdminKey");
    req.admin = validAdminToken;
    if (validAdminToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateAdminToken };