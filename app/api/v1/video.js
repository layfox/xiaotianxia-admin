import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  CreateVideoValidator
} from '../../validator/video';
import { PaginateValidator, PositiveIdValidator } from '../../validator/common';
import { VideoDao } from '../../dao/video';

// video 的红图实例
const videoApi = new LinRouter({
  prefix: '/v1/video',
  module: '视频'
});

// video 的dao 数据库访问层实例
const videoDto = new VideoDao();

videoApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const video = await videoDto.getVideo(id);
  if (!video) {
    throw new NotFound({
      code: 10022
    });
  }
  ctx.json(video);
});

videoApi.get('/', async ctx => {
  const v = await new PaginateValidator().validate(ctx);
  const page = v.get('body.pageNo');
  const count = v.get('body.pageSize');
  const videos = await videoDto.getNewVideo(page, count);
  ctx.json(videos);
});

videoApi.get('/channel', async ctx => {
  const v = await new PaginateValidator().validate(ctx);
  const page = v.get('body.pageNo');
  const count = v.get('body.pageSize');
  const channel = v.get('body.channel');
  const videos = await videoDto.getVideoByChannel(channel, page, count);
  ctx.json(videos);
});

videoApi.post('/', async ctx => {
  const v = await new CreateVideoValidator().validate(ctx);
  await videoDto.createvideo(v);
  ctx.success({
    code: 23
  });
});

videoApi.linDelete(
  'deleteVideo',
  '/:id',
  videoApi.permission('删除视频'),
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await videoDto.deletevideo(id);
    ctx.success({
      code: 24
    });
  }
);

module.exports = { videoApi, [disableLoading]: false };
