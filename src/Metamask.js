import App from "./App";
import {Result, ethers} from "ethers";
import { link } from "fs";
import { useState } from "react";
import "./metamask.css";

const Metamask = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const connectWallet = () => {
        if(window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChanged ([result[0]])
            })
        } else {
            setErrorMessage('Install MetaMask Please!!!')
        }
    }

    
    const accountChanged = (accountName) => {
        setDefaultAccount(accountName)
        getUserBalance(accountName)
    }
    
    const getUserBalance = (accountAddress) => {
        window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
        .then(balance => {
            setUserBalance(ethers.formatEther(balance));
        })
    }

    return (
        <div>
            <h1>
                Metamask Wallet connection 
            </h1>

            <button onClick={connectWallet}>Connect Wallet</button>
            <h3>Address : {defaultAccount}</h3>
            <h3>Balance : {userBalance} ETH</h3>

        {errorMessage}
        </div>
    )
}

export default Metamask;