import React from 'react';
import globe from '../assets/img/globe.png';
import VoteTrackingForm from './vote_tracking_form';


const VoteTrackingSection=() =>  {
    
        return (
               <div className="vote-tracking-section">
                    <div className="container">
                        <div className="row wrapper">
                            <div className="col-2-of-4">
                                <div className="vote-track-img-box">
                                    <h1 className="globe-text text-light text-center">Track your vote</h1>    
                                    <img className="vote-track-img "src={globe} alt=""/>   
                                    <img className="vote-track-img2 "src={globe} alt=""/>             
                                </div>
                            </div>
                            <div className="col-2-of-4">
                                <VoteTrackingForm/>
                            </div>
                        </div>
                    </div>
                </div>
        );
  
    
}

export default VoteTrackingSection;