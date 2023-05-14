const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExUrl } = require('../utils/utils');
const {
  getMyProfile,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMyProfile);
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object({
      userId: Joi.string()
        .required()
        .hex()
        .length(24)
        .message('Некорректный id'),
    }),
  }),
  getUserById,
);
usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object({
      name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .message('Имя должно быть от 2 до 30 символов'),
      about: Joi.string()
        .required()
        .min(2)
        .max(30)
        .message('Это поле должно быть от 2 до 30 символов'),
    }),
  }),
  updateUser,
);
usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object({
      avatar: Joi.string()
        .required()
        .regex(regExUrl)
        .message('Неверный URL'),
    }),
  }),
  updateAvatar,
);

module.exports = usersRouter;
