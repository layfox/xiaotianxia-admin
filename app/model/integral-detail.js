import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class IntegralDetail extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      userid: this.userid,
      type: this.type,
      integral: this.integral
    };
    return origin;
  }
}

IntegralDetail.init(
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
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    integral: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  merge(
    {
      sequelize,
      tableName: 'integral_detail',
      modelName: 'integral_detail'
    },
    InfoCrudMixin.options
  )
);

export { IntegralDetail };
