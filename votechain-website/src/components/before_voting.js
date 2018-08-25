import React, {Component} from 'react';
import RegisterForm from './register_form';
import logo from '../assets/img/votechain_logo2.png';
import halalan from '../assets/img/halalan-banner.png';

class BeforeVoting extends Component {
   
    componentDidMount(){
          new window.Countdown({
            elementId: 'countdown',
            deadline: 'Tue, 18 Aug 2023 10:00:00',
            timeZone: 'GMT+08:00',
            units: [' days', ' hrs', ' mins', ' sec'],
            hide: [false, false, false, false]
        });
    }
    
    render(){
            
            return (
                <div className="main-container">
                  <div className="header">
                      <div className="container">
                          <div className="logo-title">
                              <img src={logo} className="logo" alt="votechain"/>
                          </div>
                          <div className="row">
                              <div className="col-3-of-5">
                                  <div className="message">
                                      <div className="row">
                                          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Talavera_Nueva_Ecija.png/249px-Talavera_Nueva_Ecija.png" alt="" className="message__image"/>
                                          <img src={halalan} alt="" className="message__image"/>
                                          <img src="http://sanjosecity-ne.gov.ph/content/img/1518070856-sjc-seal.png" alt="" className="message__image"/>
                                      </div>
                                      <h2 className="heading-secondary text-dark">Voting Starts on August 18, 2023 12:00pm</h2>
                                      <div  id="countdown" className="countdown">
                                      </div>
                                      
                                  </div>
                              </div>
                              <div className="col-2-of-5">
                                  <RegisterForm />
                              </div>
                          </div>
                      </div>
                  </div> 
              </div> 
         );
     
       

    }
}
export default BeforeVoting;

