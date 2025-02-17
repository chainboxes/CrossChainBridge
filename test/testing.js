const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrossChainBridge", function () {
    let owner, addr1, addr2, mockToken, bridge;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy MockERC20 token
        const MockERC20 = await ethers.getContractFactory("MockERC20");
        mockToken = await MockERC20.deploy("TestToken", "TTK", ethers.parseEther("1000000"));
        await mockToken.waitForDeployment();

        // Deploy CrossChainBridge contract
        const CrossChainBridge = await ethers.getContractFactory("CrossChainBridge");
        bridge = await CrossChainBridge.deploy(await mockToken.getAddress());
        await bridge.waitForDeployment();
    });

    it("Should correctly deploy and set token address", async function () {
        expect(await bridge.token()).to.equal(await mockToken.getAddress());
    });

    it("Should lock tokens", async function () {
        await mockToken.transfer(addr1.address, ethers.parseEther("100"));
        await mockToken.connect(addr1).approve(await bridge.getAddress(), ethers.parseEther("100"));

        await expect(bridge.connect(addr1).lockTokens(ethers.parseEther("100")))
            .to.emit(bridge, "TokensLocked")
            .withArgs(addr1.address, ethers.parseEther("100"));

        expect(await bridge.lockedTokens(addr1.address)).to.equal(ethers.parseEther("100"));
    });

    it("Should unlock tokens by owner", async function () {
        await mockToken.transfer(addr1.address, ethers.parseEther("100"));
        await mockToken.connect(addr1).approve(await bridge.getAddress(), ethers.parseEther("100"));
        await bridge.connect(addr1).lockTokens(ethers.parseEther("100"));

        await expect(bridge.connect(owner).unlockTokens(addr1.address, ethers.parseEther("50")))
            .to.emit(bridge, "TokensUnlocked")
            .withArgs(addr1.address, ethers.parseEther("50"));

        expect(await bridge.lockedTokens(addr1.address)).to.equal(ethers.parseEther("50"));
    });

    it("Should not allow non-owners to unlock tokens", async function () {
        await mockToken.transfer(addr1.address, ethers.parseEther("100"));
        await mockToken.connect(addr1).approve(await bridge.getAddress(), ethers.parseEther("100"));
        await bridge.connect(addr1).lockTokens(ethers.parseEther("100"));
    
        await expect(
            bridge.connect(addr1).unlockTokens(addr1.address, ethers.parseEther("50"))
        ).to.be.revertedWithCustomError(bridge, "OwnableUnauthorizedAccount").withArgs(addr1.address);
    });
    

    it("Should prevent unlocking more tokens than locked", async function () {
        await mockToken.transfer(addr1.address, ethers.parseEther("100"));
        await mockToken.connect(addr1).approve(await bridge.getAddress(), ethers.parseEther("100"));
        await bridge.connect(addr1).lockTokens(ethers.parseEther("100"));

        await expect(
            bridge.connect(owner).unlockTokens(addr1.address, ethers.parseEther("150"))
        ).to.be.revertedWith("Insufficient locked tokens");
    });
});
