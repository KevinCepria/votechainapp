import React, { Component } from 'react';
import electionph from './contract/electionph';
import InitialLoad from './components/initial';
import BeforeVoting from './components/before_voting';
import DuringVoting from './components/during_voting';


class App extends Component {
  state={
    isOpen : 'Loading'
  }
  
  async componentWillMount(){
     this.setState({isOpen: await electionph.methods.isOpen().call()})
  }
  
  
  render() {
    
    if(this.state.isOpen === 'Loading'){
      return (
        <InitialLoad/>   
    );
    }
    
    else if(!this.state.isOpen)
    {
      return (
        <BeforeVoting/>  
       );
    }
    
    else if(this.state.isOpen){
      return (
        <DuringVoting/>
     );
    }
    
  }
}

export default App;
