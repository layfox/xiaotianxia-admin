import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  CreateOrUpdateChannelValidator
} from '../../validator/channel';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { ChannelDao } from '../../dao/channel';

// channel 的红图实例
const channelApi = new LinRouter({
  prefix: '/v1/channel',
  module: '频道'
});

// channel 的dao 数据库访问层实例
const channelDto = new ChannelDao();

channelApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const channel = await channelDto.getChannel(id);
  if (!channel) {
    throw new NotFound({
      code: 10022
    });
  }
  ctx.json(channel);
});

channelApi.get('/', async ctx => {
  const channels = await channelDto.getChannels();
  // if (!channels || channels.length < 1) {
  //   throw new NotFound({
  //     message: '没有找到相关书籍'
  //   });
  // }
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

channelApi.post('/', async ctx => {
  const v = await new CreateOrUpdateChannelValidator().validate(ctx);
  await channelDto.createChannel(v);
  ctx.success({
    code: 15
  });
});

channelApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateChannelValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await channelDto.updateChannel(v, id);
  ctx.success({
    code: 16
  });
});

channelApi.linDelete(
  'deletechannel',
  '/:id',
  channelApi.permission('删除频道'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await channelDto.deleteChannel(id);
    ctx.success({
      code: 17
    });
  }
);

module.exports = { channelApi, [disableLoading]: false };
