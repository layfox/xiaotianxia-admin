import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Integral extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      userid: this.userid,
      available: this.available,
      total: this.total,
      username: this.username
    };
    return origin;
  }
}

Integral.init(
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
    username: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: '用户名，唯一'
    },
    available: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  merge(
    {
      sequelize,
      tableName: 'integral',
      modelName: 'integral'
    },
    InfoCrudMixin.options
  )
);

export { Integral };
