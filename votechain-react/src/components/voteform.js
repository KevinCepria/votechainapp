import React, {Component} from 'react';
import electionph from '../contract/electionph';
import web3 from '../contract/web3';

class VoteForm extends Component {
    state ={
        loading:false,
        chosenGovernor: '',
        chosenViceGovernor: '',
        votersIDVIN: '',
        txHash: null
    }
    
    onSubmit = async (event) => {
          event.preventDefault();
          
          console.log(this.state.chosenGovernor);
          console.log(this.state.chosenViceGovernor);
          
          let temp;
          const accounts = await web3.eth.getAccounts();
          
          this.setState({loading:true})
          
          try{
              await electionph.methods.vote(this.state.chosenGovernor, this.state.chosenViceGovernor).send({from:accounts[0]}).on('transactionHash',  hash=>{
                    temp=String(hash);
                });
                
              this.setState({txHash:temp});
              this.setState({chosenGovernor:''});
              this.setState({chosenViceGovernor:''});
              this.setState({votersIDVIN:''});
              
            } catch(error){
                 alert(error.message);
            }
          
         
          
          this.setState({loading:false});
          
    }
  
   
    render(){
        let button;
        if(!this.state.loading){
            button = <button disabled={this.state.loading} className="form-button"type="submit">Vote</button>;
        }
        
        else{
            button = <button disabled={this.state.loading} className="form-button"type="submit">Processing (takes 15-30 seconds)
                <span className="atebits-loader">Loading...</span>
            </button>;
        }
        if(this.state.txHash){
            return (
                <div className="form-content">
                    <h2 className="header-secondary"> Thank You For Voting </h2>
                    <div className="form-group">
                        <button onClick={()=>this.setState({txHash:null})} className="form-return">Next Voter Please</button>
                    </div> 
                    <div className = "txhash-wrapper">
                        <h2 className="header-secondary">Your Transanction ID</h2>
                        <p className="txhash">{this.state.txHash}</p>
                    </div>
                </div>
            );
        } else{
            return (
                <div className="form-content">
                    <h2 className="header-secondary">
                        Choose your candidates
                    </h2>
                    <form action="" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="idnum" className="form-label">Input Voters ID Number:</label>
                            <input 
                                className="form-input"
                                type="text" id="idnum" 
                                name="id" autoComplete="off" 
                                placeholder="Voters ID" 
                                required 
                                value={this.state.votersIDVIN}
                                onChange = {event => this.setState({votersIDVIN: event.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="president-candidate" className="form-label">Presidential Candidate:</label>
                            <select  
                                selected="selected" 
                                className="form-input" 
                                id="president-candidate" 
                                name="president-candidate"
                                // value={this.state.chosenGovernor}
                                onChange = {event =>{ this.setState({chosenGovernor: event.target.selectedIndex - 1}); console.log(event.target.selectedIndex -1)}}>
                                
                                <option> Please Select a Candidate </option>
                                <option className="pCandidate">Cepria, Kevin Jeff Torres</option>
                                <option className="pCandidate">Liwag, Ryan Joshua Hontomin</option>
                                <option className="pCandidate">Rapio, Anfernee</option>  
                                <option className="pCandidate">Santillan, Melchor Sugue</option>  
                                <option className="pCandidate">Zarzoso, Aaron John</option>     
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vice-president-candidate" className="form-label">Vice Presidential Candidate:</label>
                            <select 
                                className="form-input" 
                                id="vice-president-candidate" 
                                name="vice-president-candidate" 
                                placeholder="President"
                                // value={this.state.chosenGovernor}
                                onChange = {event => this.setState({chosenViceGovernor: event.target.selectedIndex -1})}>
                                
                                <option> Please Select a Candidate </option>
                                <option className="vPCandidate">Azarraga, Ejnar Ejaye</option>
                                <option className="vPCandidate">Del Rosario, Aldwin</option>
                                <option className="vPCandidate">Jarabelo, Adrian Benjamin</option>  
                                <option className="vPCandidate">Guevarra, Gervin Ernest</option> 
                                <option className="vPCandidate">Tan, Sidney Sheldon</option>     
                            </select>
                        </div>
                        <div className="form-group">
                            {button}
                        </div>
                   </form>
                  
                </div>
             );
        }
      
    }
   

};

export default VoteForm;

