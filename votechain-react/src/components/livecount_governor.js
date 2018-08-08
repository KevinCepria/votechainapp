import React, { Component } from 'react';
import electionph from '../contract/electionph';

class GovernorCount extends Component {
    
    
    state={
        gVotes: [0,0,0,0,0]
    }
    
    componentDidMount(){
        let gVotes=this.state.gVotes;
    
        setInterval(async ()=>{
            
           for(let index in gVotes){
              gVotes[index] = await electionph.methods.getPresidentialVoteCount(index).call();
           }
          
           this.setState({gVotes});
         
        },3000);
    }
    
    // Render component for React.Component (madatory for each class)
    render(){
        
        return (
            <table className="result-president">
                <thead>
                    <tr>
                        <td>NAME</td>
                        <td>VOTE COUNT</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>KEVIN JEFF TORRES CEPRIA</td>
                        <td className="pVote">{this.state.gVotes[0]}</td>
                    </tr>
                    <tr>
                        <td>RYAN JOSHUA HONTOMIN LIWAG</td>
                        <td className="pVote">{this.state.gVotes[1]}</td>
                    </tr>
                    <tr>
                        <td>ANFERNEE RAPIO</td>
                        <td className="pVote">{this.state.gVotes[2]}</td>
                    </tr>
                    <tr>
                        <td>MELCHOR SUGUE SANTILLAN III</td>
                        <td className="pVote">{this.state.gVotes[3]}</td>
                    </tr>
                    <tr>
                        <td>AARON JOHN ZARZOSO</td>
                        <td className="pVote">{this.state.gVotes[4]}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
    
}

export default GovernorCount;