const HDWalletProvider = require('truffle-hdwallet-provider'),
                  Web3 = require('web3'),
       compiledElectionPH = require('./build/ElectionPH.json');

const faker = require("faker");

const provider = new HDWalletProvider(
    'prison snow blush ability evolve screen report salt elephant artwork diamond say',
    'https://rinkeby.infura.io/v3/f946fc59a7c6401fabc0ebb27a05f13d' 
  );
  
const web3 = new Web3(provider);

let vin=[];
let firstName=[];
let lastName=[];
let numVoters;

let governorFirstName=[];
let governorLastName=[];
let governorUrlImage=[];
let numGovernors;

let viceGovernorFirstName=[];
let viceGovernorLastName=[];
let viceGovernorUrlImage=[];
let numViceGovernors;



let objArray = [];
for(let i = 0 ; i<30; i++){
    objArray.push({
        vin: faker.finance.account(),
        firstName:faker.name.firstName(),
        lastName:faker.name.lastName(),
    })
}

numVoters = objArray.length;


let objArray2 = [{
                    firstName:"Kevin Jeff",
                    lastName:"Cepria",
                    url: "https://i.imgur.com/mdT5e6W.jpg"
    
                },
                {
                    firstName:"Ryan Joshua",
                    lastName:"Liwag",
                    url: "https://i.imgur.com/uBHxBcz.jpg"
    
                },
                {
                    firstName:"Anfernee",
                    lastName:"Rapio",
                    url: "https://i.imgur.com/ZJGk6sv.jpg"
    
                },
                {
                    firstName:"Melchor",
                    lastName:"Santillan",
                    url: "https://i.imgur.com/1U9bmup.jpg"
    
                },
                {
                    firstName:"Aaron John",
                    lastName:"Zarzoso",
                    url: "https://i.imgur.com/qfzXJEA.jpg"
    
                }];

let objArray3 = [{
                    firstName:"Ejnar Ejaye",
                    lastName:"Azarraga",
                    url: "https://i.imgur.com/12k1N3Q.jpg"
    
                },
                {
                    firstName:"Aldwin",
                    lastName:"Del Rosario",
                    url: "https://i.imgur.com/ZZKSPK8.jpg"
    
                },
                {
                    firstName:"Adrian Benjamin",
                    lastName:"Jarabelo",
                    url: "https://i.imgur.com/uJ516L8.jpg"
    
                },
                {
                    firstName:"Gervin Ernest",
                    lastName:"Guevarra",
                    url: "https://i.imgur.com/VTpkPYr.jpg"
    
                },
                {
                    firstName:"Sidney Sheldon",
                    lastName:"Tan",
                    url: "https://i.imgur.com/kzsETOH.jpg"
    
                }];

numGovernors = objArray2.length;
numViceGovernors = objArray3.length;
                
for(let i = 0 ; i< numVoters; i++){
    vin[i]=web3.utils.fromAscii(objArray[i].vin);
    firstName[i]=web3.utils.fromAscii(objArray[i].firstName);
    lastName[i]=web3.utils.fromAscii(objArray[i].lastName);
}

                
for(let i = 0 ; i< numGovernors; i++){
    governorFirstName[i]=web3.utils.fromAscii(objArray2[i].firstName);
    governorLastName[i]=web3.utils.fromAscii(objArray2[i].lastName);
    governorUrlImage[i]=web3.utils.fromAscii(objArray2[i].url);
}

for(let i = 0 ; i< numViceGovernors; i++){
    viceGovernorFirstName[i]=web3.utils.fromAscii(objArray3[i].firstName);
    viceGovernorLastName[i]=web3.utils.fromAscii(objArray3[i].lastName);
    viceGovernorUrlImage[i]=web3.utils.fromAscii(objArray3[i].url);
}


console.log(objArray);

// console.log(vin, firstName,lastName,age);
// console.log(governorFirstName, governorLastName, governorUrlImage);
// console.log(viceGovernorFirstName, viceGovernorLastName, viceGovernorUrlImage);


const deploy = async() =>{
    
    const accounts = await web3.eth.getAccounts();
    
    console.log(accounts)
    
    console.log('Attempting to deploy from account', accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(compiledElectionPH.interface))
        .deploy({data:'0x'+ compiledElectionPH.bytecode, arguments:[vin,firstName,lastName,numVoters,
                        governorFirstName,governorLastName,governorUrlImage,numGovernors,
                        viceGovernorFirstName,viceGovernorLastName,viceGovernorUrlImage,numViceGovernors]})
        .send({from: accounts[0]}).on('transactionHash', function(hash){
        console.log('TXHASH IS', hash);
})
    
    console.log('Contract deployed to ',result.options.address);
    console.log('ABI => ', compiledElectionPH.interface);

};

deploy();