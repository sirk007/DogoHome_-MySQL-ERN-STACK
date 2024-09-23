module.exports = (sequelize, DataTypes) => {
  // Define the Posts model
  const Posts = sequelize.define("Posts", {
    // Define title column
    title: {
      // Set Data type to string
      type: DataTypes.STRING,
      // Set it as a required field
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define picture column
    picture: {
      // Set Data type to blob so that it can hold large data
      type: DataTypes.STRING,
      // Set it to optional
      allowNull: true, 
    },
  });

  // Create an association for Posts with Comments & Likes to allow cascading deletes
  Posts.associate = (models) => {

    // Set a one-to-many relationship with Comments for each post
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
      // Cascade delete comments associated with a post
      // One post may contain multiple comments
      // When deleting the post cascading ensures that every comment that is related with a post gets deleted
    });
    // Set a one-to-many relationship with Likes for each post
    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
      // Cascade delete likes associated with a post
      // One post may contain multiple likes from different users
      // When deleting the post cascading ensures that every like that is associated with a post gets deleted
    });
  };
  // Return the Posts model
  return Posts;
};