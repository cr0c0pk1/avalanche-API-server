const dotenv = require('dotenv');

dotenv.config();

const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');

const X_CHAIN = 'X';
const P_CHAIN = 'P';
const C_CHAIN = '0x';

//GET address info by hash
exports.getAddressInfoByHash = async (req, res, next) => {
    let addressInfoFromXChain;
    let addressInfoFromCChain;
    let addressInfoFromPChain;

    if ((req.params.hash).charAt(0) == X_CHAIN) {
        addressInfoFromXChain = await xChainMethods.getAddressInfoByHashFromXChain(req.params.hash);
        res.send(addressInfoFromXChain);
    } else if ((req.params.hash).charAt(0) == P_CHAIN) {
        addressInfoFromPChain = await pChainMethods.getAddressInfoFromPChain(req.params.hash);
        res.send(addressInfoFromPChain);
    } else if ((req.params.hash).slice(0, 2) == C_CHAIN){
        addressInfoFromCChain = await cChainMethods.getAddressInfoFromCChain(req.params.hash);
        res.send(addressInfoFromCChain);
    }
};