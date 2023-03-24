const userRouter = require('express').Router();
const { User } = require('../../models');

userRouter.post('/', async (req, res) => {
  // const { username, email, password } = req.body;
  // const newUser = await User.create({
  //   username,
  //   email,
  //   password
  // })
  try {
    console.log(req.body);
    await User.create({
      ...req.body
    });

    res.json({message: `created new user ${req.body.username}`})
  } catch(err) {
    res.status(500).json({ err });
  }
});

userRouter.put('/:id', async (req, res) => {

  try {
    await User.update(
      {
        ...req.body
      },
      {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      });

    res.json({ message: `user ${req.params.id} updated`});
  } catch(err) {
    res.status(500).json({ err });
  }
});

userRouter.delete('/:id', async (req, res) => {

  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({ message: `user ${req.params.id} was destroyed`})
  } catch(err) {
    res.status(500).json({err})
  }
})



module.exports = userRouter;