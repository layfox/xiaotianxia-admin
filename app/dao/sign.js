import { NotFound, Forbidden } from 'lin-mizar';
import { Sign } from '../model/sign';

class SignDao {
  async getSign (userId) {
    const sign = await Sign.findOne({
      where: {
        userid: userId
      }
    });
    return sign;
  }

  async createSign (v) {
    const sign = await Sign.findOne({
      where: {
        userid: v.userId
      }
    });
    if (sign) {
      throw new Forbidden({
        code: 10240
      });
    }
    const ch = new Sign();
    ch.userid = v.userId;
    ch.lastsign = v.lastsign;
    ch.continuous = v.continuous;
    await ch.save();
  }

  async updateSign (v) {
    const sign = await Sign.findOne({
      where: {
        userid: v.userId
      }
    });
    if (!sign) {
      throw new NotFound({
        code: 10022
      });
    }
    sign.lastsign = v.lastsign;
    sign.continuous = v.continuous;
    await sign.save();
  }
}

export { SignDao };
