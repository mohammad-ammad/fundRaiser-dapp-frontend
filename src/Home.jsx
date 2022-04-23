import React, {useEffect, useState} from 'react'
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/LoadContract';
import Funder from "./contracts/Funder.json";
import {ethers} from "ethers";

const Home = () => {
    const [accounts, setAccounts] = useState(null); 
    const [web3Api, setWeb3Api] = useState({
        provider:null,
        web3:null,
    }); 
    const [contract,setContract] = useState(null);
    const [balance,setBalance] = useState(0);
    const [Ourprovider,setProvider] = useState(null);
    useEffect(()=>{
        const getAccount = async () => 
        {
            const accounts = await web3Api.web3.eth.getAccounts();
            
            setAccounts(accounts[0]);

            const url = 'http://localhost:8545';
            const Ourprovider = new ethers.providers.JsonRpcBatchProvider(url);
            setProvider(Ourprovider)
            const contract = new ethers.Contract(
                accounts, Funder.abi, Ourprovider
            )

            setContract(contract);
            
            const balance = await web3Api.web3.eth.getBalance(contract.address[0])
            setBalance(web3Api.web3.utils.fromWei(balance,"ether"));
        }
       web3Api.web3 && getAccount();

    },[web3Api.web3])

    const Transfer = async() => 
    {
        const signer = await contract.connect(Ourprovider.getSigner());
        await signer.transfer({
            from:accounts,
            value:web3Api.web3.utils.toWei("2","ether")
        })
    }
   

    const handleMetaMask = async () => 
    {
        const provider = await detectEthereumProvider();
        
        if(provider)
        {
            provider.request({method:"eth_requestAccounts"});

            setWeb3Api({
                web3: new Web3(provider),
                provider,
            })
            
            
        }
        else 
        {
            console.error("Please Install MetaMask");
        }
        // let provider = null;
        //     if(window.ethereum)
        //     {
        //         provider = window.ethereum;

        //         try {
        //             await provider.enable();
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        //     else if(window.web3)
        //     {
        //         provider = window.web3.currentProvider;
        //     }
        //     else if(!process.env.production)
        //     {
        //         provider =  Web3.providers.HttpProvider('http://127.0.0.1:8545');
        //     }

        //     setWeb3Api({
        //         web3: new Web3(provider),
        //         provider,
        //     })
    }

    

  return (
    <div>
        <h2>DAPP WITH HARDHAT</h2>
        <button className='btn btn-primary' onClick={handleMetaMask}>Connect to metaMask</button>
        <h3>Account: {accounts ? accounts : 'not connected'}</h3>
        <h4>Balance: {balance} Eth</h4>
        <button onClick={Transfer} className='btn btn-success'>Send Ether</button>
    </div>
  )
}

export default Home