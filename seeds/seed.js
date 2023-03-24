// sequelize connection
const sequelize = require('../config/connection');
// eslint-disable-next-line
const { User } = require('../models');

// data
const userData = [
  {
    username: 'chad',
    email: 'chad@chad.com',
    password: 'chadspassword',
  },
];

// seed function
const seedDB = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, { individualHooks: true });
  // seed some stuff.
  process.exit(0);
};

seedDB();