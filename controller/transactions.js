const dotenv = require('dotenv');

dotenv.config();

const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');

const X_CHAIN = 'X';
const P_CHAIN = 'P';
const C_CHAIN = '0x';

exports.getTransactionByHash = async (req, res, next) => {
    let xChainTransaction;
    let cChainTransaction;
    let pChainTransaction;

    xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(req.params.hash);
    cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(req.params.hash);
    pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(req.params.hash);

    if (xChainTransaction == 1 || cChainTransaction == 1 || pChainTransaction == 1) {
        res.send(JSON.parse('{"result": "wrong input"}'));
    } else if (xChainTransaction != 1) {
        res.send(xChainTransaction);
    } else if (cChainTransaction != 1) {
        res.send(cChainTransaction);
    } else if (pChainTransaction != 1) {
        res.send(pChainTransaction);
    }

};

exports.getXTransactionsAfterNthFromAddress = async (req, res, next) => {
    let xChainTransactions;
    let pChainTransactions;

    if ((req.params.address).charAt(0) == X_CHAIN) {
        xChainTransactions = await xChainMethods.getXTransactionsAfterNthFromAddressFromXChain(req.params.address, req.params.n, req.params.x);
        res.send(xChainTransactions);
    } else if ((req.params.address).charAt(0) == P_CHAIN) {
        pChainTransactions = await pChainMethods.getXTransactionsAfterNthFromAddressFromPChain(req.params.address, req.params.n, req.params.x);
        
        if (pChainTransactions == 1) {
            res.send(JSON.parse('{"result":"error"}'));
        } else {
            res.send(pChainTransactions);
        }
    } else {
        res.send(JSON.parse('{"result":"wrong chain"}'));
    }
};
