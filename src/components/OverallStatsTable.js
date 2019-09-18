import React, { Component } from 'react';
import '../style/index.css';
import '../style/table.css';

class OverallStatsTable extends Component {
  render() {
    const {
      avgCollaborationsClientCountry,
      maxCollaborationsClientCountry,
      minNumberClientCollaborations,
      maxClientCountries
    } = this.props.overallStatsTableData;

    return (
      <div>
        <h2 className='text-center'>Overall Stats Table</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Average No. of Collaborations</th>
              <th>Country With Most Collaborations as Client</th>
              <th>Minimum Number of Collaborations among Client Countries</th>
              <th>Country With Most Provider Countries</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{avgCollaborationsClientCountry}</td>
              <td>
                {maxCollaborationsClientCountry.country} with&nbsp;
                {maxCollaborationsClientCountry.collaborations}
              </td>
              <td>{minNumberClientCollaborations.collaborations}</td>
              <td>
                {maxClientCountries.country} with&nbsp;
                {maxClientCountries.collaborations}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

//Expected type of property
OverallStatsTable.propTypes = {};

export default OverallStatsTable;
