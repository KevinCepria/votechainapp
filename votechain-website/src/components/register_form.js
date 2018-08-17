import React, {Component} from 'react';
import electionph from '../contract/electionph';
import web3 from '../contract/web3';

class RegisterForm extends Component {
    state ={
        loading:false,
        vin:'',
        firstName:'',
        lastName:'',
        password:'',
        passwordConfirmation:'',
        success:false
    }
    
    reloadPage = (event)=>{
        window.location.reload();
    }
    onSubmit = async (event) => {
          event.preventDefault();
          
          
          let vin = web3.utils.fromAscii(this.state.vin);
          let firstName = web3.utils.fromAscii(this.state.firstName);
          let lastName = web3.utils.fromAscii(this.state.lastName);
          let password = web3.utils.fromAscii(this.state.password);
          
          console.log(vin, firstName, lastName, password);
          const accounts = await web3.eth.getAccounts();

          this.setState({loading:true})
          
              if(this.state.password !== this.state.passwordConfirmation){
                  alert("passwords not matching");
              }
              
              else{
                   try{
                   await electionph.methods.register(vin,firstName,lastName,password).send({from:accounts[0], gas:3000000});
                   this.setState({success:true}); 
                  
                } catch(error){
                     alert(error.message);
                }
              }
             
          
         
          
          this.setState({loading:false});
          
    }
  
   
    render(){
        let button;
        if(!this.state.loading){
            button = <button disabled={this.state.loading} className="form-button"type="submit">Register</button>;
        }
        
        else{
            button = <button disabled={this.state.loading} className="form-button"type="submit">Processing (takes 15-30 seconds)
                <span className="atebits-loader">Loading...</span>
            </button>;
        }
        
        if(!this.state.success){
            return (
            <div className="form-box">
              <h2 className="heading-secondary text-theme">Register on VoteChain</h2>
              <form action="" onSubmit={this.onSubmit}>
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
                      <label htmlFor="last-name" className="form-label">Last Name:</label>
                      <input className="form-input" 
                             type="text" id="last-name" 
                             name="last-name" autoComplete="off" 
                             placeholder="Voters last name" required
                             value={this.state.lastName}
                             onChange = {event => this.setState({lastName: event.target.value})}/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="first-name" className="form-label">First Name:</label>
                      <input className="form-input" 
                             type="text" id="first-name"
                             name="first-name" autoComplete="off"
                             placeholder="Voters first name" 
                             required
                             value={this.state.firstName}
                             onChange = {event => this.setState({firstName: event.target.value})}/>
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
                      <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
                      <input className="form-input" 
                             type="password" id="confirm-password" 
                             name="confirm-password" autoComplete="off" 
                             placeholder="Confirm password" 
                             required
                             value={this.state.passwordConfirmation}
                             onChange = {event => this.setState({passwordConfirmation: event.target.value})}/>
                  </div>
                  {button}
              </form>
          </div>
         );
        }
        else{
            return (
                <div className="form-box">
                    <h2 className="heading-secondary text-theme"> Registration Successful. You can now vote during the voting period </h2>
                    <div className="form-group">
                        <button onClick={this.reloadPage}className="form-button">Back</button>
                    </div> 
                </div>
            );
        }
       

    }
}
export default RegisterForm;

