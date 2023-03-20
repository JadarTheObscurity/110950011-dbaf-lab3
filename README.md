1. set up `.env` file
```
API_URL = "<API URL of Alchemy>"
PRIVATE_KEY = "<Your wallet private key>"
ETH_API = "<Your API key in Etherscan>"
```

2. Deploy the contract
```
npx hardhat run scripts/Lab3_deploy.js
// Output: Contract deployed at: "<Address of the contract>" 
// e.g. Contract deployed at:  0xcD27BC56A86895F446c99736709B0597791DA0f8
```
Verify the contract
```
npx hardhat verify --network goerli "<Address of the contract>"
```
