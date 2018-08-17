import React, {Component} from 'react';
import electionph from '../contract/electionph';
import web3 from '../contract/web3';

class VoteForm extends Component {
    state ={
        loading:false,
        chosenGovernor:'',
        chosenGovernorFirstName: 'First Name',
        chosenGovernorLastName: 'Last Name',
        chosenGovernorImageURL: 'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
        chosenViceGovernor:'',
        chosenViceGovernorFirstName: 'First Name',
        chosenViceGovernorLastName: 'Last Name',
        chosenViceGovernorImageURL: 'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
        votersIDVIN: '',
        votersFirstName:'',
        votersLastName:'',
        password:'',
        voteDate:'',
        txHash: null,
        voteSuccess: false
    }
    
   
   setGovernorData = async (index) => {
          if(index<0){
              this.setState({
              chosenGovernorLastName:'LAST NAME',
              chosenGovernorFirstName:'First Name',
              chosenGovernorImageURL:'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
              chosenGovernor:''
          })
          }
          let GovernorCandidate = await electionph.methods.governorCandidates(index).call();
         
          this.setState({
              chosenGovernorLastName:web3.utils.hexToUtf8(GovernorCandidate[1]),
              chosenGovernorFirstName:web3.utils.hexToUtf8(GovernorCandidate[2]),
              chosenGovernorImageURL:web3.utils.hexToUtf8(GovernorCandidate[3]),
              chosenGovernor:index
          })
          
        
   }
   
   setViceGovernorData = async (index) => {
          if(index<0){
              this.setState({
              chosenViceGovernorLastName:'LAST NAME',
              chosenViceGovernorFirstName:'First Name',
              chosenViceGovernorImageURL:'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
              chosenViceGovernor: ''
          })
          }
          let ViceGovernorCandidate = await electionph.methods.viceGovernorCandidates(index).call();
         
          this.setState({
              chosenViceGovernorLastName:web3.utils.hexToUtf8(ViceGovernorCandidate[1]),
              chosenViceGovernorFirstName:web3.utils.hexToUtf8(ViceGovernorCandidate[2]),
              chosenViceGovernorImageURL:web3.utils.hexToUtf8(ViceGovernorCandidate[3]),
              chosenViceGovernor: index
          })
         
   }
   
    onSubmit = async (event,vn, pw) => {
         event.preventDefault();
         if(!vn || !pw){
              alert("Fill up vin and password");
         }
         else{
             let vin = web3.utils.fromAscii(vn);
             let password = web3.utils.fromAscii(pw);
             let gIndex = this.state.chosenGovernor;
             let vgIndex = this.state.chosenViceGovernor;
             const accounts = await web3.eth.getAccounts();
             let temp;
             this.setState({loading:true})
             
             try{
        
                 await electionph.methods.vote(gIndex,vgIndex,vin,password).send({from:accounts[0], gas:1000000}).on('transactionHash',  hash=>{
                    temp=String(hash);
                });
                 this.setState({txHash:temp})
                 
                 let voterDetails = await electionph.methods.getVoterDetails(vin, password).call();
                 let date = new Date(0);
                 let lastName, firstName;
                 
                 lastName= web3.utils.hexToUtf8(voterDetails[0]);
                 firstName= web3.utils.hexToUtf8(voterDetails[1]);
                 date.setUTCSeconds(voterDetails[2]);
                 
                 this.setState({votersLastName:lastName, votersFirstName:firstName, voteDate:date.toString()});
                
             }catch(error){
                alert(error.message);
             }
             
                 this.setState({loading:false})
         }
         
         
   }
   
   printVoteDetails(event){
       event.preventDefault();
       console.log("PRINT");
       window.printJS({ printable: 'vote-details', type: 'html', header: 'Vote Details' });
   }
   
    reloadPage = (event)=>{
        window.location.reload();
    }
   
    render(){
        let button;
        let printButton = null;
        let form;
        
        if(!this.state.loading){
            button = <button disabled={this.state.loading} className="form-button"type="submit">Vote</button>;
        }
        
        else{
            button = <button disabled={this.state.loading} className="form-button"type="submit">Processing (takes 15-30 seconds)
                <span className="atebits-loader">Loading...</span>
            </button>;
        }
        
        if(this.state.txHash){
            printButton = <div className="form-group text-center">
                            <a href="#" className="form-check"
                            onClick={this.printVoteDetails}>Print</a>
                        </div>
            
            form = <div className="form-content">
                    <h2 className="heading-secondary text-theme text-center"> You have successfully voted! Thank you for voting</h2>
                    <div className="form-group">
                        <button onClick={this.reloadPage}className="form-button">Back</button>
                    </div> 
                </div>
        }
        else{
            form =<div className="form-content">
                        <h2 className="heading-secondary text-theme text-center">Select your candidates</h2>
                        <form action="" onSubmit={event=>{this.onSubmit(event,this.state.votersIDVIN, this.state.password)}}>                                       <div className="form-group">
                                <label htmlFor="idVIN" className="form-label">Input Voters ID Number:</label>
                                <input className="form-input" 
                                       type="text" id="idVIN" 
                                       name="id" autoComplete="off" 
                                       placeholder="Voters ID VIN" 
                                       required
                                       value={this.state.votersIDVIN}
                                       onChange = {event => this.setState({votersIDVIN: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input className="form-input" 
                                       type="password" id="password" 
                                       name="password" autoComplete="off" 
                                       placeholder="Password" 
                                       required
                                       value={this.state.password}
                                       onChange = {event => this.setState({password: event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="governor-candidate" className="form-label">Governor Candidate:</label>
                                <select  
                                    selected="selected" 
                                    className="form-input" 
                                    id="governor-candidate" 
                                    name="governor-candidate"
                                    onChange = {event =>{ this.setGovernorData(event.target.selectedIndex -1)}}>
                                    
                                    <option>Please Select a Candidate </option>
                                    <option>Cepria, Kevin Jeff Torres</option>
                                    <option>Liwag, Ryan Joshua Hontomin</option>
                                    <option>Rapio, Anfernee</option>  
                                    <option>Santillan, Melchor Sugue</option>  
                                    <option>Zarzoso, Aaron John</option>         
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="vice-governor-candidate" className="form-label">Vice Governor Candidate:</label>
                                <select 
                                    className="form-input" 
                                    id="vice-governor-candidate" 
                                    name="vice-governor-candidate"
                                    onChange = {event =>{ this.setViceGovernorData(event.target.selectedIndex -1)}}>
                                    <option>Please Select a Candidate </option>
                                    <option>Azarraga, Ejnar Ejaye</option>
                                    <option>Del Rosario, Aldwin</option>
                                    <option>Jarabelo, Adrian Benjamin</option>  
                                    <option>Guevarra, Gervin Ernest</option> 
                                    <option>Tan, Sidney Sheldon</option>     
                                </select>
                            </div>
                            <div className="form-group">
                               {button}
                            </div>
                        </form>
                    </div>
        }
       
            return (
                <div className="vote-section">
                    <div className="container">
                        <h2 className="heading-primary text-theme u-marginbottom-md">Vote now</h2>
                        <div className="row">
                            <div className="col-2-of-4">
                                {form}
                            </div>
                            <div className="col-2-of-4">
                                <div className="vote-details-box">
                                    <h2 className="heading-secondary text-light text-center">Vote Details</h2>
                                    <div className="vote-details" id="vote-details">
                                        <div className="form-group">
                                            <p>VIN Number: <span>{this.state.votersIDVIN}</span> </p>
                                        </div>
                                        <div className="form-group">
                                            <p>Last Name: <span>{this.state.votersLastName}</span> </p>
                                        </div>
                                        <div className="form-group">
                                            <p>First Name: <span>{this.state.votersFirstName}</span> </p>
                                        </div>
                                        <div className="form-group">
                                            <p>Voted on: <span>{this.state.voteDate}</span> </p>
                                        </div>
                                        <div className="form-group">
                                            <h4 className="heading-4th text-theme">Chosen Governor</h4>
                                            <div className="row">
                                                <div className="col-1-of-3">
                                                    <img src={this.state.chosenGovernorImageURL} alt=""/>
                                                </div>
                                                <div className="col-2-of-3">
                                                    <div className="candidate-details">
                                                        <div>
                                                            <h4 className="heading-4th"><span>{this.state.chosenGovernorLastName}</span></h4>
                                                            <p><span>{this.state.chosenGovernorFirstName}</span></p>
                                                        </div> 
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <h4 className="heading-4th text-theme">Chosen Vice Governor</h4>
                                            <div className="row">
                                                <div className="col-1-of-3">
                                                    <img src={this.state.chosenViceGovernorImageURL} alt=""/>
                                                </div>
                                                <div className="col-2-of-3">
                                                    <div className="candidate-details">
                                                        <div>
                                                            <h4 className="heading-4th"><span>{this.state.chosenViceGovernorLastName}</span></h4>
                                                            <p><span>{this.state.chosenViceGovernorFirstName}</span></p>
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <p>Tansaction ID: <span className="vote-detail">{this.state.txHash}</span> </p>
                                        </div>
                                    </div>
                                    {printButton}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             );
        
      
    }
   

};

export default VoteForm;

