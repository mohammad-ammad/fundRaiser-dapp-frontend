import React, {useState} from 'react'
import {ethers} from "ethers";
import Funder_abi from './contracts/Funder.json';
const MyApp = () => {
    const [btnText, setBtnTxt] = useState("Connect to MetaMask");
    const [account,setAccount] = useState(null);
    const [provider,setProvider] = useState(null);
    const [signer,setSigner] = useState(null);
    const [contract,setContract] = useState(null);
    const [balance,setBalance] = useState(0);
    const contractAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

    const HandleConnectMetaMask = async () => 
    {
        if(window.ethereum)
        {
            const result = await window.ethereum.request({method:'eth_requestAccounts'});
            accountChangeHandler(result[0]);
            setBtnTxt("Wallet Connected!!");
        }
        else 
        {
            alert("Need to install MetaMask");
        }
    }

    const accountChangeHandler = (_account) => 
    {
        setAccount(_account);
        updateEthers();
    }

    const updateEthers = () => 
    {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(contractAddress, Funder_abi.abi, tempSigner);
        setContract(tempContract);

        getAccountBalance(tempProvider);
    }

    const getAccountBalance = async (tempProvider) => 
    {
        const _balance = await tempProvider.getBalance(account);
        setBalance(_balance)
        console.log(_balance)
    }

    const TransferHandler = async () => 
    {
       await contract.transfer({
            from:account,
            value:ethers.utils.parseUnits('2','ether')
        })
    }

    const WithdrawHandler = async() => 
    {
       await contract.withdraw(ethers.utils.parseUnits('2','ether'),{
           from:account,
       })
    }
    
  return (
    <div>
        <button className='btn btn-primary' onClick={HandleConnectMetaMask}>{btnText}</button>
        <h3>Account: {account}</h3>
        <h3>Balance: {balance}</h3>
        <button className='btn btn-success' onClick={TransferHandler}>Send Ether</button>
        <button className='btn btn-danger' onClick={WithdrawHandler}>withdraw Ether</button>
    </div>
  )
}

export default MyApp