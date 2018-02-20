import { BetterDoc } from '../assets/js/betterDoc.js';

$(() => {
  let betterDoc = new BetterDoc();
  let backToQuerySelect = document.getElementById('backToQuerySelect');
  let divNameSearch = document.getElementById('divNameSearch');
  let divSymptomSearch = document.getElementById('divSymptomSearch');
  let docForm = document.getElementById('docForm');
  let form = document.getElementById('formContainer');
  let infoBox = document.getElementById('infoBox');
  let inputNameSearch = document.getElementById('inline-name');
  let inputKeywordSearch = document.getElementById('inline-keyword');
  let queryContainer = document.getElementById('queryContainer');
  let submitSearch = document.getElementById('submitSearch');
  let warningBox = document.getElementById('warningBox');

  queryContainer.addEventListener('click', (event) => {
    if (event.target && event.target.matches("button.searchButton")) {
      queryContainer.classList.toggle('hidden');
      form.classList.toggle('hidden');

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
      }
    }
  });

  docForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let doctors;

    if (submitSearch.matches('button.searchDoctor')) {
      let input = $('#inline-name').val();
      $('#inline-name').val('');

      betterDoc.request('name', input).then(function(response) {
        let body = JSON.parse(response);
        doctors = betterDoc.searchResult('name', body);

        if (doctors) {
          for (let i = 0; i < body.data.length; i++) {
            form.classList.add('hidden');
            $('#results').append('<div class="max-w-md w-full my-auto lg:flex">' +
                                    `<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('${doctors.name[i].profile.image_url}')" title="Picture of the Doctor"></div>` +
                                    '<div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">' +
                                      '<div class="mb-8">' +
                                        '<p class="text-sm text-grey-dark flex items-center">' +
                                          '<svg class="fill-current text-grey w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' +
                                            '<path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />' +
                                          '</svg>' +
                                          `${doctors.name[i].profile.first_name} ${doctors.name[i].profile.last_name}` +
                                        '</p>' +
                                        '<div class="text-black font-bold text-xl mb-2"></div>' +
                                        `<p class="text-grey-darker text-base">Accepting new patients: ${doctors.name[i].practices[0].accepts_new_patients}</p>` +
                                        `<p class="text-grey-darker text-base">Address: ${doctors.name[i].practices[0].visit_address.street} ${doctors.name[i].practices[0].visit_address.city} ${doctors.name[i].practices[0].visit_address.state} ${doctors.name[i].practices[0].visit_address.zip}</p>` +
                                        `<p class="text-grey-darker text-base">Phone Number: ${doctors.name[i].practices[0].phones[0].number}</p>` +
                                      '</div>' +
                                    '</div>' +
                                  '</div>');
          }
        }
      });
    } else if (submitSearch.matches('button.searchSymptom')) {

      let keyword = $('#inline-keyword').val();
      $('#inline-keyword').val('');

      betterDoc.request('keyword', keyword).then((response) => {
        let body = JSON.parse(response);
        doctors = betterDoc.searchResult('keyword', body);

        if (doctors) {
          for (let i = 0; i < body.data.length; i++) {
            form.classList.add('hidden');
            $('#results').append('<div class="max-w-md w-full my-auto lg:flex">' +
                                    `<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('${doctors.keyword[i].profile.image_url}')" title="Picture of the Doctor"></div>` +
                                    '<div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">' +
                                      '<div class="mb-8">' +
                                        '<p class="text-sm text-grey-dark flex items-center">' +
                                          '<svg class="fill-current text-grey w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' +
                                            '<path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />' +
                                          '</svg>' +
                                          `${doctors.keyword[i].profile.first_name} ${doctors.keyword[i].profile.last_name}` +
                                        '</p>' +
                                        '<div class="text-black font-bold text-xl mb-2"></div>' +
                                        `<p class="text-grey-darker text-base">Accepting new patients: ${doctors.keyword[i].practices[0].accepts_new_patients}</p>` +
                                        `<p class="text-grey-darker text-base">Address: ${doctors.keyword[i].practices[0].visit_address.street} ${doctors.keyword[i].practices[0].visit_address.city} ${doctors.keyword[i].practices[0].visit_address.state} ${doctors.keyword[i].practices[0].visit_address.zip}</p>` +
                                        `<p class="text-grey-darker text-base">Phone Number: ${doctors.keyword[i].practices[0].phones[0].number}</p>` +
                                      '</div>' +
                                    '</div>' +
                                  '</div>');
          }
        }
      });
    }
  });

  backToQuerySelect.addEventListener('click', () => {
    queryContainer.classList.remove('hidden');
    form.classList.add('hidden');
  });

});
