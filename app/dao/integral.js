import { NotFound, Forbidden } from 'lin-mizar';
import { Integral } from '../model/integral';

class IntegralDao {
  async getIntegral (userId) {
    const integral = await Integral.findOne({
      where: {
        userid: userId
      }
    });
    return integral;
  }

  async createIntegral (v) {
    const integral = await Integral.findOne({
      where: {
        userid: v.userId
      }
    });
    if (integral) {
      throw new Forbidden({
        code: 10240
      });
    }
    const ch = new Integral();
    ch.userid = v.userId;
    ch.available = v.available;
    ch.total = v.total;
    await ch.save();
  }

  async updateintegral (v) {
    const integral = await Integral.findOne({
      where: {
        userid: v.userId
      }
    });
    if (!integral) {
      throw new NotFound({
        code: 10022
      });
    }
    integral.available = v.available;
    integral.total = v.total;
    await integral.save();
  }
}

export { IntegralDao };
