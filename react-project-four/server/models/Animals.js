module.exports = (sequelize, DataTypes) => {
    // Define the Animal model
    const Animals = sequelize.define("Animals", {
      // Define username column
      animal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      animalName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      animalAge: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      animalHealth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      animalDescription: {
        type: DataTypes.TEXT,
        defaultValue: false,
      },
      picture: {
        // Set Data type to blob so that it can hold large data
        type: DataTypes.BLOB,
        // Set it to optional
        allowNull: true, 
      }
    });
  
    // Create an association for Users with Likes & Posts to allow cascading deletes
  
    // Return the Users model
    return Animals;
  };