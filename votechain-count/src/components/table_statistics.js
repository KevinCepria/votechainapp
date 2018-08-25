import React, { Component } from 'react';
import electionph from '../contract/electionph';


class TableStats extends Component {
  state={
      totalRegisteredVoters:0,
      voteChainVoters:0,
      alreadyVoted: 0
  }
  
  async componentWillMount(){
      this.setState({
          totalRegisteredVoters: await electionph.methods.totalRegisteredVoters().call(),
          voteChainVoters: await electionph.methods.totalVotechainVoters().call(),
          alreadyVoted: await electionph.methods.totalVotes().call()
      })
  }
  
   componentDidMount(){
      setInterval(async ()=>{
            
             this.setState({
                  totalRegisteredVoters: await electionph.methods.totalRegisteredVoters().call(),
                  voteChainVoters: await electionph.methods.totalVotechainVoters().call(),
                  alreadyVoted: await electionph.methods.totalVotes().call()
              })
           
         
        },4000);
  }
  
  render() {
    return (
         <div className="u-marginbottom-md">
            <table className="table-stats">
                <tbody>
                    <tr>
                        <td>Total Registered Voters</td>
                        <td>{this.state.totalRegisteredVoters}</td>
                    </tr>
                    <tr>
                        <td>VoteChain Registered Voters</td>
                        <td>{this.state.voteChainVoters}</td>
                    </tr>
                    <tr>
                        <td>Voted</td>
                        <td>{this.state.alreadyVoted}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }
}

export default TableStats;
