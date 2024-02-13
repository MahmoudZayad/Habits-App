// script.js
const {printUserHabitsAndResults} = require('../app/lib/data.js');

// Call the function with a user ID
printUserHabitsAndResults('f115b4f6-5a05-4638-8d87-401ed20cbfec')
  .then(() => console.log('Done'))
  .catch((error) => console.error('Error:', error));
  