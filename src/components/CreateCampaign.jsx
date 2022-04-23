import React,{useState} from 'react'
import { ethers } from 'ethers';
import CampaignFactory from '../utils/CampaignFactory.json';
require('dotenv').config();

const CreateCampaign = () => {
    const [projectName, setProjectName] = useState("");
    const [dept, setDept] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");

    const sendHandler = async (e) => 
    {
        e.preventDefault();
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        setLoading(true);

        const contract = new ethers.Contract(
            "0x4db8894b153856d09D5e7D0eACE539f51093C92e",
            CampaignFactory.abi,
            signer
          );

          console.log(contract)

        const CampaignAmount = ethers.utils.parseUnits(amount,'ether');
        console.log(CampaignAmount)

        const campaignData = await contract.createFundCampaign(
            projectName,
            dept,
            CampaignAmount,
          );
    
          const resp = await campaignData.wait();

          setAddress(resp.to);

          setLoading(false)
          setProjectName("");
          setDept("");
          setAmount(0);
        
    }
    if(loading === true) 
    {
        return 'loading';
    }
  return (
    <div>
        <form>
            <div className="row">
                <div className="col-md-4">
                    <label for="exampleInputPassword1" class="form-label">Project Name:</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label for="exampleInputPassword1" class="form-label">Department:</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" value={dept} onChange={(e)=>setDept(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label for="exampleInputPassword1" class="form-label">Fund Amount</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                </div>
            </div>
            <button type="submit" class="btn btn-primary my-2 float-end" onClick={sendHandler}>Send Request</button>
        </form>
        <br/>
        <br/>
        <h3>Campaign Address: {address}</h3>
    </div>
  )
}

export default CreateCampaign