const path = require('path'), // Help build path (directory) from the current file to lottery sol file (cross platforn compatiblity)
        fs = require('fs-extra'), //file system module (community made) w/ extra functions
      solc = require('solc'); // solidity compiler

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); //deletes build folder


const campainPath = path.resolve(__dirname, 'contracts', 'ElectionPH.sol'); // path of project and read contracts/Lottery.sol
const source = fs.readFileSync(campainPath, 'utf8');
const output = solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output){
    fs.outputJsonSync(
            path.resolve(buildPath, contract.replace(':', '') + '.json'),
            output[contract]
        );
}

console.log('Contract successfully compiled in /build directory......');
