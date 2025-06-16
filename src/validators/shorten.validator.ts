import { body } from 'express-validator';

export const shortenValidation = [
  body('url')
    .notEmpty()
    .withMessage('Url is required')
    .isURL()
    .withMessage('Url must be url format')
    .trim(),
];
