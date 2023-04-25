import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Channel extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      title: this.title,
      summary: this.summary
    };
    return origin;
  }
}

Channel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    summary: {
      type: Sequelize.STRING(1000),
      allowNull: true
    }
  },
  merge(
    {
      sequelize,
      tableName: 'channel',
      modelName: 'channel'
    },
    InfoCrudMixin.options
  )
);

export { Channel };
