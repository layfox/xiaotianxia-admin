import { NotFound, Forbidden } from 'lin-mizar';
import { Integral } from '../model/integral';
import Sequelize from 'sequelize';

class IntegralDao {
  async getIntegral (userName, page, count1) {
    const condition = {
      where: {
        username: {
          [Sequelize.Op.like]: `%${userName}%`
        }
      },
      offset: page * count1,
      limit: count1
    };
    const { rows, count } = await Integral.findAndCountAll(condition);
    return {
      items: rows,
      total: count
    };
  }

  async getIntegralByUserId (userId) {
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
    ch.username = v.userName;
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
