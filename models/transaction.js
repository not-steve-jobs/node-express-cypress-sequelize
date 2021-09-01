const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Transaction = sequelize.define("transaction", {
    transaction_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.INTEGER
    },
    account_id: {
        type: DataTypes.UUID,
        allowNull: false,
    }
});


module.exports = Transaction