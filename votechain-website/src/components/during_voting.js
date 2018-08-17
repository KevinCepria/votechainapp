import React, {Component} from 'react';
import VoteSection from './vote_section';
import LiveCountSection from './livecount';
import VoteTrackingSection from './vote_tracking_section'
import logo from '../assets/img/votechain_logo2.png';


class DuringVoting extends Component {
   
    componentDidMount(){
          new window.Countdown({
            elementId: 'countdown2',
            deadline: 'Tue, 18 Aug 2018 12:00:00',
            timeZone: 'GMT+08:00',
            units: [' days', ' hrs', ' mins', ' sec'],
            hide: [false, false, false, false]
        });
    }
    
    render(){
            
            return (
               <div className="main-container">
                    <div className="header">
                        <div className="container maximum-height">
                            <div className="logo-title">
                                <img src={logo} className="logo" alt="votechain"/>
                            </div>
                            <div className="message-voting">
                                <h1 className="heading-primary text-dark">Voting is now open</h1>
                                <img src="https://mssngr.su/_data/stickers/75900/25.png" alt="" className="message-voting__image"/>
                                <h2 className="heading-secondary text-dark">Ends on August 18, 2018 6:00 pm</h2>
                                <div id="countdown2" className="countdown"></div>
                            </div>    
                        </div>
                    </div>
                    <VoteSection/>
                    <LiveCountSection/>
                    <VoteTrackingSection />
                    <div className="technology-section">
                        <div className="container">
                            <h2 className="heading-primary text-dark u-marginbottom-md">The Technology</h2>
                        </div>
                    </div>
                </div>
         );
     
       

    }
}
export default DuringVoting;

