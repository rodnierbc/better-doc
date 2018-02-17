import { BetterDoc } from '../assets/js/betterDoc.js';


$(() => {
let betterDoc = new BetterDoc();

  // betterDoc.request('name', 'suhler');

  betterDoc.request('name','johnson').then((response) => {
    let body = JSON.parse(response);
    console.log(body);
    console.log(body.data.length);

    

  });



});
