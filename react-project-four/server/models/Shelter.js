module.exports = (sequelize, DataTypes) => {
    // Define the Shelters model
    const Shelters = sequelize.define("Shelters", {
      // Define username column
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shelterName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      county: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.STRING,
        defaultValue: 'Shelter'
      }
    });
  
    // Create an association for Shelters with Likes & Posts to allow cascading deletes
    Shelters.associate = (models) => {
      // Set a one-to-many relationship with Likes for each user
      Shelters.hasMany(models.Likes, {
        onDelete: "cascade",
        // Cascade delete likes associated with a user
        // One post may contain multiple Shelters
        // When deleting the user cascading ensures that every like that is related with the user gets deleted
      });
      
      // Set a one-to-many relationship with Posts for each user
      Shelters.hasMany(models.Posts, {
        onDelete: "cascade",
        // Cascade delete posts associated with a user
        // One user may contain multiple posts
        // When deleting the user cascading ensures that every post that is related with the user gets deleted
      });
      Shelters.hasMany(models.Animals, {
        onDelete: "cascade",
        // Cascade delete posts associated with a user
        // One user may contain multiple posts
        // When deleting the user cascading ensures that every post that is related with the user gets deleted
      });
      Shelters.hasMany(models.County, {
        onDelete: "cascade",
      });
    };
  
    // Return the Shelters model
    return Shelters;
  };