module.exports = (sequelize, DataTypes) => {
    // Define the Admin model
    const Admins = sequelize.define("Admins", {
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
      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.STRING,
        defaultValue: 'Admin'
      }
    });
  
    // Create an association for Admin with Likes & Posts to allow cascading deletes
    Admins.associate = (models) => {
      
      // Set a one-to-many relationship with Posts for each user
      Admins.hasMany(models.Posts, {
        onDelete: "cascade",
        // Cascade delete posts associated with a user
        // One user may contain multiple posts
        // When deleting the user cascading ensures that every post that is related with the user gets deleted
      });
      Admins.hasMany(models.County, {
        onDelete: "cascade",
      });
    };
  
    // Return the Admin model
    return Admins;
  };