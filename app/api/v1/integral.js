import { LinRouter, NotFound, disableLoading, ParametersException } from 'lin-mizar';
import {
  CreateOrUpdateIntegralValidator
} from '../../validator/integral';

import { IntegralDao } from '../../dao/integral';

// integral 的红图实例
const integralApi = new LinRouter({
  prefix: '/v1/integral',
  module: '积分'
});

// integral 的dao 数据库访问层实例
const integralDto = new IntegralDao();

integralApi.get('/', async ctx => {
  const userId = ctx.request.query.userId;
  const integral = await integralDto.getIntegral(userId);
  if (!integral) {
    throw new NotFound({
      code: 10022
    });
  }
  ctx.json(integral);
});

// type类型表示积分变化方式，1表示签到，2表示使用
integralApi.post('/', async ctx => {
  const v = await new CreateOrUpdateIntegralValidator().validate(ctx);
  const userId = v.get('body.userId');
  const type = v.get('body.type');
  const value = v.get('body.integral');
  const integral = await integralDto.getIntegral(userId);
  if (!integral) {
    let available = 0;
    let total = 0;
    if (type === 2) {
      throw new ParametersException({
        code: 10030
      });
    } else {
      available += value;
      total += value;
    }
    await integralDto.createIntegral({
      userId,
      available,
      total
    });
  } else {
    let available = integral.available;
    let total = integral.total;
    if (type === 2) {
      if (value > available) {
        throw new ParametersException({
          code: 10030
        });
      }
      available -= value;
    } else {
      available += value;
      total += value;
    }
    await integralDto.updateIntegral({
      available,
      total
    });
  }
  ctx.success({
    code: 22
  });
});

module.exports = { integralApi, [disableLoading]: false };
