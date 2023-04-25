import { LinRouter, disableLoading } from 'lin-mizar';
import { UserChannelDao } from '../../dao/user-channel';

// channel 的红图实例
const userChannelApi = new LinRouter({
  prefix: '/v1/userChannel',
  module: '用户频道'
});

// channel 的dao 数据库访问层实例
const userChannelDto = new UserChannelDao();

userChannelApi.get('/', async ctx => {
  const channels = await userChannelDto.getUserChannel(ctx);
  ctx.json(channels);
});

// channelApi.get('/search/one', async ctx => {
//   // const v = await new channelSearchValidator().validate(ctx);
//   const channel = await channelDto.getchannelByKeyword(v.get('query.q'));
//   if (!channel) {
//     throw new channelNotFound();
//   }
//   ctx.json(channel);
// });

userChannelApi.post('/', async ctx => {
  await userChannelDto.updateUserChannel(ctx);
  ctx.success({
    code: 19
  });
});

module.exports = { userChannelApi, [disableLoading]: false };
