import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Sign extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      userid: this.userid,
      lastsign: this.lastsign,
      continuous: this.continuous
    };
    return origin;
  }
}

Sign.init(
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
    lastsign: {
      type: Sequelize.DATE,
      allowNull: false
    },
    continuous: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  merge(
    {
      sequelize,
      tableName: 'sign',
      modelName: 'sign'
    },
    InfoCrudMixin.options
  )
);

export { Sign };
