module.exports = (sequelize, DataTypes) => {
    // Define the Users model
    const Users = sequelize.define("Users", {
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
        defaultValue: 'User'
      }
    });
  
    // Create an association for Users with Likes & Posts to allow cascading deletes
    Users.associate = (models) => {
      // Set a one-to-many relationship with Likes for each user
      Users.hasMany(models.Likes, {
        onDelete: "cascade",
        // Cascade delete likes associated with a user
        // One post may contain multiple users
        // When deleting the user cascading ensures that every like that is related with the user gets deleted
      });
      
      // Set a one-to-many relationship with Posts for each user
      Users.hasMany(models.Posts, {
        onDelete: "cascade",
        // Cascade delete posts associated with a user
        // One user may contain multiple posts
        // When deleting the user cascading ensures that every post that is related with the user gets deleted
      });
      Users.hasMany(models.County, {
        onDelete: "cascade",
      });
    };
  
    // Return the Users model
    return Users;
  };