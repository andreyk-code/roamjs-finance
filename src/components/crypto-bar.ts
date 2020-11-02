import { 
  createDivElem,
  addTextToElem,
  addChildToElem
} from '../common'



const months = new Set(['January', 'Jan', 
                       'February', 'Feb', 
                       'March', 'Mar', 
                       'April', 'Apr',
                       'May',
                       'June', 'Jun',
                       'July', 'Jul',
                       'August', 'Aug',
                       'September', 'Sept', 
                       'October', 'Oct',
                       'November', 'Nov',
                       'December', 'Dec',])

      
const coinTickerToGeckoID: Record<string, string> = {
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

const tokenContractID: Record<string, string> = {
	BAT: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  CEL: '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d',
  SNX: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
}

const currencySymbols: Record<string, string> = {
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

const barCellStyle: Record<string, string> =  {
  backgroundColor: "#CFD8DC",
  color: greenHex,
  width: "124px",
  padding: "4px",
  flexDirection: "row",
  borderRight: '1px solid #ffffff',
  borderBottom: '1px solid #ffffff'
}

const mainDivStyle: Record<string, string> =  {
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: '16px',
  flexWrap: 'wrap',
}


let timeout: ReturnType<typeof setTimeout>;

const getCoinData = async (ticker: string) => {
  let coinId 
  let contractId
  const currency = window.roamFinance.crypto.currency 

  if(tokenContractID[ticker]){
    contractId = tokenContractID[ticker]
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractId}&vs_currencies=${currency}`)
  	const responseJSON = await response.json()
 	// console.log(responseJSON)
  	return responseJSON[contractId][currency]
  } else {
    coinId = coinTickerToGeckoID[ticker]
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`)
  	const responseJSON = await response.json()
 	// console.log(responseJSON)
  	return responseJSON[coinId][currency]
  }
 
}


const convertDollarToFloat = (dollarValue: string) => {
  const pattern = /[^0-9.-]+/g;
  return parseFloat(dollarValue.replace(pattern, ''))
}

const coinCellFormatText = (coin: string, value: number) => {
  const symbol = currencySymbols[window.roamFinance.crypto.currency] ? 
        currencySymbols[window.roamFinance.crypto.currency]:'$'
  
  let valueString = value.toString()
  if(valueString.split('.')[1].length === 1){
    valueString = valueString + '0'
  }
  
  return `${coin}: ${symbol}${valueString}`
}

const createCryptoTickerBar = async (coins: string[]) => {
  const mainDiv = createDivElem(mainDivStyle)
  mainDiv.id = 'roam-fin-crypto-bar'
  coins.forEach(async (coin: string, index: number) => {
      barCellStyle.order = index.toString()
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

  const title: HTMLElement = document.querySelector(".rm-title-display");
  if(title){
      const splitTitle = title.innerText.split(' ')
      if(months.has(splitTitle[0])){
        const checkExistingCryptoBar: HTMLElement = document.querySelector('#roam-fin-crypto-bar')

        if(checkExistingCryptoBar){
            const checkExistingCells: NodeListOf<HTMLElement> = document.querySelectorAll("#roam-fin-crypto-cell")
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
            const cryptoBar = await createCryptoTickerBar(window.roamFinance.crypto.tickers)
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

