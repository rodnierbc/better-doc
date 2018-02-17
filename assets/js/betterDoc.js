import apiKey from '../../.env';

export class BetterDoc {
  constructor() {}

  request(queryType, queryTerm) {
    console.log(queryType);
    console.log(queryTerm);
    return new Promise((resolve, reject) => {
      let apiRequest = new XMLHttpRequest();
      let url;
      if (queryType === 'keyword') {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${queryTerm}&location=or-portland&user_location=37.773%2C-122.413` +
                      `&sort=best-match-asc&skip=0&limit=10&user_key=${apiKey.apiKey}`;
      } else if (queryType === 'name') {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${queryTerm}&location=or-portland&user_location=37.773%2C-122.413` +
                      `&sort=best-match-asc&skip=0&limit=10&user_key=${apiKey.apiKey}`;
      }

      apiRequest.onload = function() {
        if (this.status === 200) {
          resolve(apiRequest.response);
        } else {
          reject(Error(apiRequest.statusText));
        }
      };

      apiRequest.open('GET', url, true);
      apiRequest.setRequestHeader('Accept', 'application/json');
      apiRequest.send();
    });
  }

  // searchByDoctorName(doctorName) {
  //   this.request('name', doctorName).then((response) => {
  //     let body = JSON.parse(response);
  //
  //     this.cache = {
  //       ['name']: body
  //     };
  //     // this.cache.push(body);
  //     // this.cache.name[doctorName] = {
  //     //   body
  //     // };
  //   });
  //
  //   // console.log(this.cache);
  //   return this.cache.name;
  // }
}
