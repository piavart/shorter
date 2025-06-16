import { IShortCode } from './models/short-code.schema';
import { ShortCodesRepository } from './short-codes.repository';

export class CreateShortCodeService {
  public async create(url: string): Promise<IShortCode> {
    const shortCodeData = {
      code: this.getShortCodeValue(),
      url,
    };
    const shortCode = new ShortCodesRepository.model(shortCodeData);

    await shortCode.save();

    console.log(`Created new short code: ${JSON.stringify(shortCodeData)}`);

    return shortCode;
  }

  private getShortCodeValue(): string {
    return Date.now().toString();
  }
}
