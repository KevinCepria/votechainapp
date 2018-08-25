pragma solidity ^0.4.24;


contract ElectionPH{
    
    address private electionFacilitator;
    address private electionVoter;
    bool public isOpen;
    bool public isOver;
    uint8 numGovernorCandidates;
    uint8 numViceGovernorCandidates;
    
    struct Candidates {
        uint8  candidateID;
        bytes32 lastName;
        bytes32 firstName;
        bytes32 imageURL;
        uint32 voteCount;
    }
    
    struct voter{
        bytes32 firstName;
        bytes32 lastName;
        Candidates chosenGovernor;
        Candidates chosenViceGovernor;
        bool hasVoted;
        bool registered;
        bool inComelec;
        uint dateTimeVoted;
        // uint8 age;
        bytes32 password;
        bytes32 txHash;
    } 
    
    // mapping (string => voter) public txHash;
    mapping (bytes32 => voter) private voters;

    uint32 public totalVotes;
    uint32 public totalRegisteredVoters;
    uint32 public totalVotechainVoters;
    
    
    Candidates[] public governorCandidates;
    Candidates[] public viceGovernorCandidates;
    
    
    constructor (
                bytes32[] vin,
                bytes32[] firstName, 
                bytes32[] lastName, 
                //   uint8[] age, 
                  uint32 numVoters,
                bytes32[] governorFirstName,
                bytes32[] governorLastName,
                bytes32[] governorUrlImage,
                uint8 numGovernors,
                bytes32[] viceGovernorFirstName,
                bytes32[] viceGovernorLastName,
                bytes32[] viceGovernorUrlImage,
                uint8 numViceGovernors
               ) public {

        
        totalVotechainVoters = 0;
        electionFacilitator = msg.sender;
        electionVoter = 0x089b9e8a5e8b41c5f70278b0fc25b779d3d69fc4;
        isOpen = false;
        isOver = false;
        totalVotes = 0;
        numGovernorCandidates = numGovernors;
        numViceGovernorCandidates = numViceGovernors;
        
        temp(vin, firstName, lastName,numVoters);
        
        for(uint8 j =0; j<numGovernors; j++){
            governorCandidates.push(Candidates({
                candidateID: j,
                imageURL: governorUrlImage[j],
                firstName: governorFirstName[j],
                lastName: governorLastName[j],
                voteCount: 0
            }));
        }
        
        for(uint8 z =0; z<numViceGovernors; z++){
            viceGovernorCandidates.push(Candidates({
                candidateID: z,
                imageURL: viceGovernorUrlImage[z],
                firstName: viceGovernorFirstName[z],
                lastName: viceGovernorLastName[z],
                voteCount: 0
            }));
        }
    }
    
    function temp( bytes32[] vin,
                bytes32[] firstName, 
                bytes32[] lastName, 
                //   uint8[] age,
                  uint32 numVoters) private{
            totalRegisteredVoters = numVoters;
           for(uint8 i =0; i<numVoters; i++){
             voters[vin[i]].firstName = firstName[i];
             voters[vin[i]].lastName = lastName[i];
            //  voters[vin[i]].age = age[i];
             voters[vin[i]].inComelec =true;
            
        }
    }
    
    //Opens the election and allows voters to vote
    function openElection() public restrictedFacilitator {
        require(!isOver);
        require(!isOpen);
        
        isOpen = true;
        // openedDate = now;
    }
    
    //Closes the election (election is over and starts finalizing votes)
    function closeElection() public restrictedFacilitator{
        require(isOpen);
        isOpen = false;
    }
    
    function terminateElection()public restrictedFacilitator{
        isOver = true;
        isOpen = false;
    }
    
    //get voteCount of a certain governor candidate
    function getGovernorVoteCount(uint index) public view returns(uint) {
        return governorCandidates[index].voteCount;
    }
    
    //get voteCount of a certain vice-governor candidate
    function getViceGovernorVoteCount(uint index) public view returns(uint) {
        return viceGovernorCandidates[index].voteCount;
    }
    
    //register voter on votechain
    function register(bytes32 vin, bytes32 firstName, bytes32 lastName, bytes32 password) public restrictedVoter {
        require(voters[vin].inComelec);
        require(!isOpen);
        require(!voters[vin].registered);
        require(voters[vin].firstName == firstName);
        require(voters[vin].lastName == lastName);
        require(password != "");
        
        voters[vin].password = password;
        voters[vin].registered = true;
        totalVotechainVoters++;
    }
    
   
    //vote logic
    function vote(uint8 pIndex, uint8 vpIndex, bytes32 vin, bytes32 password) public  restrictedVoter{
        require(isOpen);
        require(voters[vin].registered);
        require(totalVotechainVoters >= totalVotes);
        require(voters[vin].password == password);
        require(!voters[vin].hasVoted);
   
        governorCandidates[pIndex].voteCount++;
        viceGovernorCandidates[vpIndex].voteCount++;
        
        voters[vin].chosenGovernor = governorCandidates[pIndex];
        voters[vin].chosenViceGovernor=viceGovernorCandidates[vpIndex];
        voters[vin].hasVoted = true;
        voters[vin].dateTimeVoted = now;
        totalVotes++;
    }
    
    
    // get current users voter details
    function getVoterDetails(bytes32 vin, bytes32 password)public view returns (bytes32,bytes32,uint,bytes32){
     
        require(voters[vin].inComelec);
        require(voters[vin].registered);
        require(voters[vin].password == password);
        
        return (
            voters[vin].lastName,
            voters[vin].firstName, 
            voters[vin].dateTimeVoted,
            voters[vin].txHash
            );
    }
    
    // get chosen candidate of a voter
    function getChosenCandidates(bytes32 vin, bytes32 password)public view returns (bytes32,bytes32,bytes32,bytes32,bytes32,bytes32){
        require(voters[vin].hasVoted);
        require(voters[vin].password == password);
        
        
        return (
            voters[vin].chosenGovernor.firstName,
            voters[vin].chosenGovernor.lastName,
            voters[vin].chosenGovernor.imageURL,
            voters[vin].chosenViceGovernor.firstName,
            voters[vin].chosenViceGovernor.lastName,
            voters[vin].chosenViceGovernor.imageURL
          
            );
    }
    
    function setTxHash(bytes32 vin, bytes32 password, bytes32 txHash) public  restrictedVoter{
            require(voters[vin].hasVoted);
            require(voters[vin].password == password);
            
            voters[vin].txHash = txHash;
    }
    modifier restrictedVoter {
        require(msg.sender == electionVoter);
        _;
    }
    
    modifier restrictedFacilitator {
        require(msg.sender == electionFacilitator);
        _;
    }
    

}


