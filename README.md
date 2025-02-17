# CrossChainBridge

A simple **Cross-Chain Bridge** that allows users to **lock and unlock ERC-20 tokens** securely.

## Overview
The **CrossChainBridge** smart contract enables users to:
- **Lock tokens** on the source chain.
- **Unlock tokens** on the destination chain (controlled by the owner).

This bridge ensures **secure token transfers across chains** while maintaining transparency and control.

## Features
- **Token Locking:** Users can deposit ERC-20 tokens into the bridge.
- **Token Unlocking:** Only the contract owner can unlock tokens for users.
- **Secure & Efficient:** Uses Solidity best practices for security and gas optimization.

## Deployment
### Prerequisites
Ensure you have **Node.js**, **npm**, and **Hardhat** installed.

### Steps
1. **Clone the Repository:**
   ```
   git clone https://github.com/chainboxes/CrossChainBridge.git
   cd CrossChainBridge
   ```  
2. **Install Dependencies:**  
   ```
   npm install
   ```  
3. **Compile the Smart Contracts:**  
   ```
   npx hardhat compile
   ```  
4. **Deploy on Hardhat Local Network:**  
   ```
   npx hardhat run scripts/deploy.js --network localhost
   ```

## Testing
Run unit tests using Hardhat:
```
npx hardhat test
```

Expected outputs:
- ✅ Should deploy correctly
- ✅ Should lock and unlock tokens
- ✅ Should prevent unauthorized unlocking

## Project Structure
```
CrossChainBridge/
│── contracts/
│   ├── CrossChain.sol      # Main bridge contract  
│   ├── MockERC20.sol       # Mock ERC-20 token for testing  
│── scripts/
│   ├── deploy.js           # Deployment script  
│── test/
│   ├── testing.js          # Hardhat test script  
│── hardhat.config.js       # Hardhat configuration  
│── README.md               # Project documentation  
```


📩 **Contact:** [GitHub Issues](https://github.com/chainboxes/CrossChainBridge/issues)

## License
This project is licensed under the **MIT License**.

Thank You !

