const transactionModel = require('../models/DB_associations').Transaction;
const accountModel = require('../models/DB_associations').Account;
const {transactionValidate} = require('../validation/transaction');
const sequelize = require('../models/index');

class Transaction {
    amount = async (req, res, next) => {
        try {
            if (req.headers['content-type'] !== "application/json"){
                return res.status(415).json('Wrong content type');
            };

            return sequelize.transaction(async function (t) {
                // Validate request
                console.info('Transfer started- - -');
                const {error, value} = transactionValidate(req.body);
                if (error) {
                    console.error('ValidationError', error.message);
                    return res.status(400).json({
                        message:error.message
                    });
                };
                let account = await accountModel.findOne({ where: {account_id: value.account_id} });
                if (!account){
                    account = await accountModel.create({
                        balance: +(value.amount),
                        account_id: value.account_id
                    });
                    return await account.save();
                }else {
                    let newBalance = +(account.balance) + +(value.amount);
                    return await account.update({
                        where:{
                            account_id:value.account_id,
                        },
                        balance: newBalance
                    });
                }

            }).then(async function (result) {
                const { value } = transactionValidate(req.body);

                result = await transactionModel.create({
                    account_id: value.account_id,
                    amount:value.amount,
                    transaction_id:req.headers['transaction-id']
                });

                await result.save();
                return res.status(200).json(result);
            });

        } catch (e) {
            console.error(e)
            next(e)
        };
    };

    getOne = async (req, res, next) => {
        try{
            console.info('Get one transaction witch ID - - -');
            const { id } = req.params;
            const transfer = await transactionModel.findOne({
                where:{
                    transaction_id:id
                }
            });
            if (!transfer) {
                return res.status(404).json({
                    message:'transfers not found'
                });
            };
            return res.status(200).json(transfer);
        } catch (e) {
            console.error(e);
            next(e)
        };
    };
    getBalance = async (req, res, next) => {
        try{
            console.info('Get Balance - - -');
            const { id } = req.params;
            const account = await accountModel.findOne({
                where:{
                    account_id:id
                }
            });
            if (!account) {
                return res.status(404).json({
                    message:'account not found'
                });
            };
            return res.status(200).json(account);
        } catch (e) {
            console.error(e);
            next(e)
        };
    };
    getMaxVolume = async (req, res, next) => {
        try{
            const accounts = await accountModel.findAll({
                attributes: {
                    include: [
                        [sequelize.fn("COUNT", sequelize.col("transactions.account_id")), "transactionsCount"],
                    ]
                },
                include: [{
                    model: transactionModel, attributes: []
                }],
                group: ['account_id'],
                order: [[sequelize.literal('transactionsCount'), 'DESC']]
            });
            if(!accounts) {
                throw new Error('Account not found')
            };

            let maxVolumeAccounts = [];
            let maxVolume = accounts[0].dataValues.transactionsCount;
            for (let i=0; i<accounts.length; i++){
                if (accounts[i].dataValues.transactionsCount >= maxVolume){
                    maxVolume = accounts[i].dataValues.transactionsCount;
                    maxVolumeAccounts.push(accounts[i].dataValues.account_id);
                };
            };
            let maxVolumeAccountsLength = maxVolumeAccounts.length;
            return res.status(200).json({
                'maxVolume':maxVolume,
                'accounts.length':maxVolumeAccountsLength,
                'accounts':maxVolumeAccounts
            });
        } catch (e) {
            console.error(e);
            next(e)
        };
    };
};

module.exports = new Transaction();