import { countriesData } from '../data/countries';

function findCountries(data) {
  const clientCountries = [];
  let allCountries = [];
  data.forEach(row => {
    if (row.clientCountry) {
      clientCountries.push(row.clientCountry);
      allCountries.push(row.clientCountry);
    }
    if (row.providerCountry) {
      allCountries.push(row.providerCountry);
    }
  });

  allCountries = [...new Set(allCountries)];

  return {
    clientCountries,
    allCountries
  };
}

// Since the data can scale, therefore we are only iterating once over it and taking the relevant data
export function calculate(data) {
  let avgCollaborationAmongClientCountries = 0;
  let maxCollaborationsAsClientCountry = '';
  let minCollaborationsAsClientCountry;
  let maxClientCountry;
  let totalNumberOfCollaborations = 0;
  let CollaborationsAsClientCountry = {};
  let CollaborationsAsProviderCountry = {};

  const countries = findCountries(data);
  const clientCountries = countries.clientCountries;
  const allCountries = countries.allCountries;

  let statisticsByCountry = [];

  data.forEach(row => {
    if (!row.clientCountry || !row.providerCountry) {
      return; //assuming its incomplete data
    }
    if (clientCountries.includes(row.providerCountry)) {
      totalNumberOfCollaborations += row.NumberCollaborations;
    }
    if (!CollaborationsAsClientCountry[row.clientCountry]) {
      CollaborationsAsClientCountry[row.clientCountry] = {
        country: row.clientCountry,
        collaborations: row.NumberCollaborations
      };
    } else {
      CollaborationsAsClientCountry[row.clientCountry]['collaborations'] +=
        row.NumberCollaborations;
    }
    if (!CollaborationsAsProviderCountry[row.clientCountry]) {
      CollaborationsAsProviderCountry[row.clientCountry] = {
        country: row.clientCountry,
        collaborations: 1
      };
    } else {
      CollaborationsAsProviderCountry[row.clientCountry]['collaborations'] += 1;
    }

    // task 2
  });

  avgCollaborationAmongClientCountries =
    totalNumberOfCollaborations / clientCountries.length;
  maxCollaborationsAsClientCountry = Object.keys(
    CollaborationsAsClientCountry
  ).reduce((previousCountry, currentCountry) => {
    if (!previousCountry) {
      return currentCountry;
    }

    if (
      CollaborationsAsClientCountry[currentCountry].collaborations >
      CollaborationsAsClientCountry[previousCountry].collaborations
    ) {
      return currentCountry;
    }
    return previousCountry;
  }, '');

  minCollaborationsAsClientCountry = Object.keys(
    CollaborationsAsClientCountry
  ).reduce((previousCountry, currentCountry) => {
    if (
      !previousCountry ||
      CollaborationsAsClientCountry[currentCountry] <= 0
    ) {
      return currentCountry;
    }

    if (
      CollaborationsAsClientCountry[currentCountry].collaborations <
      CollaborationsAsClientCountry[previousCountry].collaborations
    ) {
      return currentCountry;
    }
    return previousCountry;
  }, '');

  maxClientCountry = Object.keys(CollaborationsAsProviderCountry).reduce(
    (previousCountry, currentCountry) => {
      if (!previousCountry) {
        return currentCountry;
      }

      if (
        CollaborationsAsProviderCountry[currentCountry].collaborations >
        CollaborationsAsProviderCountry[previousCountry].collaborations
      ) {
        return currentCountry;
      }
      return previousCountry;
    },
    ''
  );

  allCountries.forEach(country => {
    if (CollaborationsAsClientCountry[country]) {
      statisticsByCountry.push({
        countryName: country,
        countryLatitude: countriesData[country]
          ? countriesData[country].latitude
          : 'N/a',
        countryLongitude: countriesData[country]
          ? countriesData[country].longitude
          : 'N/a',
        countryRank:
          (CollaborationsAsClientCountry[country].collaborations * 100) /
          CollaborationsAsClientCountry[minCollaborationsAsClientCountry]
            .collaborations
      });
    }
  });

  return {
    overallStatsTableData: {
      avgCollaborationsClientCountry: avgCollaborationAmongClientCountries,
      maxCollaborationsClientCountry:
        CollaborationsAsClientCountry[maxCollaborationsAsClientCountry],
      minNumberClientCollaborations:
        CollaborationsAsClientCountry[minCollaborationsAsClientCountry],
      maxClientCountries: CollaborationsAsProviderCountry[maxClientCountry]
    },
    countryTableData: statisticsByCountry
  };
}
