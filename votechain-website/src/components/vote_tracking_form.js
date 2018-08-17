import React, { Component } from 'react';
import electionph from '../contract/electionph';
import web3 from '../contract/web3';

class VoteTrackingForm extends Component {
    
    
    state={
        tracked: false,
        loading: false,
        votersIDVIN: '',
        votersFirstName:'',
        votersLastName:'',
        voteDate:'',
        chosenGovernorLastName:'LAST NAME',
        chosenGovernorFirstName: 'First Name',
        chosenGovernorImageURL: 'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
        chosenViceGovernorLastName:'LAST NAME',
        chosenViceGovernorFirstName: 'First Name',
        chosenViceGovernorImageURL: 'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
        txHash:'',
        vin:'',
        password:''
        
    }
    

    
   onSubmit = async (event, vn, pw)=>{
       event.preventDefault();
       event.preventDefault();
       if(!vn || !pw){
            alert("Fill up vin and password");
       }
       else{
           
            let vin = web3.utils.fromAscii(vn);
            let password = web3.utils.fromAscii(pw);
            this.setState({loading:true})
           
            try{
                 
                 let voterDetails = await electionph.methods.getVoterDetails(vin, password).call();
                 let lastName, firstName, txHash, date, convertedDate;
                 
                 lastName= web3.utils.hexToUtf8(voterDetails[0]);
                 firstName= web3.utils.hexToUtf8(voterDetails[1]);
                 txHash =  voterDetails[3];
                 
                 console.log(voterDetails);
                 
                 if(voterDetails[2]<=0){
                     convertedDate='HAVE NOT VOTED YET';
                     console.log("HEHE")
                 }
                 else{
                      console.log("HAHHA")
                     date = new Date(0);
                     date.setUTCSeconds(voterDetails[2]);
                     convertedDate=date.toString();
                 }
                 
                 
                 this.setState({votersLastName:lastName, votersFirstName:firstName, voteDate:convertedDate, txHash:txHash});
                 
                 try{
                     
                 let votersCandidateDetails = await electionph.methods.getChosenCandidates(vin, password).call();
               
                     
                 this.setState({
                     
                     chosenGovernorLastName:web3.utils.hexToUtf8(votersCandidateDetails[0]),
                     chosenGovernorFirstName:web3.utils.hexToUtf8(votersCandidateDetails[1]),
                     chosenGovernorImageURL:web3.utils.hexToUtf8(votersCandidateDetails[2]),
                     chosenViceGovernorLastName:web3.utils.hexToUtf8(votersCandidateDetails[3]),
                     chosenViceGovernorFirstName:web3.utils.hexToUtf8(votersCandidateDetails[4]),
                     chosenViceGovernorImageURL:web3.utils.hexToUtf8(votersCandidateDetails[5])
                      
                 })
                 
                 }catch(error){
                    
                     this.setState({txHash:'HAVE NOT VOTED YET'})
                 }
                 
                 this.setState({tracked:true});
                 
            }catch(error){
                alert(error.message);
            }
             
            this.setState({loading:false})
       }
       
   }
   
   clear = (event)=>{
       event.preventDefault();
       
       this.setState({
        tracked: false,
        loading: false,
        votersIDVIN: '',
        votersFirstName:'',
        votersLastName:'',
        voteDate:'',
        chosenGovernorLastName:'LAST NAME',
        chosenGovernorFirstName: 'First Name',
        chosenGovernorImageURL: 'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
        chosenViceGovernorLastName:'LAST NAME',
        chosenViceGovernorFirstName: 'First Name',
        chosenViceGovernorImageURL: 'https://initia.org/wp-content/uploads/2017/07/default-profile.png',
        txHash:'',
        vin:'',
        password:''
       })
   }
   
   printVoteDetails(event){
       event.preventDefault();
       console.log("PRINT");
       window.printJS({ printable: 'vote-track-details', type: 'html', header: 'Vote Details' });
   }
    // Render component for React.Component (madatory for each class)
    render(){
        let printButton = null;
        let button;
        
        if(!this.state.loading){
            button = <button disabled={this.state.loading} className="form-button"type="submit">Track Vote</button>;
        }
        
        else{
            button = <button disabled={this.state.loading} className="form-button"type="submit">Processing (takes 15-30 seconds)
                <span className="atebits-loader">Loading...</span>
            </button>;
        }
        
        if(this.state.tracked){
            printButton = <div className="vote-track-buttons">
                              <div className="form-group text-center">
                                <a href="#" className="form-check"
                                onClick={this.printVoteDetails}>Print</a>
                              </div>
                              <div className="form-group text-center">
                                <a href="#" className="form-check"
                                onClick={event => {this.clear(event)}}>Back</a>
                              </div>
                          </div>
        }
        
        if(!this.state.tracked){
            return (
                <div className="form-content">
                    <form action="" onSubmit={event => {this.onSubmit(event, this.state.vin, this.state.password)}}>
                        <div className="form-group">
                            <label htmlFor="idVIN" className="form-label">Input Voters ID Number:</label>
                            <input className="form-input" 
                                   type="text" id="idVIN" 
                                   name="id" autoComplete="off" 
                                   placeholder="Voters ID VIN" 
                                   required
                                   value={this.state.vin}
                                   onChange = {event => this.setState({vin: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input className="form-input"
                                   type="password" 
                                   id="password"
                                   name="password" autoComplete="off" 
                                   placeholder="Password" 
                                   required 
                                   value={this.state.password}
                                   onChange = {event => this.setState({password: event.target.value})}/>
                        </div>
                       {button}
                    </form>
                </div> 
            );
        }
        else{
            return(
                <div className="vote-details-box">
                <h2 className="heading-secondary text-light text-center">Vote Details</h2>
                <div className="vote-details" id="vote-track-details">
                    <div className="form-group">
                        <p>VIN Number: <span>{this.state.vin}</span> </p>
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
           );
            
        }
        
    }
    
}

export default VoteTrackingForm;



