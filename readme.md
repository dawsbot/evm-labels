<p align="center">
  <a><img src="https://etherscan.io/images/logo-ether.png?v=0.0.2" title="Logo" width="400"/></a>
</p>
<p align="center">
  <b>
    EVM Labels
  </b>
  <br>
  <i>A public dataset of crypto addresses labeled (<a href="https://etherscan.io/labelcloud">Ethereum and more</a></i>)
  <br>
</p>

<br/>

## Ethereum

| Label                                                                                              | CSV                                              | JSON                                               | Updated      |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------- | ------------ |
| [`exchange`](https://etherscan.io/accounts/label/exchange) (Centralized Exchanges)                 | [View CSV](./src/mainnet/exchange/all.csv)       | [View JSON](./src/mainnet/exchange/all.json)       | May 9, 2022  |
| [`phish-hack`](https://etherscan.io/accounts/label/phish-hack) (Phishing/Hacking)                  | [View CSV](./src/mainnet/phish-hack/all.csv)     | [View JSON](./src/mainnet/phish-hack/all.json)     | May 15, 2022 |
| [`genesis`](https://etherscan.io/accounts/label/genesis) (Null/black hole addresses)               | [View CSV](./src/mainnet/genesis/all.csv)        | [View JSON](./src/mainnet/genesis/all.json)        | May 21, 2022 |
| [`token-contract`](https://etherscan.io/accounts/label/token-contract) (ERC-20 and similar tokens) | [View CSV](./src/mainnet/token-contract/all.csv) | [View JSON](./src/mainnet/token-contract/all.json) | May 25, 2022 |

More chains coming soon

<br/>

## Install

```sh
npm install --save evm-labels

# or with yarn
yarn add evm-labels
```

<br/>

## Use

You can install the CSV or JSON manually if you are not a dev. If you want to use this in code:

### Exchange (CEX's)

```js
import { exchange } from "evm-labels";

// A Coinbase hot wallet
const COINBASE_ADDRESS = "0x71660c4005ba85c37ccec55d0c4493e66fe775d3";
exchange.isExchangeAddress(COINBASE_ADDRESS);
// true

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
exchange.isExchangeAddress(NULL_ADDRESS);
// false
```

### Phish/Hack (Addresses that performed phishing or hacks)

```js
import { phishHack } from "evm-labels";

// A Nexus Mutual Hacker
const HACKER_ADDRESS = "0x09923e35f19687a524bbca7d42b92b6748534f25";
phishHack.isPhishHackAddress(HACKER_ADDRESS);
// true

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
phishHack.isPhishHackAddress(NULL_ADDRESS);
// false
```

### Genesis

```js
import { genesis } from "evm-labels";

const GENESIS_ADDRESS = "0x0000000000000000000000000000000000000002";
genesis.isGenesisAddress(GENESIS_ADDRESS);
// true

const OATHER_ADDRESS = "0x09923e35f19687a524bbca7d42b92b6748534f25";
genesis.isGenesisAddress(OATHER_ADDRESS);
// false
```

### Token Contract

```js
import { tokenContract } from "evm-labels";

const TOKEN_CONTRACT_ADDRESS = "0x5dd57da40e6866c9fcc34f4b6ddc89f1ba740dfe";
tokenContract.isTokenContractAddress(TOKEN_CONTRACT_ADDRESS);
// true

const OATHER_ADDRESS = "0x0000000000000000000000000000000000000002";
tokenContract.isTokenContractAddress(OATHER_ADDRESS);
// false
```

<br/>

## Contributing

Each label is currently pulled with custom scripts. Partially documented, partially not.

### Generic Scraper (single/all)

1. [Setup selenium](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/) by downloading relevant drivers (chrome) and adding to path.
2. Run scraper located at `scripts` with command `node scrape-all` (ExtractAll) or `node scrape-all labelName`(ExtractSingle) saved at `src/mainnet/all-json`
4. Login to etherscan. (ENV variables support for quick login, `ETHERSCAN_USER` `ETHERSCAN_PASS`) Eg.`export ETHERSCAN_USER=username123`
5. Wait for completion ~20-30 minutes
6. To generate combined-labels after scraping all, run `node combined-all-json` located at `scripts` which will save as `all.json` at `src/mainnet/all-json`

### Phish / Hack addresses

1. Install [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?utm_source=chrome-ntp-icon)
2. Copy [scripts/phishhack-userscript.js](scripts/phishhack-userscript.js) to tampermonkey extension
3. Open the URL `https://etherscan.io/accounts/label/phish-hack?subcatid=undefined&size=100&start=0&col=1&order=asc`. only support size = 100
4. Open the chrome dev tools. Copy the outputted csv and json to `src/phish-hack`

### Genesis addresses

1. Install [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?utm_source=chrome-ntp-icon)
2. Copy [scripts/genesis-userscript.js](scripts/genesis-userscript.js) to tampermonkey extension
3. Open the URL `https://etherscan.io/accounts/label/genesis?subcatid=1&size=100&start=0&col=1&order=asc`. only support size = 100
4. Open the chrome dev tools. Copy the outputted csv and json to `src/genesis`

### Token Contract addresses

1. Install [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?utm_source=chrome-ntp-icon)
2. Copy [scripts/tokencontract-userscript.js](scripts/tokencontract-userscript.js) to tampermonkey extension
3. Open the URL `https://etherscan.io/accounts/label/token-contract?subcatid=undefined&size=100&start=0&col=1&order=asc`. only support size = 100
4. Open the chrome dev tools. Copy the outputted csv and json to `src/token-contract`
