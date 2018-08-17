import React from 'react';
import GovernorCount from './livecount_governor';
import ViceGovernorCount from './livecount_vicegovernor';

const LiveCountSection =() =>  {
    
        return (
                <div className="live-results-section">
                    <div className="container">
                        <h2 className="heading-primary text-dark u-marginbottom-md">Live Count</h2>
                        <h3 className="heading-tertiary text-red text-center">Governor</h3>
                        <GovernorCount/>
                        <h3 className="heading-tertiary text-red text-center">Vice Governor</h3>
                        <ViceGovernorCount/>
                    </div>
                </div>
        );
  
    
}

export default LiveCountSection;