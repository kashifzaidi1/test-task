import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import CSVLoader from './CSVLoader';
import OverallStatsTable from './OverallStatsTable';
import CountryDataTable from './CountryDataTable';

import { calculate } from '../helpers/helpers';

class App extends Component {
  //Rendering the component
  constructor(props) {
    super(props);
    this.handleCSVFileLoaded = this.handleCSVFileLoaded.bind(this);
    this.handleSortingCountryData = this.handleSortingCountryData.bind(this);
    this.state = {
      overallStatsTableData: {
        avgCollaborationsClientCountry: '',
        maxCollaborationsClientCountry: '',
        minNumberClientCollaborations: '',
        maxClientCountries: ''
      },
      countryTableData: []
    };
  }

  handleCSVFileLoaded(data) {
    let csvData = data.splice(5, data.length - 1);
    let jsonData = csvData.map(item => {
      return {
        clientCountry: item[0],
        providerCountry: item[1],
        NumberCollaborations: item[2] ? parseInt(item[2]) : 0
      };
    });
    let { overallStatsTableData, countryTableData } = calculate(jsonData);
    this.setState({ overallStatsTableData, countryTableData });
  }

  handleSortingCountryData(type) {
    let { countryTableData } = this.state;

    if (type === 'asc') {
      countryTableData = countryTableData.sort(
        (a, b) => parseInt(a.countryRank) - parseInt(b.countryRank)
      );
    } else {
      countryTableData = countryTableData.sort(
        (a, b) => parseInt(b.countryRank) - parseInt(a.countryRank)
      );
    }
    this.setState({ countryTableData });
  }

  render() {
    const { overallStatsTableData, countryTableData } = this.state;
    return (
      <div className='App'>
        <Header />
        <CSVLoader csvFileLoaded={this.handleCSVFileLoaded} />
        <OverallStatsTable overallStatsTableData={overallStatsTableData} />
        <CountryDataTable
          sortData={this.handleSortingCountryData}
          countryTableData={countryTableData}
        />
      </div>
    );
  }
}

//Expected type of property
App.propTypes = {
  handleCSVFileLoaded: PropTypes.func
};

export default App;
