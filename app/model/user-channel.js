import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class UserChannel extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      title: this.title,
      summary: this.summary
    };
    return origin;
  }
}

UserChannel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    channel: {
      type: Sequelize.STRING(10000),
      allowNull: false
    }
  },
  merge(
    {
      sequelize,
      tableName: 'user_channel',
      modelName: 'user_channel'
    },
    InfoCrudMixin.options
  )
);

export { UserChannel };
