import web3 from './web3';


const address = '0x67B19f76aac8F150471BE9d8EE538557A1f10e83';

const abi = [{"constant":true,"inputs":[],"name":"totalRegisteredVoters","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalVotes","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"vin","type":"bytes32"},{"name":"password","type":"bytes32"}],"name":"getChosenCandidates","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"vin","type":"bytes32"},{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"password","type":"bytes32"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getGovernorVoteCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalVotechainVoters","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOpen","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"vin","type":"bytes32"},{"name":"password","type":"bytes32"}],"name":"getVoterDetails","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getViceGovernorVoteCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"closeElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"governorCandidates","outputs":[{"name":"candidateID","type":"uint8"},{"name":"lastName","type":"bytes32"},{"name":"firstName","type":"bytes32"},{"name":"imageURL","type":"bytes32"},{"name":"voteCount","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"viceGovernorCandidates","outputs":[{"name":"candidateID","type":"uint8"},{"name":"lastName","type":"bytes32"},{"name":"firstName","type":"bytes32"},{"name":"imageURL","type":"bytes32"},{"name":"voteCount","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOver","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"terminateElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pIndex","type":"uint8"},{"name":"vpIndex","type":"uint8"},{"name":"vin","type":"bytes32"},{"name":"password","type":"bytes32"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"openElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"vin","type":"bytes32"},{"name":"password","type":"bytes32"},{"name":"txHash","type":"bytes32"}],"name":"setTxHash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"vin","type":"bytes32[]"},{"name":"firstName","type":"bytes32[]"},{"name":"lastName","type":"bytes32[]"},{"name":"numVoters","type":"uint32"},{"name":"governorFirstName","type":"bytes32[]"},{"name":"governorLastName","type":"bytes32[]"},{"name":"governorUrlImage","type":"bytes32[]"},{"name":"numGovernors","type":"uint8"},{"name":"viceGovernorFirstName","type":"bytes32[]"},{"name":"viceGovernorLastName","type":"bytes32[]"},{"name":"viceGovernorUrlImage","type":"bytes32[]"},{"name":"numViceGovernors","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
export default new web3.eth.Contract(abi,address);

