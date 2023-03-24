const apiRouter = require('express').Router();
const userRouter = require('./userroutes');
const { User } = require('../../models');

apiRouter.use('/users', userRouter);

apiRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username or password missing' });
    }

    const userData = await User.findOne({
      where: {
        username,
      },
    });

    const user = userData.get({ plain: true });

    if (password !== user.password) {
      return res.status(400).json({ message: 'password does not match' });
    }

    req.session.save(() => {
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      return res.json({
        message: `${username} successfully logged in and session user is ${req.session.user.username}`,
      });
    });

    return 0;
  } catch (err) {
    return res.status(500).json({ err });
  }
});

apiRouter.get('/logout', (req, res) => {
  const {
    session: { user },
  } = req;
  if (!user) {
    return res.status(400).json({ message: 'user not logged in' });
  }

  const { username } = user;

  req.session.destroy();
  return res.json({ message: `user ${username} successfully logged out` });
});

module.exports = apiRouter;