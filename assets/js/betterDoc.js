import apiKey from '../../.env';

export class BetterDoc {
  constructor() {}

  request(queryType, queryTerm) {
    return new Promise((resolve, reject) => {
      let apiRequest = new XMLHttpRequest();
      let url;
      if (queryType === 'keyword') {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${queryTerm}&location=or-portland&user_location=37.773%2C-122.413` +
                      `&sort=best-match-asc&skip=0&limit=6&user_key=${apiKey.apiKey}`;
      } else if (queryType === 'name') {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${queryTerm}&location=or-portland&user_location=37.773%2C-122.413` +
                      `&sort=best-match-asc&skip=0&limit=6&user_key=${apiKey.apiKey}`;
      }

      apiRequest.onload = function() {
        if (this.status === 200) {
          resolve(apiRequest.response);
        } else {
          reject(Error(apiRequest.statusText));
        }
      };

      apiRequest.open('GET', url, true);
      apiRequest.setRequestHeader('Accept', 'application/json; charset=utf-8');
      apiRequest.send();
    });
  }

  displayInfo() {
    infoBox.classList.toggle('hidden');
    infoBox.classList.toggle('flex');

    setTimeout(() => {
      $('#infoBox').fadeOut(2000);
    }, 5000);
  }

  displayWarning() {
    warningBox.classList.toggle('hidden');

    setTimeout(() => {
      $('warningBox').fadeOut(2000);
    }, 5000);
  }

  searchResult(queryType, body) {
    let doctors;
    if (body.data.length <= 0) {
      doctors = null;
      this.displayInfo();
    } else if (body.data.length > 0) {
      doctors = {
        name: [],
        keyword: []
      };

      for (let i = 0; i < body.data.length; i++) {
        doctors[queryType][i] = {
          practices: body.data[i].practices,
          profile: body.data[i].profile,
          specialties: body.data[i].specialties
        };
      }
    } else {
      this.displayWarning();
    }

    return doctors;
  }
}
