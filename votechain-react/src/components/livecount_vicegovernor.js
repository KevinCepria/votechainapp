import React, { Component } from 'react';
import electionph from '../contract/electionph';

class ViceGovernorCount extends Component {
    
    
    state={
        vgVotes: [0,0,0,0,0]
    }
    
    componentDidMount(){
        let vgVotes=this.state.vgVotes;
    
        setInterval(async ()=>{
            
           for(let index in vgVotes){
              vgVotes[index] = await electionph.methods.getVicePresidentialVoteCount(index).call();
           }
          
           this.setState({vgVotes});
         
        },5000);
    }
    
    // Render component for React.Component (madatory for each class)
    render(){
        return (
            <table  className="result-vice-president">
                <thead>
                    <tr>
                        <td>NAME</td>
                        <td>VOTE COUNT</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>EJNAR EJAYE AZARRAGA</td>
                        <td className="vpVote">{this.state.vgVotes[0]}</td>
                    </tr>
                    <tr>
                        <td>ALDWIN DEL ROSARIO</td>
                        <td className="vpVote">{this.state.vgVotes[1]}</td>
                    </tr>
                    <tr>
                        <td>ADRIAN BENJAMIN JARABELO</td>
                        <td className="vpVote">{this.state.vgVotes[2]}</td>
                    </tr>
                    <tr>
                        <td>GERVIN ERNEST GUEVARRA</td>
                        <td className="vpVote">{this.state.vgVotes[3]}</td>
                    </tr>
                    <tr>
                        <td>SIDNEY SHELDON TAN</td>
                        <td className="vpVote">{this.state.vgVotes[4]}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
    
}

export default ViceGovernorCount;