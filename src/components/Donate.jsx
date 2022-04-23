import React, {useState, useEffect} from 'react'
import { ethers } from 'ethers';
import CampaignFactory from '../utils/CampaignFactory.json';
import Campaign from '../utils/Campaign.json';
import { useParams } from 'react-router-dom';

const Donate = () => {
    const [amount, setAmount] = useState(0);
    const [change, setChange] = useState(false);
    const [donar,setDonar] = useState([]);
    let {address} = useParams();

    useEffect(()=>{
        const loadDonation = async () => 
        {
            setChange(true);
            const provider = new ethers.providers.JsonRpcProvider(
                "https://eth-ropsten.alchemyapi.io/v2/M-N6_PW-E66o2EC0EmdNIXJV_Z-lAhe_"
              );
            
              const contract = new ethers.Contract(
                address,
                Campaign.abi,
                provider
              );
            const Donations = contract.filters.amountTransfered();
            const AllDonations = await contract.queryFilter(Donations);
            setDonar(AllDonations);
            setChange(false);
            console.log(AllDonations);
        }

        loadDonation();

    },[])
    const DonateFunds = async (e) => 
    {
        e.preventDefault();
        try {
            setChange(true)
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, Campaign.abi, signer);

            const transaction = await contract.transferAmount({value: ethers.utils.parseEther(amount)});
            await transaction.wait();

            setChange(false);
            console.log(transaction);

        } catch (error) {
            console.log(error);
        }
    }

    if(change === true)
    {
        return 'loading';
    }
  return (
    <div>
        <form>
            <div className="row">
                <div className="col-md-3">
                    <label for="exampleInputPassword1" class="form-label">Amount:</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" value={amount} onChange={(e)=>setAmount(e.target.value)}  />
                </div>
                <div className="col-md-3">
                <button type="submit" class="btn btn-primary" style={{marginTop:32}} onClick={DonateFunds}>Send Amount</button>
                </div>
            </div>
        </form>

        <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Donated Amount</th>
                    <th scope="col">TimeStamp</th>
                    </tr>
                </thead>
                <tbody>
                    {donar.map((e,index)=>(
                        <tr>
                        <th scope="row">{index+1}</th>
                        <td>{ethers.utils.formatEther(e.args.fundAmount)}</td>
                        <td>{new Date(parseInt(e.args.timeStamp) * 1000).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
    </div>
  )
}

export default Donate