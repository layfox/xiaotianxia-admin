import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Video extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      channel: this.channel,
      name: this.name,
      videoPath: this.videoPath,
      description: this.description,
      posterPath: this.posterPath,
      readCount: this.readCount
    };
    return origin;
  }
}

Video.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    channel: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    videoPath: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    posterPath: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    description: {
      type: Sequelize.STRING(10000),
      allowNull: true
    },
    readCount: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  },
  merge(
    {
      sequelize,
      tableName: 'video',
      modelName: 'video'
    },
    InfoCrudMixin.options
  )
);

export { Video };
