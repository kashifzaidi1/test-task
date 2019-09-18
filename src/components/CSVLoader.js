import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSVReader from 'react-csv-reader';

import '../style/index.css';

class CSVLoader extends Component {
  constructor() {
    super();
    this.handleCSVFileLoaded = this.handleCSVFileLoaded.bind(this);
  }

  async handleCSVFileLoaded(data) {
    this.props.csvFileLoaded(data);
  }

  render() {
    return (
      <div>
        <h3>Upload CSV</h3>
        <CSVReader
          cssClass='react-csv-input'
          label='Select CSV file'
          onFileLoaded={this.handleCSVFileLoaded}
        />
      </div>
    );
  }
}

//Expected type of property
CSVLoader.propTypes = {
  handleCSVFileLoaded: PropTypes.func
};

export default CSVLoader;
