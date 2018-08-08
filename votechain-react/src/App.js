import React, { Component } from 'react';
import Form from './components/voteform';
import LiveCountList from './components/livecount'

export default class App extends Component {
  render() {
    return (
      <div className="container">
           <main>
        <div className="header-box">
            <h1 className="header-primary">VoteChain</h1>
            <span className="timer-box">
                <time className="timer"></time>
            </span>
        </div>
       <div className="row">
            <section className="col">
                <Form />
            </section>
            <section className="col">
                <LiveCountList />
            </section>    
       </div>
       
    </main>
      </div>
    );
  }
}
