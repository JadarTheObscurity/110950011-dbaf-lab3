const { expect } = require("chai");

describe("SafeContract", function() {


  beforeEach(async function() {
    const [owner] = await ethers.getSigners();
    // Get the contract factories
    Token = await ethers.getContractFactory("Token", owner);
    Lab3 = await ethers.getContractFactory("Lab3");

    // Deploy the token contract
    token = await Token.deploy(ethers.utils.parseEther("100"),);

    // Deploy the safe contract
    lab3 = await Lab3.deploy();

  });
  describe ("Deployment", function () {
    it ("Should assign the total supply to owner", async function () {
      const [owner] = await ethers.getSigners();
      console.log(await token.name());
      console.log(await token.symbol());
      const ownerBalance = await token.balanceOf(owner.address);
      console.log(await token.totalSupply());
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });
  describe ("Deposit fund", function () {
    it ("Can deposit with sufficient allowance", async function () {
      [owner] = await ethers.getSigners();
      const tokens_to_deposit = ethers.utils.parseEther("50");
      token.approve(lab3.address, tokens_to_deposit);
      await lab3.deposit(token.address, tokens_to_deposit);
      expect(await lab3.balanceOf(owner.address)).to.equal(tokens_to_deposit);
    });
    it ("Cannot deposit with insufficient allowance", async function (){
      [owner] = await ethers.getSigners();
      const tokens_to_deposit = ethers.utils.parseEther("50");
      token.approve(lab3.address, tokens_to_deposit.sub("1"));
      await expect(lab3.deposit(token.address, tokens_to_deposit)).to.be.revertedWith("Please allow more.");
    });
  });
  describe ("Withdraw fund", function () {
    it ("Can withdraw with sufficient balance", async function () {
      [owner] = await ethers.getSigners();
      const tokens_to_deposit = ethers.utils.parseEther("50");
      const tokens_to_withdraw = tokens_to_deposit.sub("1");
      token.approve(lab3.address, tokens_to_deposit);
      await lab3.deposit(token.address, tokens_to_deposit);
      await lab3.withdraw(token.address, tokens_to_withdraw);
      expect(await lab3.balanceOf(owner.address)).to.equal(tokens_to_deposit.sub(tokens_to_withdraw));
    });
    it ("Cannot withdraw with insufficient balance", async function (){
      [owner] = await ethers.getSigners();
      const tokens_to_deposit = ethers.utils.parseEther("50");
      const tokens_to_withdraw = tokens_to_deposit.add("1");
      token.approve(lab3.address, tokens_to_deposit);
      await lab3.deposit(token.address, tokens_to_deposit);
      await expect(lab3.withdraw(token.address, tokens_to_withdraw)).to.be.revertedWith("You don't have enough balance.");
    });
  });


});
