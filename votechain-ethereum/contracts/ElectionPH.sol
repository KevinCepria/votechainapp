pragma solidity ^0.4.24;

contract ElectionPH{
    
    address electionFacilitator;
    bool public isOpen;
    uint public openedDate;
    
    struct Candidates {
        uint8  candidateID;
        string lastName;
        string firstName;
        string middleName;
        uint32 voteCount;
    }
    
    struct voter{
        string votersIDNum;
        Candidates chosenPresident;
        Candidates chosenvicePresident;
        bool hasVoted;
        bool registered;
        uint32 dateTime;
    } 
    
    mapping (address => voter) public voters;

    
    uint32 public totalVotes;
    uint32 public registeredVoters;
    
    
    Candidates[5] public presidentialCandidates;
    Candidates[5] public vicePresidentialCandidates;
    
    
    constructor (uint32 numVoters) public {
        
        registeredVoters = numVoters;
        electionFacilitator = msg.sender;
        isOpen = false;
        totalVotes = 0;
        
        presidentialCandidates[0] = Candidates({candidateID: 0, lastName: "Cepria", firstName: "Kevin Jeff", middleName: "Torres", voteCount:0});
        presidentialCandidates[1] = Candidates({candidateID: 1, lastName: "Liwag", firstName: "Ryan Joshua", middleName: "Hontomin", voteCount:0});
        presidentialCandidates[2] = Candidates({candidateID: 2, lastName: "Rapio", firstName: "Anfernee", middleName: "Solomon", voteCount:0});
        presidentialCandidates[3] = Candidates({candidateID: 2, lastName: "Santillan", firstName: "Melchor", middleName: "Sugue", voteCount:0});
        presidentialCandidates[4] = Candidates({candidateID: 4, lastName: "Zarzoso", firstName: "Aaron John", middleName: "Pascual", voteCount:0});
        
        vicePresidentialCandidates[0] = Candidates({candidateID: 0, lastName: "Azarraga", firstName: "Ejnar Ejaye", middleName: "", voteCount:0});
        vicePresidentialCandidates[1] = Candidates({candidateID: 1, lastName: "Del Rosario", firstName: "Aldwin", middleName: "", voteCount:0});
        vicePresidentialCandidates[2] = Candidates({candidateID: 2, lastName: "Jarabelo", firstName: "Adrian Benjamin", middleName: "", voteCount:0});
        vicePresidentialCandidates[3] = Candidates({candidateID: 3, lastName: "Guevarra", firstName: "Gervin Ernest", middleName: "", voteCount:0});
        vicePresidentialCandidates[4] = Candidates({candidateID: 4, lastName: "Tan", firstName: "Sidney Sheldon", middleName: "", voteCount:0});
        
        // voters[0x441c1248377F3676BA844b24E53A72DaC8B6b2C7].votersIDNum="30220201BC0272ESA20000";voters[0x441c1248377F3676BA844b24E53A72DaC8B6b2C7].registered=true;
        // voters[0x089b9e8a5e8B41C5F70278B0fc25b779d3d69fC4].votersIDNum="60261201FC0272ESZ20439";voters[0x089b9e8a5e8B41C5F70278B0fc25b779d3d69fC4].registered=true;
        // voters[0x2538B34C0F3E43A58b9dE6f64A823cfcafdC1c5A].votersIDNum="40222201LC2272ESD20000";voters[0x2538B34C0F3E43A58b9dE6f64A823cfcafdC1c5A].registered=true;
        // voters[0x8eCC871Aa1f57607562a3155529842847de79e01].votersIDNum="50223201BC6272ESB20650";voters[0x8eCC871Aa1f57607562a3155529842847de79e01].registered=true;
        // voters[0x432ddC762F9c88c9a2633ea8ed7aE1095a7B42cf].votersIDNum="70524201VC0272ESA20010";voters[0x432ddC762F9c88c9a2633ea8ed7aE1095a7B42cf].registered=true;
        // voters[0x90f8FE16FB06D183aBA8368DcB102f39d9cB5630].votersIDNum="80220201BC5272ESR20000";voters[0x90f8FE16FB06D183aBA8368DcB102f39d9cB5630].registered=true;
        // voters[0x4245Ec72B130Da27e8E6A288A580dCA0ab1521E5].votersIDNum="60220201AC0272EST20000";voters[0x4245Ec72B130Da27e8E6A288A580dCA0ab1521E5].registered=true;
        // voters[0x2192CFcF1A6959D22c58142dd58A20656F1de4CC].votersIDNum="30220201BC0272ESM20101";voters[0x2192CFcF1A6959D22c58142dd58A20656F1de4CC].registered=true;
        // voters[0xBBF6c38260909388023b17CA99F42a5aB4dEcf74].votersIDNum="70228201XC0272ESL20202";voters[0xBBF6c38260909388023b17CA99F42a5aB4dEcf74].registered=true;
        // voters[0x35D0075DfF8ab3c1D1666D248207bd796C74855b].votersIDNum="50220201CC0272ESA20303";voters[0x35D0075DfF8ab3c1D1666D248207bd796C74855b].registered=true;
        // voters[0x50788961307F614eACCb6AC7d609f5BE3043eBe3].votersIDNum="30223201AC0272ESA20404";voters[0x50788961307F614eACCb6AC7d609f5BE3043eBe3].registered=true;
        // voters[0xA96690D8A56a989F8be5a0Cc902563be0aE96f61].votersIDNum="50224201LC0272ESX20505";voters[0xA96690D8A56a989F8be5a0Cc902563be0aE96f61].registered=true;
        // voters[0x8c82BcD893caf12992426F8531B8524a8364482a].votersIDNum="20225201EC0272ESY20606";voters[0x8c82BcD893caf12992426F8531B8524a8364482a].registered=true;
        // voters[0xE0Fb11c9909266df739D9D8e44A6F192598aF189].votersIDNum="30226201BC0272ESA20707";voters[0xE0Fb11c9909266df739D9D8e44A6F192598aF189].registered=true;
        // voters[0x8a784DDE47F0c6042Bf1bc7f7E07EB5fBbCCBF30].votersIDNum="70227201CC0272ESO20808";voters[0x8a784DDE47F0c6042Bf1bc7f7E07EB5fBbCCBF30].registered=true;
        }
    
    //Opens the election and allows voters to vote
    function openElection() public restricted {
        isOpen = true;
        openedDate = now;
    }
    
    //Closes the election (election is over and starts finalizing votes)
    function closeElection() public restricted{
        isOpen = false;
    }
    
    //get voteCount of a certain presidential candidate
    function getPresidentialVoteCount(uint index) public view returns(uint) {
        return presidentialCandidates[index].voteCount;
    }
    
    //get voteCount of a certain vice-presidential candidate
    function getVicePresidentialVoteCount(uint index) public view returns(uint) {
        return vicePresidentialCandidates[index].voteCount;
    }
    
    //vote logic
    function vote(uint8 pIndex, uint8 vpIndex) public electionStatus{
        require(isOpen);
        require(registeredVoters >= totalVotes);
        // require(voters[msg.sender].registered);
        require(!voters[msg.sender].hasVoted);
        require(pIndex >= 0 && pIndex <5 && vpIndex >=0 && vpIndex<5);
        
        presidentialCandidates[pIndex].voteCount++;
        vicePresidentialCandidates[vpIndex].voteCount++;
        
        voters[msg.sender].chosenPresident = presidentialCandidates[pIndex];
        voters[msg.sender].chosenvicePresident=vicePresidentialCandidates[vpIndex];
        
        voters[msg.sender].hasVoted = true;
        totalVotes++;
    }
    
    // get current users vote details
    function getVoterDetails()public view returns (address,string,string,string,string,string,bool,bool,uint32){
        
        return (
            msg.sender,
            voters[msg.sender].votersIDNum, 
            voters[msg.sender].chosenPresident.firstName,
            voters[msg.sender].chosenPresident.lastName,
            voters[msg.sender].chosenvicePresident.firstName,
            voters[msg.sender].chosenvicePresident.lastName,
            voters[msg.sender].registered,
            voters[msg.sender].hasVoted,
            voters[msg.sender].dateTime
            );
    }
    
    modifier restricted {
        require(msg.sender == electionFacilitator);
        _;
    }
    
    modifier electionStatus{
        require(isOpen);
        _;
    }
}


