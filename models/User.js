const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Method to check the user password
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 15],
      },
    },
  },
 {
    hooks: {
        // Bcrypt hashes the incoming password on new users.
<<<<<<< HEAD
        beforeCreate: async (NewUserData) => 
        {
            const hashedPassword = await bcrypt.hash(NewUserData.password, 10);
            console.log(hashedPassword)
            return {
                ...NewUserData,
                password: hashedPassword,
            }
        },
        beforeUpdate: async (updateUserData) => 
        {
=======
        beforeCreate: async (newUserData) => {
          
            const hashedPassword = await bcrypt.hash(newUserData.password, 10);
            newUserData.password = hashedPassword // eslint-disable-line no-param-reassign
            return newUserData
        },
        beforeUpdate: async (updatedUserData) => {
          
>>>>>>> 7e86f263802dde7202825f7f2447f0153a7c1c8d
            const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
            updatedUserData.password = hashedPassword // eslint-disable-line no-param-reassign
            return updatedUserData
            }
        },
<<<<<<< HEAD
    },

 },

    {
=======
>>>>>>> 7e86f263802dde7202825f7f2447f0153a7c1c8d
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    },
);

module.exports = User;
