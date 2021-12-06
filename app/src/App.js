import { useState, useEffect } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';


// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {


  // PUB KEY= 2QVxhFamTZfoAiceeN6aG3XUhLwjAwMpvrPYGQD7Nngp

  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Functions

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect()
          const walletAddress = response.publicKey.toString()
          console.log('Connected with Public Key:', walletAddress)

          setWalletAddress(walletAddress)

        } else {
          alert('Solana object not found , get Phantom wallet!')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }


  // Render this when the user is'nt connected
  const connectWallet = async () => {

    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }

  }

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  )



  // Check for Phantom wallet when the component first mounts
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    };
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])




  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">The Studio Ghibli Collection 🌈 </p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
