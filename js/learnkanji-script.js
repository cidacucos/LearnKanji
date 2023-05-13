//Declare variables ---------------------------------------------------------------------------------------------------
let currentKanji, correctAnswer;

//Functions for navigation.
var historyPage = [];

function displayOn(element) {
  
  element.style.display = 'flex';
  currentPage = element;
  if(element=home){
    releaseKeepScreenOn();
  };
};
function displayOff(element) {
  
  element.style.display = 'none';
  historyPage.unshift(element);
  if(element=home){
    requestKeepScreenOn();
  };
};

//Make list of history > Back button clicks > Turn off current, turn on last
function back() {
  if(historyPage.length !== 0) {
    currentPage.style.display = 'none';
    historyPage[0].style.display = 'flex';
    currentPage = historyPage[0];
    historyPage.shift();
    };
};

// Function to select a random kanji and its correct meaning, and populate the choices
function populateChoices() {
  

  //Select a random subject for question basis.
  const keys = Object.keys(masterList[0]);
  //const blackList = ['Index','Kanji','ExPhraseKana','ExPhraseKanji','JapDefKana','JapDefKanji','VocabKana','VocabKanji','Yomi'];
  var subject = (function() {
    while (true) {
      var currentSubject = keys[Math.floor(Math.random() * keys.length)];
      if(userSubjects.includes(currentSubject)) {
        return currentSubject;
      };
    };
  })();  

  //Adjust visuals to fit subject
  if(subject === 'English') {
    choiceAll.forEach((element) => {
      element.style.fontWeight = 'normal';
      element.style.fontSize = '20px';
    });
  }
  else {
    choiceAll.forEach((element) => {
      element.style.fontWeight = 'bolder';
      element.style.fontSize = '25px';
    });
  };

  // Select a random kanji from the list based on index number.
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  function r(list,min,max) {
    while (true) {
      const randomIndex = getRandomInt(min,max);
      const filteredList =  list.filter(obj => obj.Index[0] === String(randomIndex));
      const test = getRandomInt(0,filteredList.length-1)
      var randomObject = filteredList[test];
      
      //If repeat limit is reached then refresh repeat limitation
      if(finalListKanji.length+1 == kanjiMax){
        say(finalListKanji.length+1);
        say(kanjiMin);
        say(kanjiMax);
        finalListKanji=[];
      }

      //Check if randomly selected Kanji has an answer to the subject and if it had been chosen already
      if(randomObject[subject][0] !== '-' && randomObject[subject][0] !== '' && !finalListKanji.includes(randomObject['Kanji'][0])) {
        return randomObject;
      }
    }
  }; 

  //Select the Correct answer(1).
  currentKanji = r(masterList,kanjiMin,kanjiMax);
  correctAnswer = currentKanji[subject][Math.floor(Math.random() * currentKanji[subject].length)];

  //Select the Incorrect Kanji answers(3).
  var otherAnswers = [];
  var nonAnswers = currentKanji[subject];
  for (let i=0;otherAnswers.length<3;i++) {
    var addKanji = r(masterList,1,kanjiList.length);
    var wrongKanji = addKanji[subject][Math.floor(Math.random() * addKanji[subject].length)]
    if(currentKanji.Kanji !== addKanji.Kanji && addKanji[subject][0] !== '-' && addKanji[subject][0] !== '' && nonAnswers.indexOf(wrongKanji) === -1) {
      i+
      otherAnswers.push(wrongKanji);
    };
  };

  // Shuffle the list of choices (including the correct one) and assign them to the choice elements
  // Function to shuffle an array in place
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const choices = [correctAnswer, ...otherAnswers];
  shuffleArray(choices);
  for (let i = 0; i < choiceElems.length; i++) {
    choiceElems[i].textContent = choices[i];
  }

  // Set all kanji elements to display the current kanji character and create expansion function
  questKanji.textContent = currentKanji.Kanji;
  resultKanji.textContent = currentKanji.Kanji;

  //Question Counter
  questMax.textContent = userQuestions;
  questCurrent.innerHTML = questionCounter;
  questionCounter += 1;

  //Add question to results list
  finalList.push(currentKanji.Kanji.toString());
  finalListKanji.push(currentKanji.Kanji.toString());
  finalList.push(correctAnswer);

}

//Final results function
function constFinal(){
  for (let i=0;i<finalList.length/3; i++){
    //Create list element
    const listItem = document.createElement('li');

      //Create div within list
      const listDiv = document.createElement('div');
      
        //Create span element within div
        const divSpan = document.createElement('span');
        divSpan.innerHTML = (i+1).toString();
        listDiv.appendChild(divSpan);

        //Create div indicator within div
        const divDiv = document.createElement('div');
        listDiv.appendChild(divDiv);
      listItem.appendChild(listDiv);

      //Create span within list; this is where the Kanji character is created
      const listSpan = document.createElement('span');
      finalKanjiId = "finalKanji"+i;
      listSpan.id=finalKanjiId;
      listSpan.innerHTML = finalList[i*3];
      listItem.appendChild(listSpan); 

      

      //Create p within list
      const listP = document.createElement('p');
  
    if(finalList[(i*3)+1]===finalList[(i*3)+2]){
      //String if correct
      var pString = finalList[(i*3)+1];
      listP.style.fontSize = "100%";
      listP.style.alignItems = "center";
      listP.style.textAlign = "center";

      //Color
      divDiv.style.backgroundColor = "green";
    } else{
      //String if incorrect
      var pString = "Selected: " + finalList[(i*3)+2] + "<br>" + "Correct: " +  finalList[(i*3)+1];
      listP.style.fontSize = "70%";
      listP.style.alignItems = "top";
      listP.style.textAlign = "left";
      
      //Color
      divDiv.style.backgroundColor = "red";
    };

    listP.innerHTML = pString;
    listItem.appendChild(listP);

    finalResults.appendChild(listItem);

    say(i);
  };
};
//Navigation---------------------------------------------------------------------------------------------------
// Request to keep the screen on
function requestKeepScreenOn() {
  var power = navigator.power;

  if (power) {
    power.request("SCREEN", "SCREEN_NORMAL");
  }
}

// Release the screen on request
function releaseKeepScreenOn() {
  var power = navigator.power;

  if (power) {
    power.release("SCREEN");
  }
}
//Button Actions---------------------------------------------------------------------------------------------------
////Go back to most recent page
document.addEventListener('tizenhwkey', function(e) {
  if (e.keyName === 'back') {
    back();
  }
});

//Menu---------------------------------------------------------------------------------------------------
////Begin new session
homeNew.addEventListener("click", () => {
  finalResults.innerHTML = '';
  finalList = [];
  finalListKanji = [];
  questionCounter=1
  displayOff(home);
  displayOn(homeCon);
  displayOn(question);
  populateChoices();
  ////Continue session
  homeCon.addEventListener("click", () => {
    displayOff(home);
    displayOn(question);
  });
});

homeBook.addEventListener("click", () => {
  displayOff(home);
  displayOn(dictionary);
});

homeSet.addEventListener("click", () => {
  displayOff(home);
  displayOn(settings);
});

////Dictionary Kanji---------------------------------------------------------------------------------------------------
dictTitle.addEventListener("click", () => {
  displayOff(dictionary);
  displayOn(home);
});


////Settings---------------------------------------------------------------------------------------------------
settTitle.addEventListener("click", () => {
  displayOff(settings);
  displayOn(home);
});

settRestore.addEventListener("click", () => {
  //Set settings back to default and then read it
  dataRestore();

  //Read HTML content and update local storage
  dataLoad();

  //Update HTML content to match local storage
  defQuestions();
  defSubjects();
  defDifficulty();
  
  //Read HTML content and set variables for app
  readQuestions();
  readSubjects();
  readDifficulty();

  say("Restored Default Settings");
  say("Number of Questions: " + userQuestions + "\nSubjects: " + userSubjects + "\nDifficulty: " + userDifficulty);
});

settReset.addEventListener("click", () => {
  dataReset();
  say("Reset All Data");
});

//Save Settings function
settSave.addEventListener('click', () => {
  //Read HTML content and set variables for app
  readQuestions();
  readSubjects();
  readDifficulty();

  //Read HTML content and update local storage
  dataLoad();

  say("Saved!");
  say("Number of Questions: " + userQuestions + "\nSubjects: " + userSubjects + "\nDifficulty: " + userDifficulty);
});

//Question---------------------------------------------------------------------------------------------------
////Expand Kanji character on click.
questKanji.addEventListener("click", () => {
  constructDef(questKanji.textContent,0);
  displayOff(question);
  displayOn(definition);
});

//Declare what happens when an answer is selected.
for (let i = 0; i < choiceElems.length; i++) {
  choiceElems[i].addEventListener('click', () => {
    displayOff(question);
    displayOn(result);
    finalList.push(choiceElems[i].outerText);
    //If correct:
    if (choiceElems[i].textContent === correctAnswer) {
      //Display correct result screen
      resulttext.textContent = 'Correct!';
      resultDesc.innerHTML = "Your Answer: " + finalList[(questionCounter-2)*3+1];

    //If incorrect:
    } else {
      //Display incorrect result screen
      resulttext.textContent = 'Incorrect!';
      resultDesc.innerHTML = "Correct Answer: " + finalList[(questionCounter-2)*3+1] + "<br>Your Answer: " + finalList[(questionCounter-2)*3+2];
    }
    
  });
}

////Return home
homeBtn.addEventListener('click', () => {
  displayOff(question);
  displayOn(home);
});

////Save to bookmark
bookBtn.addEventListener('click', () => {
  if (bookIcon.src.includes("bookmark.svg")){
    bookIcon.src = "./img/bookmark_off.svg"
  } else {
    bookIcon.src = "./img/bookmark.svg"
  };
});

////Move on to next question
nextBtn.addEventListener('click', () => {
  //Adjust counter list if skip is used
  questionCounter+=-1;
  finalList.pop();
  finalList.pop();

  populateChoices();
});

//Result---------------------------------------------------------------------------------------------------
////Expand Kanji character on click.
resultKanji.addEventListener("click", () => {
  constructDef(questKanji.textContent);
  displayOff(result);
  displayOn(definition);
});
resultBtn.addEventListener('click', () => {
  //Check counter
  if (questionCounter===Number(userQuestions)+1){
    constFinal();

    //Construct definitions for final screen
    function constFinalDef(){
      for(let i=0;i<Number(userQuestions);i++){
        document.getElementById('finalKanji'+i).addEventListener("click", () => {
          constructDef(document.getElementById('finalKanji'+i).textContent);
          displayOff(final);
          displayOn(definition);
        });
      }
    }
    constFinalDef()
    displayOff(result);
    displayOn(final);
  } else {
    populateChoices();
    displayOff(result);
    displayOn(question);
  };
  
});

//Final---------------------------------------------------------------------------------------------------
finalBtn.addEventListener("click", () => {
  displayOff(final);
  displayOff(homeCon);
  displayOn(home);
});
finalTabSummary.addEventListener("click", () => {
  displayOn(finalSummary);
  finalTabSummary.className="final-tab accent"

  displayOff(finalQuestions);
  finalTabQuestions.className="final-tab"
});
finalTabQuestions.addEventListener("click", () => {
  displayOn(finalQuestions);
  finalTabQuestions.className="final-tab accent"
  
  displayOff(finalSummary);
  finalTabSummary.className="final-tab"
});