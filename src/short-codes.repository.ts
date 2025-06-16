import { ShortCodeModel } from './models/short-code.schema';

export class ShortCodesRepository {
  static model = ShortCodeModel;

  public async getByCode(code: string) {
    return ShortCodesRepository.model.findOne({ code });
  }
}
