import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { IntegralDetailDao } from '../../dao/integral-detail';

// integral 的红图实例
const integralDetailApi = new LinRouter({
  prefix: '/v1/integralDetail',
  module: '积分详情'
});

// integral 的dao 数据库访问层实例
const integralDetailDto = new IntegralDetailDao();

integralDetailApi.get('/', async ctx => {
  const userId = ctx.request.query.userId;
  const integral = await integralDetailDto.getIntegralDetail(userId);
  if (!integral) {
    throw new NotFound({
      code: 10022
    });
  }
  ctx.json(integral);
});

// type类型表示积分变化方式，1表示签到，2表示使用
integralDetailApi.post('/', async ctx => {
  const userId = ctx.request.body.userId;
  const type = ctx.request.body.type;
  const integral = ctx.request.body.integral;
  await integralDetailDto.createIntegralRecord({
    userId,
    type,
    integral
  });
  ctx.success({
    code: 22
  });
});

module.exports = { integralDetailApi, [disableLoading]: false };
