import { NotFound, Forbidden } from 'lin-mizar';
import { Video } from '../model/video';

class VideoDao {
  async getVideo (id) {
    const video = await Video.findOne({
      where: {
        id
      }
    });
    return video;
  }

  async getVideoByChannel (channel, page, count1) {
    const condition = {
      where: {
        channel: channel
      },
      offset: page * count1,
      limit: count1
    };
    const { rows, count } = await Video.findAndCountAll(condition);

    return {
      users: rows,
      total: count
    };
  }

  async getNewVideo (page, count1) {
    const condition = {
      offset: page * count1,
      limit: count1
    };
    const { rows, count } = await Video.findAndCountAll(condition);

    return {
      users: rows,
      total: count
    };
  }

  async createVideo (v) {
    const video = await Video.findOne({
      where: {
        name: v.get('body.name')
      }
    });
    if (video) {
      throw new Forbidden({
        code: 10240
      });
    }
    const ch = new Video();
    ch.name = v.get('body.name');
    ch.channel = v.get('body.channel');
    ch.videoPath = v.get('body.videoPath');
    ch.posterPath = v.get('body.posterPath');
    ch.description = v.get('body.description') || '';
    await ch.save();
  }

  async deleteVideo (id) {
    const video = await Video.findOne({
      where: {
        id
      }
    });
    if (!video) {
      throw new NotFound({
        code: 10022
      });
    }
    video.destroy();
  }
}

export { VideoDao };
