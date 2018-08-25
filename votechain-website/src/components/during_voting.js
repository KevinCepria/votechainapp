import React, {Component} from 'react';
import VoteSection from './vote_section';
import LiveCountSection from './livecount';
import VoteTrackingSection from './vote_tracking_section'
import logo from '../assets/img/votechain_logo2.png';


class DuringVoting extends Component {
   
    componentDidMount(){
          new window.Countdown({
            elementId: 'countdown2',
            deadline: 'Tue, 18 Aug 2023 12:00:00',
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
                                <div className="row">
                                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Talavera_Nueva_Ecija.png/249px-Talavera_Nueva_Ecija.png" alt="" className="message-voting__image"/>
                                    <img src="https://mssngr.su/_data/stickers/75900/25.png" alt="" className="message-voting__image"/>
                                    <img src="http://sanjosecity-ne.gov.ph/content/img/1518070856-sjc-seal.png" alt="" className="message-voting__image"/>
                                </div>
                                <h2 className="heading-secondary text-dark">Ends on August 18, 2023 6:00 pm</h2>
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
                            <p className="about-paragraph text-dark">Blockchain is a secured linked list of records that contains a cryptographic hash per block. A cryptographic hash is an algorithm that consists of a one-way function that is infeasible to invert and is information-secured. The general idea of a blockchain is a form of passing data through Peer to peer (P2P) via a network. The gist behind this technology and why it should be applied to prevent fraud is because the data entered via P2P cannot be altered and is secured through a collection of nodes within the provided network. Blockchain is already being adapted to various forms, but is commonly known in today's technological industry in the form of cryptocurrency.  Blockchain can be used to prevent fraud in today's electoral votes, because as said before, information that is entered is secured and cannot be altered within the said system. Instead of entering the choice physically in a ballot box, there should be a primary key in the form of voter's ID, where it cannot be duplicated and is already predetermined in a database. Once the primary key is inputted into the system, the voter can, therefore, input his/her choice and it will be transmitted via blockchain. Since the data being passed is handled anonymously and secured, it will generally lessen and hopefully, eradicate the idea of fraud and electoral corruption.</p>
                        </div>
                    </div>
                </div>
         );
     
       

    }
}
export default DuringVoting;

