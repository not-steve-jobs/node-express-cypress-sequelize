const Account = require('./account');
const Transaction = require('./transaction');

Account.hasMany(Transaction,{
    foreignKey: {
        name: 'account_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Transaction.belongsTo(Account,{
    foreignKey: {
        name: 'account_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

const DB = {
    Account,
    Transaction
}

module.exports = DB
