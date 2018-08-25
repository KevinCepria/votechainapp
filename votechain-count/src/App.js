import React, { Component } from 'react';
import GovernorCount from './components/livecount_governor';
import ViceGovernorCount from './components/livecount_vicegovernor';
import TableStats from './components/table_statistics';


class App extends Component {
  render() {
    return (
      <div className="live-results-section">
          <div className="container">
              <h2 className="heading-primary text-dark u-marginbottom-md">Live Count</h2>
              <TableStats />
              <h3 className="heading-tertiary text-red text-center">Governor</h3>
              <GovernorCount/>
              <h3 className="heading-tertiary text-red text-center">Vice Governor</h3>
              <ViceGovernorCount/>
          </div>
      </div>
    );
  }
}

export default App;
