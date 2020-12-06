# roamjs-finance

A suite of plugins around finance for [Roam Research](https://roamresearch.com):

[crypto-price-table](#crypto-price-table): displays a table with cryptocurrency prices on all daily note pages. Prices are updated every 30s and the color changes from green/red depending on if price went up or down.

![screenshot_crypto-price-table](https://user-images.githubusercontent.com/43050331/99411028-02b58780-28a8-11eb-99b4-fddbf3f0ecc4.png)

stock-price-table: coming soon!

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fnatterstefan%2Froamjs-finance)

## Installation

0. If you don't already have a roam/js page created in Roam, create one now:
    - Create a page called roam/js
    - On the first bullet point, create this block `{{[[roam/js]]}}`. This will now instantiate roam/js, a box should appear with a button to toggle roam/js on/off.
    - Create code block on second bullet point using back ticks ` ``` ``` `. Set the code block to javascript

1. In the javascript code block for roam/js, add the following snippets of code. Change the ticker and currency values based on what makes the most sense for you. See below in [features](#features) section to see which values are supported.

```js
window.roamFinance = {}
window.roamFinance.crypto = {
  tickers: [
    'BTC', 
    'ETH', 
    'LTC',
    'BAT',
    'CEL',
    'NEO',
  ],
  currency: 'eur'
}

const addFinanceScript = (name) => {
  var old = document.getElementById("roam-fin-" + name);
  if (old) {
    old.remove();
  }

  var s = document.createElement("script");
  s.src = `https://roamjs-finance.andreynocap.com/${name}.js`;
  s.id = name;
  s.async = true;
  s.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(s);
};
addFinanceScript("crypto-price-table");
```

2. Restart your browser page or roam/js for the script to activate

## Features

### Crypto Price Table

This creates a table of crypto currency prices at the top of any "daily page". The table updates with new prices every 30 seconds and will change from green/red depending on if the price went up/down since the previous value.

The following coin tickers and currencies are supported:

#### Tickers
|      |      |      |      |      |      |      |      |      |      |      |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| BTC  | ETH  | LTC  | ADA  | AAVE | ALGO | ATOM | AVAX | BCH  | BNB  | BSV  | 
| BUSD | CEL  | CDAI | CRO  | DAI  | DASH | DOT  | EOS  | HT   | IOTA | LEO  | 
| LEND | LINK | MKR  | NEO  | OKB  | SNX  | THETA| TRX  | UNI  | USDC | USDT | 
| VET  | WBTC | XEM  | XLM  | XMR  | XRP  | XTZ  | ZEC  |

 
#### Currencies
|      |      |      |      |      |      |      |      |      |      |      |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| eur  | usd  | cny  | dkk  | gbp  | inr  | jpy  | mxn  | nok  | rus  | try  |   
| btc  | eth  | ltc  | bch  | bnb  | dot  | eos  | link | xlm  | xrp  | yfi  |  
  

### Stock Price Table

Coming Soon!

## Contributing

Thank you for your interest to contribute! Follow the steps below to troubleshoot locally. Submit a PR once you're ready.

If you're looking to add a coin or currency, copy/paste the existing code and change the values for your coin. This plugin uses [coingecko.com](https://coingecko.com) for the API, check for the correct coin ID in their API guide.

### Local Setup
1. Install npm
    - brew install node
2. Install dependencies
    - npm install
3. Build the project
    - npm build
4. Serve the built files
    - npm run local
Change src in roam/js to http://127.0.0.1:8080/build/${name}.js
