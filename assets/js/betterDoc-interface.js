import { BetterDoc } from '../assets/js/betterDoc.js';

$(() => {
  let betterDoc = new BetterDoc();
  let doctors = {};
  let queryTypeContainer = document.getElementById('queryTypeContainer');

  queryTypeContainer.addEventListener('click', (event) => {
    console.log(event.target.id);

    if (event.target && event.target.matches("button.searchButton")) {
        if (event.target.id == 'searchDoctor') {
          alert('Searching doc!');
        } else if (event.target.id == 'searchSymptom') {
          alert('Searching symptom!');
        }
    }
  });

  betterDoc.request('name','johnson').then((response) => {
    let body = JSON.parse(response);

    for (let i = 0; i < body.data.length; i++) {
      doctors[i] = {
        practices: body.data[i].practices,
        profile: body.data[i].profile
      };
    }
  });

  console.log(doctors);
});
