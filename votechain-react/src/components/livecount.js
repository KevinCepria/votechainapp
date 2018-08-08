import React from 'react';
import GovernorCount from './livecount_governor';
import ViceGovernorCount from './livecount_vicegovernor';

const LiveCountList =() =>  {
    
        return (
                <div className="result-content">
                    <h2 className="header-secondary">
                        Live election count
                    </h2>
                    <h3 className="header-tertiary">Governor</h3>
                    <GovernorCount/>
                    <h3 className="header-tertiary">Vice-Governor</h3>
                    <ViceGovernorCount/>
                </div>
        );
  
    
}

export default LiveCountList;