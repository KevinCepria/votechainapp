import React, {Component} from 'react';
import RegisterForm from './register_form';
import logo from '../assets/img/votechain_logo2.png';

class BeforeVoting extends Component {
   
    componentDidMount(){
          new window.Countdown({
            elementId: 'countdown',
            deadline: 'Tue, 18 Aug 2018 8:30:00',
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
                                      <img src="https://halalan2016ph.files.wordpress.com/2015/06/halalan2016-banner1.png" alt="" className="message__image"/>
                                      <h2 className="heading-secondary text-dark">Voting Starts on August 18, 2018 12:00pm</h2>
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

