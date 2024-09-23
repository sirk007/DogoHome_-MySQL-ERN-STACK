module.exports = (sequelize, DataTypes) => {
    // Define the Animal model
    const ImageTest = sequelize.define("ImageTest", {
      // Define username column
      picture: {
        // Set Data type to blob so that it can hold large data
        type: DataTypes.BLOB,
        // Set it to optional
        allowNull: true, 
      }
    });
  
    // Create an association for Users with Likes & Posts to allow cascading deletes
  
    // Return the Users model
    return ImageTest;
  };