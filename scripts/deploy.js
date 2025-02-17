const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy MockERC20 token
    const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
    const mockToken = await MockERC20.deploy("TestToken", "TTK", 1000000);
    await mockToken.waitForDeployment(); // ✅ Use waitForDeployment() instead of deployed()
    console.log("MockERC20 deployed to:", await mockToken.getAddress());

    // Deploy CrossChainBridge contract
    const CrossChainBridge = await hre.ethers.getContractFactory("CrossChainBridge");
    const bridge = await CrossChainBridge.deploy(await mockToken.getAddress()); // Use correct token address
    await bridge.waitForDeployment(); // ✅ Use waitForDeployment() instead of deployed()
    console.log("CrossChainBridge deployed to:", await bridge.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
