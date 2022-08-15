# binance-nodejs-api

```
https://www.npmjs.com/package/binance-nodejs-api

```


## Installation

```
npm install binance-nodejs-api
```


#### Authentication Required Features

- myWallet,
- orderCreate,
- getOrder,
- getOpenOrders,
- cancelOrderor,
- networkList,
- depositAddress,
- history


#### Import for public endpoints
```js
const binanceApi = require('binance-nodejs-api')
client = binanceApi()
```
#### Import for private (auth required) endpoints
```js
const btcTurkClient = require('binance-nodejs-api')
client = binanceApi(API_KEY, API_SECRET)
```
## Usage

### Authentication Required Methods
- #### My Wallet 

  ```js

  client.myWallet().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
        [{ asset: 'GTO', free: '0.00000000', locked: '0.00000000' },
        { asset: 'ICX', free: '0.00000000', locked: '0.00000000' },
        { asset: 'OST', free: '0.00000000', locked: '0.00000000' },
        { asset: 'ELF', free: '0.00000000', locked: '0.00000000' },
        { asset: 'AION', free: '0.00000000', locked: '0.00000000' },
        { asset: 'WINGS', free: '0.00000000', locked: '0.00000000' },
        { asset: 'BRD', free: '0.00000000', locked: '0.00000000' },
        { asset: 'NEBL', free: '0.00000000', locked: '0.00000000' }]
  ```

- #### Create Order 
  
    * @param {*} symbol  string
    * @param {*} quantity  string
    * @param {*} price  string
    * @param {*} side  BUY,SELL
    * @param {} type  MARKET,LIMIT

  ```js
        client.orderCreate('BTCUSDT','0.001','30000','SELL').then(async res=>{
        console.log(res)  
        }); 

        client.orderCreate('BTCUSDT','0.001','30000','BUY').then(async res=>{
        console.log(res)  
        }); 
  ```
  **Result:** 
  ```js
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
  ```

- #### Get Order
     * @param {*} orderId  orderID
     * @param {*} symbol 

  ```js
        client.getOrder(12409240742, 'BTCUSDT').then(async res => {
        console.log(res)
        });
  ```
  **Result:** 
  ```js
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
  ```
- #### Get Open Orders

  ```js
        client.getOpenOrders('BTCUSDT').then(async res => {
        console.log(res)
        });
  ```
  **Result:**
  ```js
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

 - #### Cancel Order
  
   ```js
         client.cancelOrderor(12409228043, 'BTCUSDT').then(async res => {
        console.log(res)
        });
   ```  
    **Result:** 
    ```js
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
    ```
 - #### Network List
   
   ```js
        client.networkList('BTC').then(async res => {
        console.log(res)
        });  
   ```  
    **Result:** 
    ```js
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
    ```
 - #### Deposit Adres
        
   ```js
        client.depositAddress('STPT').then(async res => {
        console.log(res)
        })  
   ```  
    **Result:** 
    ```js
       {
        coin: 'STPT',
        address: '0x6894c12f8da541ec82c9b25fd5f0ccaa3a7b1599',
        tag: '',
        url: 'https://etherscan.io/address/0x6894c12f8da541ec82c9b25fd5f0ccaa3a7b1599'
        }
    ```
 - #### History
        
   ```js
        const response =client.history('BTCUSDT',5).then(async res => {
        console.log(res)
        })
   ```  
    **Result:** 
    ```js
       [
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