import React from 'react';
import logo from '../assets/img/votechain_logo2.png';


const InitialLoad=() =>  {
    
        return (
               <div className="main-container">
                    <div className="header">
                        <div className="container maximum-height">
                            <div className="message-voting">
                                <img src={logo} alt="" className="initial__image"/>
                                <h1 className="heading-primary text-dark">LOADING</h1>
                            </div>    
                        </div>
                    </div>
                </div>
        );
  
    
}

export default InitialLoad;