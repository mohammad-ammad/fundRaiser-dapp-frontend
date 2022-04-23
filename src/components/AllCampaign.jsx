import React,{useEffect, useState} from 'react'
import CampaignFactory from "../utils/CampaignFactory.json";
import { ethers } from 'ethers';
import {Link} from "react-router-dom"
require('dotenv').config();

const AllCampaign = () => {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const loadCampaign = async () => 
        {
            const provider = new ethers.providers.JsonRpcProvider(
                // "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                "https://eth-ropsten.alchemyapi.io/v2/M-N6_PW-E66o2EC0EmdNIXJV_Z-lAhe_"
              );
    
              const contract = new ethers.Contract(
                "0x4db8894b153856d09D5e7D0eACE539f51093C92e",
                CampaignFactory.abi,
                provider
              );

              setLoading(true);

              const getAllCampaigns = contract.filters.fundRequestCreated();

              console.log(getAllCampaigns);

              const AllCampaigns = await contract.queryFilter(getAllCampaigns);
              setAllData(AllCampaigns);
              setLoading(false)
              console.log(AllCampaigns)
              
        }

        loadCampaign();
    },[])
    if(loading === true)
    {
        return 'loading...';
    }
  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Project Name</th>
                <th scope="col">Department</th>
                <th scope="col">Fund Amount</th>
                <th scope="col">TimeStamp</th>
                <th>Donate</th>
                </tr>
            </thead>
            <tbody>
                { 
                    allData.map((e,index)=> (
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{e.args.projectName}</td>
                            <td>{e.args.relevantMinistry}</td>
                            <td>{ethers.utils.formatEther(e.args.fundAmount)} Eth</td>
                            <td>{new Date(parseInt(e.args.timestamp) * 1000).toLocaleString()}</td>
                            <td><Link to={`/campaign/${e.args.fundRequest}`} className="btn btn-success">Donate</Link></td>
                        </tr>
                    ))
                
                }
                
            </tbody>
            </table>
    </div>
  )
}

export default AllCampaign