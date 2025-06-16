import { ShortCodesRepository } from './short-codes.repository';

export class ShortCodeService {
  public async getRedirectUrl(code: string): Promise<string | null> {
    const shortCode = await new ShortCodesRepository().getByCode(code);

    if (!shortCode) return null;

    shortCode.clicksCount = shortCode.clicksCount + 1;
    await shortCode.save();

    return shortCode.url;
  }

  public async getShortCodeStats(code: string): Promise<null | {
    code: string;
    url: string;
    stats: { countClicks: number };
  }> {
    const shortCode = await new ShortCodesRepository().getByCode(code);

    if (!shortCode) return null;

    return {
      code,
      url: shortCode.url,
      stats: { countClicks: shortCode.clicksCount },
    };
  }
}
