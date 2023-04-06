// Element functions ---------------------------------------------------------------------------------------------------
function id(e) {
  return document.getElementById(e)
};
function cn(e) {
  return document.getElementsByClassName(e)
};
function qs(e) {
  return document.querySelectorAll(e)
};
// Define the elements we'll be working with in the HTML ---------------------------------------------------------------------------------------------------
const home = id('home');
const homeNew = id('home-new');
const homeCon = id('home-continue');
const homeBook = id('home-bookmark');
const homeSet = id('home-settings');

const dictionary = id('dictionary');
const dictTitle = id('dict-title');


const definition = id('definition'); 
const dictList = id('dict-list');

const defIndex = id('def-index');
const defKanji = id('def-kanji');
const defBody = id('def-body');
const defEng = id('def-eng');
const defOny = id('def-ony');
const defKun = id('def-kun');

const settings = id('settings');
const settTitle = id('sett-title');
const settSubject = id('sett-subject');
const settSubjectContent = cn('sett-subject-content')[0];
const settSubjectBtn = cn('sett-subject-btn')[0];
const settSave = id('sett-save');
const settRestore = id('sett-restore');
const settReset = id('sett-reset');

const inputQuestions = id('user-questions');
const inputSubjects = id('user-subjects');
const inputDifficulty = id('sett-difficulty');

const question = id('question');
const questKanji = id('question-kanji');
const questCurrent = id('question-current');
const questMax = id('question-max');

const kanjiClass = qs('.kanji-character');
const kanjiChar = cn("kanji-character");
const choiceElems = cn('choice');
const choiceAll = qs('.choice');
const homeBtn = id('home-btn');
const bookBtn = id('book-btn');
const bookIcon = id('icon-book');
const nextBtn = id('next-btn');
const hintBtn = id('hint-btn');

const result = id('result');
const resulttext = id('result-text');
const resultBtn = id('result-btn');
const resultKanji = id('result-kanji');

const final = id('final');
const finalTabSummary = id('final-tab-summary');
const finalTabQuestions = id('final-tab-questions');
const finalSummary = id('final-summary');
const finalQuestions = id('final-questions');
const finalResults = id('final-results');
const finalBtn = id('final-btn');

// Read CSV ---------------------------------------------------------------------------------------------------
let filename = 'data/learnkanji-data.csv';
let masterList = []; //Raw array
let kanjiList = []; //List of unique Kanji only
let defList = []; //Parsed array; 1 row per Kanji with condensed object properties
let newKeys;

// Define a function that reads a CSV file and returns a Promise
function readCSV(filename) {
  return new Promise((resolve, reject) => {
    Papa.parse(filename, {
      download: true,
      complete: (results) => {
        resolve(results.data.map(obj => Object.values(obj)));
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Call the function to read the CSV file and handle the Promise
readCSV(filename)
  //Success
  .then((data) => {
    // Reconstruct the array - add dictionary labels. 
    const keys = data.shift();
    
    //Create clean keys by removing hidden characters
    newKeys = [];
    keys.forEach((key) => {
      key=key.replace(/\uFEFF/g,'');
      newKeys.push(key);
    });

    //Assign object properties using keys
    masterList = data.map(row => {
      const obj = {};
      keys.forEach((key, index) => {
        key=key.replace(/\uFEFF/g,'');
        obj[key] = row[index];
      });
      return obj;
    });

    //Convert comma separated values within objects to separate arrays.
    masterList.forEach((element,index) => {
      for (let prop in masterList[index]) {
        if (masterList[index].hasOwnProperty(prop) && typeof masterList[index][prop] === 'string') {
          masterList[index][prop] = masterList[index][prop].split(',').map(item => item.trim());
        }
      }
    }); 
  
    //Convert values into titles.
    masterList.forEach((obj) => {
      for (let prop in obj) {
        if (Array.isArray(obj[prop])) {
          obj[prop] = obj[prop].map((value) => value.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase()));
        }
      }
    });

    //Condense master list so that there is one unique kanji containing arrays of each property
    const condensedObject = {};
    masterList.forEach((obj) => {
      const { Kanji, ...rest } = obj;
      const key = `${Kanji}`;
      if (!condensedObject[key]) {
        condensedObject[key] = { Kanji, ...rest };
      } else {
        Object.keys(rest).forEach((prop) => {
          condensedObject[key][prop].push(...rest[prop]);
        });
      }
    });

    ////Remove duplicate values from each object property
    defList = Object.values(condensedObject);
    defList.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        obj[key] = Array.from(new Set(obj[key]));
      });
    });
    masterList.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        obj[key] = Array.from(new Set(obj[key]));
      });
    });

    //Create list of unique kanji
    masterList.forEach((element) => {
      kanjiList.push(element.Kanji[0]);
    });
    kanjiList = Array.from(new Set(kanjiList));

    //Pass array to Settings
    
    createSubjects(newKeys);
    defQuestions();
    defSubjects();
    defDifficulty();
    

    //Create dictionary
    constructDict();
  })
  //Error
  .catch((error) => {
    console.error('Error reading CSV.', error);
  });


  