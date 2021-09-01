const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Account = sequelize.define("account", {
    account_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});


module.exports = Account