
/* USER ROAM-FIN SETTINGS */
// window.roamFinancial = {}
// window.roamFinancial.crypto = {
//   tickers: [
//     'BTC', 
//     'ETH', 
//     'LTC',
//     'BAT',
//     'XRP',
//     'BNB',
//     'CEL',
//     'NEO',
//     'IOTA',
//     'XLM'
//   ],
//   currency: 'usd'
// }


// const s = document.createElement("script");
// s.src = "https://storage.googleapis.com/roam-test/base-roam.js"
// s.async = true;
// s.type = "text/javascript"
//document.getElementsByTagName("head")[0].appendChild(s);

/*   ROAM/JS-TEMPLATES    */


/*      ROAM-FINANCIAL       */
const months = new Set(['January', 'Jan', 
                       'February', 'Feb', 
                       'March', 'Mar', 
                       'April', 'Apr',
                       'October', 'Oct'])

const coinTickerToGeckoID = {
    BTC: 'bitcoin',
  	ETH: 'ethereum',
  	LTC: 'litecoin',
	  ADA: 'cardano',
    BCH: 'bitcoin-cash',
  	BNB: 'binancecoin',
  	USDT: 'tether',
  	XRP: 'ripple',
  	LINK: 'chainlink',
  	DOT: 'polkadot',
  	BSV: 'bitcoin-cash-sv',
  	CRO: 'crypto-com-chain',
  	USDC: 'usd-coin',
  	EOS: 'eos',
  	XMR: 'monero',
  	TRX: 'tron',
  	OKB: 'okb',
  	XTZ: 'tezoz',
  	XLM: 'stellar',
  	ATOM: 'cosmos',
  	CDAI: 'cdai',
  	WBTC: 'wrapped-bitcoin',
  	NEO: 'neo',
  	IOTA: 'iota',
  	LEO: 'leo-token',
  	HT: 'huobi-token',
  	XEM: 'nem',
  	DAI: 'dai',
  	BUSD: 'binance-usd',
  	THETA: 'theta-token',
  	VET: 'vechain',
  	ZEC: 'zcash',
  	DASH: 'dash',
  	LEND: 'ethlend',
  	UNI: 'uniswap',
  	AAVE: 'aave',
  	MKR: 'maker',
  	CEL: 'celsius-degree-token',
  	SNX: 'havven',
}

const tokenContractID = {
	BAT: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  	CEL: '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d',
  	SNX: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
}

const currencySymbols = {
 	usd: '$',
  	eur: '€',
  	gbp: '£',
  	rub: '₽',
  	inr: '₹',
  	try: '₺',
  	jpy: '¥',
  	cny: '¥',
  	mxn: '₱',
	dkk: 'K',
	nok: 'K',
  	btc: '₿',
  	eth: 'Ξ',
  	ltc: 'Ł',
	eos: 'E',
	bch: 'B',
	bnb: 'B',
	link: 'L',
	dot: 'D',
	yfi: 'Y',
	xrp: 'X',
	xlm: 'X',
}


const greenHex = '#008000'
const redHex = '#FF0000'
const barCellStyle = {
  backgroundColor: "#CFD8DC",
  color: greenHex,
  width: "124px",
  padding: "4px",
  flexDirection: "row",
  borderRight: '1px solid #ffffff',
  borderBottom: '1px solid #ffffff'
}

const mainDivStyle = {
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: '16px',
  flexWrap: 'wrap',
}
var timeout;

const getCoinData = async (ticker) => {
  let coinId 
  let contractId
  const currency = window.roamFinancial.crypto.currency 
  
  if(tokenContractID[ticker]){
    contractId = tokenContractID[ticker]
  } else {
    coinId = coinTickerToGeckoID[ticker]
  }
  
  if(coinId){
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`)
  	const responseJSON = await response.json()
 	// console.log(responseJSON)
  	return responseJSON[coinId][currency]
  } else {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractId}&vs_currencies=${currency}`)
  	const responseJSON = await response.json()
 	// console.log(responseJSON)
  	return responseJSON[contractId][currency]
  }
 
}


const convertDollarToFloat = (dollarValue) => {
  const pattern = /[^0-9.-]+/g;
  return parseFloat(dollarValue.replace(pattern, ''))
}

const coinCellFormatText = (coin, value) => {
  const symbol = currencySymbols[window.roamFinancial.crypto.currency] ? 
        currencySymbols[window.roamFinancial.crypto.currency]:'$'
  
  let valueString = value.toString()
  if(valueString.split('.')[1].length === 1){
    valueString = valueString + '0'
  }
  
  return `${coin}: ${symbol}${valueString}`
}

const createCryptoTickerBar = async (coins) => {
  const mainDiv = createDivElem(mainDivStyle)
  mainDiv.id = 'roam-fin-crypto-ticker-bar'
  coins.forEach(async (coin, index) => {
      barCellStyle.order = index
      const coinCell = createDivElem(barCellStyle)
      coinCell.id = 'roam-fin-crypto-cell'
      const coinValue = await getCoinData(coin)
      const cellString = coinCellFormatText(coin, coinValue)

      addTextToElem(cellString, coinCell)
      addChildToElem(mainDiv, coinCell)
  })

  return mainDiv
}

const deployCryptoTickerBar = async () => {

    const title = document.querySelector(".rm-title-display")

    if(title){
      	const splitTitle = title.innerText.split(' ')
    	 if(months.has(splitTitle[0])){
          const checkExistingCryptoBar = document.querySelector('#roam-fin-crypto-ticker-bar')

          if(checkExistingCryptoBar){
              const checkExistingCells = document.querySelectorAll("#roam-fin-crypto-cell")
              checkExistingCells.forEach(async coinCell => {
                const innerText = coinCell.innerText.split(':')
                const ticker = innerText[0]
                const newValue = await getCoinData(ticker)
                const newValueFloat = convertDollarToFloat(innerText[1])
              
                if(newValue < newValueFloat){
                  coinCell.style.color = redHex
                } else if (newValue > newValueFloat){
                  coinCell.style.color = greenHex
                }
                coinCell.innerText = coinCellFormatText(ticker, newValue)
              })
          } else {
              const cryptoBar = await createCryptoTickerBar(window.roamFinancial.crypto.tickers)
              title.after(cryptoBar)
          }
       }	
    }
 
  timeout = setTimeout(deployCryptoTickerBar, 30000)
} 


deployCryptoTickerBar()
window.addEventListener('hashchange', () => {
  clearTimeout(timeout)
  deployCryptoTickerBar()
})

