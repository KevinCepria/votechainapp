import React, { Component } from 'react';
import electionph from '../contract/electionph';

class ViceGovernorCount extends Component {
    
    
    state={
        vgVotes: [0,0,0,0,0]
    }
    
    async componentWillMount(){
        let vgVotes=this.state.vgVotes;
        for(let index in vgVotes){
          vgVotes[index] = await electionph.methods.getViceGovernorVoteCount(index).call();
        }
        this.setState({vgVotes});
    }
    
    componentDidMount(){
        let temp =this;
        let vgVotes=this.state.vgVotes;
    
        
         var ctx = document.getElementById("myChart2").getContext('2d');
         var myChart2 = new window.Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Azarraga", "Del Rosario", "Jarabelo", "Guevarra", "Tan"],
                datasets: [{
                    label: '# of Votes',
                    data: [temp.state.vgVotes[0], temp.state.vgVotes[1],temp.state.vgVotes[2], temp.state.vgVotes[3], temp.state.vgVotes[4]],
                    backgroundColor: [
                        'red',
                        'blue',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                    ],
                    
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                responsive:true,
                legend:{
                    labels:{
        
                        // fontColor: 'red',
                        fontFamily: 'Ubuntu',
                        fontSize: 13,
                      
                    }
                }
            }
        });
        
       
        
         setInterval(async ()=>{
            
           for(let index in vgVotes){
              vgVotes[index] = await electionph.methods.getViceGovernorVoteCount(index).call();
           }
           
           this.setState({vgVotes});
           myChart2.data.datasets[0].data= this.state.vgVotes;
           myChart2.update();
           
           
         
        },5000);
        
    }
    
    // Render component for React.Component (madatory for each class)
    render(){
        return (
            <div className="row">
                <div className="col-2-of-4">
                    <canvas id="myChart2" ></canvas>
                </div>
                <div className="col-2-of-4">
                    <div className="result-tabular">
                        <table>
                            <thead>
                                <tr>
                                    <td>NAME</td>
                                    <td>VOTE COUNT</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>EJNAR EJAYE AZARRAGA</td>
                                    <td className="vgVote">{this.state.vgVotes[0]}</td>
                                </tr>
                                <tr>
                                    <td>ALDWIN DEL ROSARIO</td>
                                    <td className="vgVote">{this.state.vgVotes[1]}</td>
                                </tr>
                                <tr>
                                    <td>ADRIAN BENJAMIN JARABELO</td>
                                    <td className="vgVote">{this.state.vgVotes[2]}</td>
                                </tr>
                                <tr>
                                    <td>GERVIN ERNEST GUEVARRA</td>
                                    <td className="vgVote">{this.state.vgVotes[3]}</td>
                                </tr>
                                <tr>
                                    <td>SIDNEY SHELDON TAN</td>
                                    <td className="vgVote">{this.state.vgVotes[4]}</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default ViceGovernorCount;