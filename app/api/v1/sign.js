import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { SignDao } from '../../dao/sign';
import { IntegralDao } from '../../dao/integral';
import { IntegralDetailDao } from '../../dao/integral-detail';
import { UserDao } from '../../dao/user';

const moment = require('moment');
function getIntegral (value) {
  if (value === 0) {
    return 1;
  } else if (value === 1 || value === 2) {
    return 2;
  } else if (value === 3 || value === 4) {
    return 4;
  } else if (value === 5) {
    return 5;
  }
  return Math.ceil((Math.random() * 4 + 6));
}

// channel 的红图实例
const signApi = new LinRouter({
  prefix: '/v1/sign',
  module: '签到'
});

// channel 的dao 数据库访问层实例
const signDto = new SignDao();
const integralDto = new IntegralDao();
const integralDetailDto = new IntegralDetailDao();
const userDao = new UserDao();

signApi.get('/', async ctx => {
  const userId = ctx.request.query.userId;
  const sign = await signDto.getSign(userId);
  const today = moment(moment().format('YYYY-MM-DD'));
  const yesterday = moment(moment().add(-1, 'd').format('YYYY-MM-DD'));
  const info = await userDao.getInformation({
    currentUser: {
      id: userId
    }
  });
  if (!info) {
    throw new NotFound({
      code: 10021
    });
  }
  if (!sign) {
    ctx.json({
      continuous: 0,
      signed: false
    });
    return;
  }
  const data = sign.dataValues;
  const lastsign = moment(data.lastsign);
  if (lastsign >= today) {
    ctx.json({
      continuous: data.continuous,
      signed: true
    });
  } else if (lastsign >= yesterday) {
    ctx.json({
      continuous: data.continuous,
      signed: false
    });
  } else {
    signDto.updateSign({ continuous: 0, userId });
    ctx.json({
      continuous: 0,
      signed: false
    });
  }
});

signApi.post('/', async ctx => {
  const v = ctx.request.body;
  const userId = v.userId;
  const sign = await signDto.getSign(userId);
  const now = moment();
  const today = moment(moment().format('YYYY-MM-DD'));
  const yesterday = moment(moment().add(-1, 'd').format('YYYY-MM-DD'));
  const integral = await integralDto.getIntegralByUserId(userId);
  let integralValue = 0;
  const info = await userDao.getInformation({
    currentUser: {
      id: userId
    }
  });
  console.log(info, 11111);
  if (!info) {
    throw new NotFound({
      code: 10021
    });
  }

  const userName = info.username;
  if (!sign) {
    await signDto.createSign({ userId, lastsign: now, continuous: 1 });
    // await updateUserIntegral(1, userId)
    ctx.json({
      continuous: 1,
      signed: true,
      integral: 1
    });
    integralValue = 1;
  } else {
    const data = sign.dataValues;
    const lastsign = moment(data.lastsign);
    if (lastsign >= today) {
      ctx.success({
        code: 20
      });
    } else if (lastsign >= yesterday) {
      await signDto.updateSign({ lastsign: now, continuous: data.continuous + 1, userId });
      const integral = getIntegral(data.continuous);
      // await updateUserIntegral(integral, userId);
      ctx.json({
        continuous: data.continuous + 1,
        signed: true,
        integral
      });
      integralValue = integral;
    } else {
      await signDto.updateSign({ lastsign: now, continuous: 1, userId });
      // await updateUserIntegral(1, userId);
      ctx.json({
        continuous: 1,
        signed: true,
        integral: 1
      });
      integralValue = 1;
    }
  }
  if (!integral) {
    if (integralValue) {
      await integralDto.createIntegral({
        userId,
        userName,
        available: integralValue,
        total: integralValue
      });
    }
  } else {
    let available = integral.available;
    let total = integral.total;
    if (integralValue) {
      available += integralValue;
      total += integralValue;
      await integralDto.updateIntegral({
        available,
        total
      });
    }
  }
  // 积分详情列表插入数据
  if (integralValue) {
    await integralDetailDto.createIntegralRecord({
      userId,
      type: 1,
      userName,
      integral: integralValue
    });
  }
});

module.exports = { signApi, [disableLoading]: false };
