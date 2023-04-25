import { NotFound, Forbidden } from 'lin-mizar';
import Sequelize from 'sequelize';
import { Channel } from '../model/channel';

class ChannelDao {
  async getChannel (id) {
    const channel = await Channel.findOne({
      where: {
        id
      }
    });
    return channel;
  }

  async getChannelByKeyword (q) {
    const channel = await Channel.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return channel;
  }

  async getChannels () {
    const channels = await Channel.findAll();
    return channels;
  }

  async createChannel (v) {
    const channel = await Channel.findOne({
      where: {
        title: v.get('body.title')
      }
    });
    if (channel) {
      throw new Forbidden({
        code: 10240
      });
    }
    const ch = new Channel();
    ch.title = v.get('body.title');
    ch.summary = v.get('body.summary');
    await ch.save();
  }

  async updateChannel (v, id) {
    const channel = await Channel.findByPk(id);
    if (!channel) {
      throw new NotFound({
        code: 10022
      });
    }
    channel.title = v.get('body.title');
    channel.summary = v.get('body.summary');
    await channel.save();
  }

  async deleteChannel (id) {
    const channel = await Channel.findOne({
      where: {
        id
      }
    });
    if (!channel) {
      throw new NotFound({
        code: 10022
      });
    }
    channel.destroy();
  }
}

export { ChannelDao };
