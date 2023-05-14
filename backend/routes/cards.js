const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExUrl } = require('../utils/utils');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const authDelete = require('../middlewares/deleteCard');

cardsRouter.get('/', getCards);
cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object({
      name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'Название карточки не должно быть меньше 2 символов',
          'string.max': 'Название карточки не должно быть больше 30 символов',
          'any.required': 'Название карточки не должно быть пустым',
        }),
      link: Joi.string()
        .required()
        .regex(regExUrl)
        .messages({
          'string.dataUri': 'Неверная ссылка',
          'any.required': 'Название не должно быть пустым',
        }),
    }),
  }),
  createCard,
);
cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object({
      cardId: Joi.string()
        .required()
        .hex()
        .length(24)
        .messages({
          'string.hex': 'Некорректный id',
        }),
    }),
  }),
  authDelete,
  deleteCard,
);
cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object({
      cardId: Joi.string()
        .required()
        .hex()
        .length(24)
        .messages({
          'string.hex': 'Некорректный id',
        }),
    }),
  }),
  likeCard,
);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object({
      cardId: Joi.string()
        .required()
        .hex()
        .length(24)
        .messages({
          'string.hex': 'Некорректный id',
        }),
    }),
  }),
  dislikeCard,
);

module.exports = cardsRouter;
