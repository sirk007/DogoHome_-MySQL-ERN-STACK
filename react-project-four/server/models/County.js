module.exports = (sequelize, DataTypes) => {
    // Define the County model
    const County = sequelize.define("County", {
      // Define username column
      countyName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    
    // Return the County model
    return County;
  };