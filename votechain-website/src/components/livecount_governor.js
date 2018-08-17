import React, { Component } from 'react';
import electionph from '../contract/electionph';

class GovernorCount extends Component {
    
    
    state={
        gVotes: [0,0,0,0,0]
    }
    
    async componentWillMount(){
        let gVotes=this.state.gVotes;
        for(let index in gVotes){
          gVotes[index] = await electionph.methods.getGovernorVoteCount(index).call();
        }
        this.setState({gVotes});
    }
    componentDidMount(){
        let temp =this;
        let gVotes=this.state.gVotes;
    
        
         var ctx = document.getElementById("myChart").getContext('2d');
         var myChart = new window.Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Cepria", "Liwag", "Rapio", "Santillan", "Zarzoso"],
                datasets: [{
                    label: '# of Votes',
                    data: [temp.state.gVotes[0], temp.state.gVotes[1],temp.state.gVotes[2], temp.state.gVotes[3], temp.state.gVotes[4]],
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
            
           for(let index in gVotes){
              gVotes[index] = await electionph.methods.getGovernorVoteCount(index).call();
           }
           
           this.setState({gVotes});
           myChart.data.datasets[0].data= this.state.gVotes;
           myChart.update();
           
           
         
        },5000);
    }
    
    // Render component for React.Component (madatory for each class)
    render(){
        
        return (
            <div className="row ">
                <div className="col-2-of-4">
                    <canvas id="myChart"></canvas>
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
                                    <td>KEVIN JEFF TORRES CEPRIA</td>
                                    <td className="gVote">{this.state.gVotes[0]}</td>
                                </tr>
                                <tr>
                                    <td>RYAN JOSHUA HONTOMIN LIWAG</td>
                                    <td className="gVote">{this.state.gVotes[1]}</td>
                                </tr>
                                <tr>
                                    <td>ANFERNEE RAPIO</td>
                                    <td className="gVote">{this.state.gVotes[2]}</td>
                                </tr>
                                <tr>
                                    <td>MELCHOR SUGUE SANTILLAN III</td>
                                    <td className="gVote">{this.state.gVotes[3]}</td>
                                </tr>
                                <tr>
                                    <td>AARON JOHN ZARZOSO</td>
                                    <td className="gVote">{this.state.gVotes[4]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default GovernorCount;