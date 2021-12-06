import React, { useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { MintLayout, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import { programs } from '@metaplex/js';
import './CandyMachine.css';
import {
    candyMachineProgram,
    TOKEN_METADATA_PROGRAM_ID,
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
} from './helpers';
// const {
//     metadata: { Metadata, MetadataProgram },
// } = programs;

// const config = new web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_CONFIG);
// const { SystemProgram } = web3;
// const opts = {
//     preflightCommitment: 'processed',
// };

// const MAX_NAME_LENGTH = 32;
// const MAX_URI_LENGTH = 200;
// const MAX_SYMBOL_LENGTH = 10;
// const MAX_CREATOR_LEN = 32 + 1 + 1;

const CandyMachine2 = ({ walletAddress }) => {


    // UseEffect
    useEffect(() => {
        getCandyMachineState()
    }, [])



    // Actions

    const getProvider = () => {
        const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;
        // Create a new connection object
        const connection = new Connection(rpcHost);

        // Create a new Solana provider object
        const provider = new Provider(
            connection,
            window.solana,
            opts.preflightCommitment
        );

        return provider;
    }


    // Declare getCandyMachineState as an async method
    const getCandyMachineState = async () => {
        const provider = getProvider();

        // Get metadata about your deployed candy machine program
        const idl = await Program.fetchIdl(candyMachineProgram, provider);

        // Create a program that you can call
        const program = new Program(idl, candyMachineProgram, provider);

        // Fetch the metadata from your candy machine
        const candyMachine = await program.account.candyMachine.fetch(
            process.env.REACT_APP_CANDY_MACHINE_ID
        );

        // Parse out all our metadata and log it out
        const itemsAvailable = candyMachine.data.itemsAvailable.toNumber();
        const itemsRedeemed = candyMachine.itemsRedeemed.toNumber();
        const itemsRemaining = itemsAvailable - itemsRedeemed;
        const goLiveData = candyMachine.data.goLiveDate.toNumber();

        // We will be using this later in our UI so let's generate this now
        const goLiveDateTimeString = `${new Date(
            goLiveData * 1000
        ).toGMTString()}`

        console.log({
            itemsAvailable,
            itemsRedeemed,
            itemsRemaining,
            goLiveData,
            goLiveDateTimeString,
        });
    };

    return (
        <div className="machine-container">
            <p>Drop Date:</p>
            <p>Items Minted:</p>
            <button className="cta-button mint-button" onClick={mintToken}>
                Mint NFT
      </button>
        </div>
    );

}

export default CandyMachine2;