import { Router } from 'express';

import { handleValidationErrors } from './middlewares/validation';
import { shortenValidation } from './validators/shorten.validator';
import { AppController } from './app.controller';

export const router = Router();

const appController = new AppController();

router.post(
  '/shorten',
  shortenValidation,
  handleValidationErrors,
  appController.createShortCode,
);

router.get('/:shortCode', appController.redirectByCode);

router.get('/stats/:shortCode', appController.getShortCodeStats);
