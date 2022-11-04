import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "users_user_name_key"
    },
    user_email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "users_user_phone_key"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_user_name_key",
        unique: true,
        fields: [
          { name: "user_name" },
        ]
      },
      {
        name: "users_user_phone_key",
        unique: true,
        fields: [
          { name: "user_phone" },
        ]
      },
    ]
  });
  }
}
