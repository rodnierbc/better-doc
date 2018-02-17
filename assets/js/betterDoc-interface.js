import { BetterDoc } from '../assets/js/betterDoc.js';

$(() => {
  let doctors = {};
  let betterDoc = new BetterDoc();

  // All needed element id's
  let backToQuerySelect = document.getElementById('backToQuerySelect');
  let divNameSearch = document.getElementById('divNameSearch');
  let divSymptomSearch = document.getElementById('divSymptomSearch');
  let form = document.getElementById('formContainer');
  let inputNameSearch = document.getElementById('inline-name');
  let inputKeywordSearch = document.getElementById('inline-keyword');
  let queryContainer = document.getElementById('queryContainer');
  let submitSearch = document.getElementById('submitSearch');

  queryContainer.addEventListener('click', function(event) {
    if (event.target && event.target.matches("button.searchButton")) {
      // Hide query selection and show form
      queryContainer.classList.toggle('hidden');
      form.classList.toggle('hidden');

      // Query Type Selection ? searchDoctor : searchSymptom
      if (event.target.id == 'searchDoctor') {
        // Display Doctor Name form input
        divNameSearch.classList.remove('hidden');
        divNameSearch.classList.add('md:flex');
        // Clear Keyword form input
        divSymptomSearch.classList.add('hidden');
        divSymptomSearch.classList.remove('md:flex');
        // Submit Search Button
        submitSearch.classList.remove('searchSymptom');
        submitSearch.classList.add('searchDoctor');

      } else if (event.target.id == 'searchSymptom') {
        // Display Keyword form input
        divSymptomSearch.classList.remove('hidden');
        divSymptomSearch.classList.add('md:flex');
        // Clear Doctor Name form input
        divNameSearch.classList.add('hidden');
        divNameSearch.classList.remove('md:flex');
        // Submit Search Button
        submitSearch.classList.remove('searchDoctor');
        submitSearch.classList.add('searchSymptom');
      } // End IF/Else Statement - event.target.id
    } // End If Statment - event.target && event.target.matches
  }); // End Listener - queryContainer

  // Submit search
  submitSearch.addEventListener('click', () => {
    if (submitSearch.matches('button.searchDoctor')) {
      console.log('Searching for Doctor!');

      betterDoc.request('name','johnson').then((response) => {
        let body = JSON.parse(response);

        for (let i = 0; i < body.data.length; i++) {
          doctors[i] = {
            practices: body.data[i].practices,
            profile: body.data[i].profile,
            specialties: body.data[i].specialties
          };
        }
      });

      console.log(doctors);

    } else if (submitSearch.matches('button.searchSymptom')) {
      console.log('Searching for Symptom!');

      betterDoc.request('keyword','cough').then((response) => {
        let body = JSON.parse(response);

        for (let i = 0; i < body.data.length; i++) {
          doctors[i] = {
            practices: body.data[i].practices,
            profile: body.data[i].profile,
            specialties: body.data[i].specialties
          };
        }
      });

      console.log(doctors);
    }
  });

  // Back Button
  backToQuerySelect.addEventListener('click', () => {
    queryContainer.classList.remove('hidden');
    form.classList.add('hidden');
  });



});
