import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';

const provider = new HDWalletProvider(
    'prison snow blush ability evolve screen report salt elephant artwork diamond say',
    'https://rinkeby.infura.io/v3/f946fc59a7c6401fabc0ebb27a05f13d',1
  );
  
let web3 = new Web3(provider);

// if(typeof window !== 'undefined' && window.web3 !== undefined){
//     // We are in the browser and metamask is  running
//     web3 = new Web3(window.web3.currentProvider);
    
// }else{
//     //We are on the server OR the user is nt running metamask

//     const provider = new Web3.providers.HttpProvider(
//         'https://rinkeby.infura.io/v3/f946fc59a7c6401fabc0ebb27a05f13d'
//     );
    
//     web3 = new Web3(provider);
// }

export default web3;