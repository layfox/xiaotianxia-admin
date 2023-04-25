import { UserChannel } from '../model/user-channel';
import { Channel } from '../model/channel';

class UserChannelDao {
  async getUserChannel (ctx) {
    const { userId } = ctx.request.query;
    const channels = await Channel.findAll();
    if (!userId) {
      return channels;
    }
    const userChannel = await UserChannel.findOne({
      where: {
        userid: userId
      }
    });
    if (userChannel) {
      const channelIds = JSON.parse(userChannel.dataValues.channel);
      const channel = channels.filter(item => channelIds.includes(item.id));
      return channel;
    } else {
      return channels;
    }
  }

  async updateUserChannel (ctx) {
    const { userId, channel } = ctx.request.body;
    const userChannel = await UserChannel.findOne({
      where: {
        userid: userId
      }
    });
    if (userChannel) {
      userChannel.channel = channel;
      await userChannel.save();
      return;
    }
    const newChannel = new UserChannel();
    newChannel.userid = userId;
    newChannel.channel = channel;
    await newChannel.save();
  }
}

export { UserChannelDao };
