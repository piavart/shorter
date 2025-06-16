import { Request, Response } from 'express';

import { CreateShortCodeService } from './create-short-code.service';
import { ShortCodeService } from './short-code.service';

export class AppController {
  public async createShortCode(req: Request, res: Response) {
    const url = req.body.url as string;
    const service = new CreateShortCodeService();
    const shortCode = await service.create(url);

    res.status(201).send({ shortCode: shortCode.code });
  }

  public async redirectByCode(req: Request, res: Response) {
    const code = req.params.shortCode;
    const service = new ShortCodeService();
    const url = await service.getRedirectUrl(code);

    if (!url) {
      res.status(404).json({
        success: false,
        message: 'Short code not found',
      });
      return;
    }

    res.redirect(url);
  }

  public async getShortCodeStats(req: Request, res: Response) {
    const code = req.params.shortCode;
    const service = new ShortCodeService();
    const stats = await service.getShortCodeStats(code);

    if (!stats) {
      res.status(404).json({
        success: false,
        message: 'Short code not found',
      });
      return;
    }

    res.send(stats);
  }
}
