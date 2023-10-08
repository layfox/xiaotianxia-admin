import { IntegralDetail } from '../model/integral-detail';

class IntegralDetailDao {
  async getIntegralDetail (userId) {
    const integral = await IntegralDetail.findAll({
      where: {
        userid: userId
      }
    });
    return integral;
  }

  async createIntegralRecord (v) {
    const ch = new IntegralDetail();
    ch.userid = v.userId;
    ch.type = v.type;
    ch.integral = v.integral;
    ch.username = v.userName;
    await ch.save();
  }
}

export { IntegralDetailDao };
