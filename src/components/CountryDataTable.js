import React, { Component } from 'react';
import '../style/index.css';

class CountryDataTable extends Component {
  constructor(props) {
    super(props);
    this.renderTableData = this.renderTableData.bind(this);
    this.handleSortTableData = this.handleSortTableData.bind(this);
    this.sort = 'asc';
  }

  handleSortTableData(event) {
    if (this.sort === 'asc') {
      this.sort = 'des';
    } else {
      this.sort = 'asc';
    }
    this.props.sortData(this.sort);
    event.preventDefault();
  }

  renderTableData() {
    let { countryTableData } = this.props;

    return countryTableData.map((country, index) => {
      const {
        countryName,
        countryRank,
        countryLatitude,
        countryLongitude
      } = country; //destructuring
      return (
        <tr key={index}>
          <td>{countryName}</td>
          <td>{countryRank}</td>
          <td>{countryLatitude}</td>
          <td>{countryLongitude}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h2 className='text-center'>Country Data Table</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>
                <a href='' onClick={this.handleSortTableData}>
                  Country Name
                </a>
              </th>
              <th>
                <a href='' onClick={this.handleSortTableData}>
                  Collaboration Rank
                </a>
              </th>
              <th>
                <a href='' onClick={this.handleSortTableData}>
                  Country Latitude
                </a>
              </th>
              <th>
                <a href='' onClick={this.handleSortTableData}>
                  Country Longitude
                </a>
              </th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

//Expected type of property
CountryDataTable.propTypes = {};

export default CountryDataTable;
