// JavaScript 示例（使用 web3.js）

// 检查是否具有 Web3 提供程序
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
        // 请求用户授权
        window.ethereum.enable();
    } catch (error) {
        console.error("User denied account access");
    }
} else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
} else {
    console.error("No Web3 provider detected");
}

const web3 = window.web3;

// 智能合约地址和 ABI（在部署后获取）
const contractAddress = '0x215764E03e14B585c91D9a84E78a059ede779BD2';
const contractAbi = [[
	{
		"inputs": [],
		"name": "rollDice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract ERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]]; // 智能合约 ABI

const diceGameContract = new web3.eth.Contract(contractAbi, contractAddress);

// 监听按钮点击事件
document.getElementById('rollButton').addEventListener('click', async () => {
    try {
        // 获取当前钱包的账户地址
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        // 调用智能合约的 rollDice 函数
        const result = await diceGameContract.methods.rollDice().send({ from: userAddress });

        // 处理结果，例如显示点数和奖励的代币数量
        console.log('Dice result:', result);
        alert(`Dice result: ${result.events.Transfer.returnValues[2]}`);
    } catch (error) {
        console.error('Error:', error);
        alert('Error occurred. Check the console for details.');
    }
});
