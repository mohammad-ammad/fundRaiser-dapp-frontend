import React, {useState} from 'react'
import { ethers } from "ethers";

const Wallet = () => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [wallet,setWallet] = useState("Connect Wallet");

    const connectWallet = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const account = provider.getSigner();
        const Address = await account.getAddress();
        setAddress(Address);
        const Balance = ethers.utils.formatEther(await account.getBalance());
        setBalance(Balance);
        setWallet("Connected !!");
    }
  return (
    <div className='container my-5'>
         <div className="row">
            <div className="col-md-6">
                <h2>Fund Raiser</h2>
            </div>
            <div className="col-md-6">
                <button className='btn btn-primary float-end' onClick={connectWallet}>{wallet}</button>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6">
                <h5>Account: <span class="badge bg-primary">{address}</span> </h5>
            </div>
            <div className="col-md-6">
                <div className='float-end'>
                <h5>Balance: <span class="badge bg-primary">{balance} Eth</span></h5> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Wallet