import Sequelize from "sequelize";
import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _users from  "./users.js";

import config from "../config/config.js";

const sequelize = new Sequelize(
config.db_name,
config.db_username,
config.db_password,
{
  dialect : "postgres",
  pool : {
    max : 5,
    min : 0,
    acquire : 30000,
    idle : 10000,
  }
}
)

const initModels = (sequelize) => {
  const users = _users.init(sequelize, DataTypes);


  return {
    users,
  };
}

const models = initModels(sequelize);

export default models;
export {sequelize};