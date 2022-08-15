/**
 * autor    : Baris Demir  
 * Github   : barisdemir49
 * Twitter  : btc_barisdemir
 * linkedin : barisdemir49
 * web      : botcex.com
 * info     : This service was created simply for binance spot API transactions. The heavily used processes were simplified and coded on a single page.
 */

const crypto = require('crypto');
const axios = require('axios');

module.exports = function (apiKey = null, apiSecret = null) {

    const API_KEY = apiKey;
    const API_SECRET = apiSecret;
    let timestamp = Date.now()
    let que = {}
    let sign = ""

    const API_BASE = 'https://api.binance.com';
    const WAPI_BASE = "https://api.binance.com";
    const SAPI_BASE = "https://api.binance.com";
    const FAPI_BASE = "https://fapi.binance.com";
    const BAPI_BASE = "https://www.binance.com";

    function reset() {
        que = {}
        sign = ""
    }
    // header data
    function _getHeaders() {
        return {
            "X-MBX-APIKEY": API_KEY,
            "brokerId": "T3G5NB8X"
        }
    }
    // queryBuilder url data
    function queryBuilder(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
    // Create signature 
    async function _getSignature() {

        que = { ...que, timestamp: Date.now(), recvWindow: 60000 }
        query = queryBuilder(que);
        sign = crypto.createHmac('sha256', API_SECRET).update(query).digest('hex')
        que = {
            ...que,
            signature: sign
        }
        return sign

    }
    async function _getAuth(url) {

        return new Promise((resolve, reject) => {
            axios.get(url.toString(), { headers: _getHeaders() })
                .then(res => { reset(); resolve(res.data) })
                .catch(err => {
                    reject(_errorMessage(err));
                });
        });

    }
    function _postAuth(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url.toString(), data, { headers: _getHeaders() })
                .then(res => { reset(); resolve(res.data) })
                .catch(err => {
                    reject(_errorMessage(err));
                });
        });
    }
    function _deleteAuth(url) {
        return new Promise((resolve, reject) => {
            axios.delete(url.toString(), { headers: _getHeaders() })
                .then(res => { reset(); resolve(res.data) })
                .catch(err => {
                    reject(_errorMessage(err));
                });
        })
    }
    function _get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url.toString())
                .then(res => { reset(); resolve(res.data) })
                .catch(err => reject(_errorMessage(err)));
        });
    }
    function _errorMessage(error) {

        const statusCode = error.response.status.toString();
        const statusText = error.response.statusText;
        const message = error.response.data.message;
        const res = {
            statusCode,
            statusText,
            message
        };
        console.log(res)
        return res
    }


    // Private End Point
    /**
     * 
     * @param {*} assets 
     * @returns  
  [{ asset: 'GTO', free: '0.00000000', locked: '0.00000000' },
  { asset: 'ICX', free: '0.00000000', locked: '0.00000000' },
  { asset: 'OST', free: '0.00000000', locked: '0.00000000' },
  { asset: 'ELF', free: '0.00000000', locked: '0.00000000' },
  { asset: 'AION', free: '0.00000000', locked: '0.00000000' },
  { asset: 'WINGS', free: '0.00000000', locked: '0.00000000' },
  { asset: 'BRD', free: '0.00000000', locked: '0.00000000' },
  { asset: 'NEBL', free: '0.00000000', locked: '0.00000000' }]
     */
    async function myWallet(assets = "") {
        try {
            await _getSignature()
            return await _getAuth(`${API_BASE}/api/v3/account?${queryBuilder(que)}`).then(res => res.balances).catch(e => {
                throw new Error(e.message || e)
            });

        } catch (error) {
            throw new Error(error.message || error)
        }
    }
    /**
    * 
    * @param {*} symbol  string
    * @param {*} quantity  string
    * @param {*} price  string
    * @param {*} side  BUY,SELL
    * @param {} type  MARKET,LIMIT
    * @returns 
                {
                symbol: 'BTCUSDT',
                orderId: 12409240742,
                orderListId: -1,
                clientOrderId: 'pBUqc7SLTmOS9wK0zAmvtM',
                transactTime: 1660397390704,
                price: '30000.00000000',
                origQty: '0.00100000',
                executedQty: '0.00000000',
                cummulativeQuoteQty: '0.00000000',
                status: 'NEW',
                timeInForce: 'GTC',
                type: 'LIMIT',
                side: 'SELL',
                fills: []
                }
    */
    async function orderCreate(symbol, quantity, price, side = 'BUY', type = 'LIMIT') {
        try {
            que = {
                symbol,
                quantity,
                price,
                side,
                type,
                timeInForce: 'GTC'
            }
            await _getSignature()
            return await _postAuth(`${API_BASE}/api/v3/order`, `${queryBuilder(que)}`).then(res => res).catch(e => {
                throw new Error(e.message || e)
            });

        } catch (error) {
            throw new Error(error.message || error)
        }
    }
    /**
     * 
     * @param {*} orderId  orderID
     * @param {*} symbol  
     * @returns 
     *
         {
            symbol: 'BTCUSDT',
            orderId: 12409240742,
            orderListId: -1,
            clientOrderId: 'pBUqc7SLTmOS9wK0zAmvtM',
            price: '30000.00000000',
            origQty: '0.00100000',
            executedQty: '0.00000000',
            cummulativeQuoteQty: '0.00000000',
            status: 'NEW',
            timeInForce: 'GTC',
            type: 'LIMIT',
            side: 'SELL',
            stopPrice: '0.00000000',
            icebergQty: '0.00000000',
            time: 1660397390704,
            updateTime: 1660397390704,
            isWorking: true,
            origQuoteOrderQty: '0.00000000'
         }
     */
    async function getOrder(orderId, symbol) {
        try {
            que = {
                orderId,
                symbol
            }
            await _getSignature()
            return await _getAuth(`${API_BASE}/api/v3/order?${queryBuilder(que)}`).then(res => res).catch(e => {
                throw new Error(e.message || e)
            });

        } catch (error) {
            throw new Error(error.message || error)
        }
    }
    /**
     * 
     * @param {*} symbol 
     * @returns 
        [
            {
                symbol: 'BTCUSDT',
                orderId: 12409204581,
                orderListId: -1,
                clientOrderId: '6ky5fVlA0AEiKngNGR3Km7',
                price: '30000.00000000',
                origQty: '0.00100000',
                executedQty: '0.00000000',
                cummulativeQuoteQty: '0.00000000',
                status: 'NEW',
                timeInForce: 'GTC',
                type: 'LIMIT',
                side: 'SELL',
                stopPrice: '0.00000000',
                icebergQty: '0.00000000',
                time: 1660397256661,
                updateTime: 1660397256661,
                isWorking: true,
                origQuoteOrderQty: '0.00000000'
            },
            {
                symbol: 'BTCUSDT',
                orderId: 12409228043,
                orderListId: -1,
                clientOrderId: 'ZqjxD01pEKl95cDYU5eBqG',
                price: '30000.00000000',
                origQty: '0.00100000',
                executedQty: '0.00000000',
                cummulativeQuoteQty: '0.00000000',
                status: 'NEW',
                timeInForce: 'GTC',
                type: 'LIMIT',
                side: 'SELL',
                stopPrice: '0.00000000',
                icebergQty: '0.00000000',
                time: 1660397338362,
                updateTime: 1660397338362,
                isWorking: true,
                origQuoteOrderQty: '0.00000000'
            },
        ]
     */
    async function getOpenOrders(symbol = null) {
        try {
            if (symbol)
                que = { symbol }
            await _getSignature()
            return await _getAuth(`${API_BASE}/api/v3/openOrders?${queryBuilder(que)}`).then(res => res).catch(e => {
                throw new Error(e.message || e)
            });

        } catch (error) {
            throw new Error(error.message || error)
        }
    }
    /**
     * 
     * @param {*} orderId 
     * @param {*} symbol 
     * @returns 
        {
            symbol: 'BTCUSDT',
            origClientOrderId: 'pBUqc7SLTmOS9wK0zAmvtM',
            orderId: 12409240742,
            orderListId: -1,
            clientOrderId: 'I4Q502zxywwZ8DVpicoHfA',
            price: '30000.00000000',
            origQty: '0.00100000',
            executedQty: '0.00000000',
            cummulativeQuoteQty: '0.00000000',
            status: 'CANCELED',
            timeInForce: 'GTC',
            type: 'LIMIT',
            side: 'SELL'
         }
     */
    async function cancelOrderor(orderId, symbol) {
        try {
            que = {
                orderId,
                symbol
            }
            await _getSignature()
            return await _deleteAuth(`${API_BASE}/api/v3/order?${queryBuilder(que)}`).then(res => res).catch(e => {
                throw new Error(e.message || e)
            });

        } catch (error) {
            throw new Error(error.message || error)
        }
    }
    /**
     * 
     * @param {*} currency 
     * @returns 
                [
                    {
                        coin: 'STPT',
                        depositAllEnable: true,
                        withdrawAllEnable: true,
                        name: 'Standard Tokenization Protocol',
                        free: '0',
                        locked: '0',
                        freeze: '0',
                        withdrawing: '0',
                        ipoing: '0',
                        ipoable: '0',
                        storage: '0',
                        isLegalMoney: false,
                        trading: true,
                        networkList: [
                            {
                            network: 'ETH',
                            coin: 'STPT',
                            withdrawIntegerMultiple: '0.00000001',
                            isDefault: true,
                            depositEnable: true,
                            withdrawEnable: true,
                            depositDesc: '',
                            withdrawDesc: '',
                            specialTips: '',
                            name: 'Ethereum (ERC20)',
                            resetAddressStatus: false,
                            addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
                            addressRule: '',
                            memoRegex: '',
                            withdrawFee: '108',
                            withdrawMin: '216',
                            withdrawMax: '10000000000',
                            minConfirm: 12,
                            unLockConfirm: 0,
                            sameAddress: false,
                            estimatedArrivalTime: 5,
                            busy: false,
                            country: 'AE'
                            }
                        ]
                    }
                ]
     */
    async function networkList(currency = null) {
        try {
            await _getSignature()
            return await _getAuth(`${SAPI_BASE}/sapi/v1/capital/config/getall?${queryBuilder(que)}`).then(res => {
                if (!currency) return res
                return res.find(f => f.coin === currency)
            }).catch(e => {
                throw new Error(e.message || e)
            });

        } catch (error) {
            throw new Error(error.message || error)
        }
    }
    /**
     * 
     * @param {*} currency 
     * @returns 
       {
        coin: 'STPT',
        address: '0x6894c12f8da541ec82c9b25fd5f0ccaa3a7b1599',
        tag: '',
        url: 'https://etherscan.io/address/0x6894c12f8da541ec82c9b25fd5f0ccaa3a7b1599'
        }
     */
    async function depositAddress(currency) {
        try {
            if (currency)
                que = {
                    coin: currency
                }
            await _getSignature()
            return await _getAuth(`${SAPI_BASE}/sapi/v1/capital/deposit/address?${queryBuilder(que)}`).then(res => res).catch(e => {
                throw new Error(e.message || e)
            });

        } catch (error) {
            throw new Error(error.message || error)
        }
    }
    /**
     * 
     * @param {*} symbol 
     * @param {*} limit 
     * @param {*} tradeId 
     * @param {*} startTime 
     * @param {*} endTime 
     * @returns 
     * [
            {
                symbol: 'BTCUSDT',
                id: 1336406302,
                orderId: 10302346834,
                orderListId: -1,
                price: '40091.98000000',
                qty: '0.00057000',
                quoteQty: '22.85242860',
                commission: '0.02285243',
                commissionAsset: 'USDT',
                time: 1650922111382,
                isBuyer: false,
                isMaker: false,
                isBestMatch: true
            },
        ]
     */
    async function history(symbol, limit = 500, tradeId = -1, startTime = null, endTime = null) {
        try {
            que = {
                symbol,
                limit
            }
            if (tradeId > 0)
                que = { ...que, fromId: tradeId }
            if (startTime)
                que = { ...que, startTime }
            if (endTime)
                que = { ...que, endTime }

            await _getSignature()
            return await _getAuth(`${API_BASE}/api/v3/myTrades?${queryBuilder(que)}`).then(res => res).catch(e => {
                throw new Error(e.message || e)
            });

        } catch (error) {
            throw new Error(error.message || error)
        }
    }

    return {
        myWallet,
        orderCreate,
        getOrder,
        getOpenOrders,
        cancelOrderor,
        networkList,
        depositAddress,
        history
    };
}