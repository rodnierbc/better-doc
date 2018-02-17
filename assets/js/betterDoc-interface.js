import { BetterDoc } from '../assets/js/betterDoc.js';

$(() => {
  let betterDoc = new BetterDoc();
  let doctors = {};
  
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
