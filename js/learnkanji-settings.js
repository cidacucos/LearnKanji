//Quiz Settings ---------------------------------------------------------------------------------------------------
//Number of Questions ---------------------------------------------------------------------------------------------------
////Update input with user data
function defQuestions(){
  inputQuestions.value = userQuestions;
};

////Update user data with input
function readQuestions(){
  set("settQuestions",inputQuestions.value);
};


//Subject ---------------------------------------------------------------------------------------------------
//// Dropdown button for subject
settSubjectBtn.addEventListener('click', () => {
  if(settSubjectContent.style.display === 'block') {
    settSubjectContent.style.display = 'none';
  } else {
    settSubjectContent.style.display = 'block';
  }
  
});

////Update input with user data
function createSubjects(keys){
  keys.forEach((key) => {
    //Construct label and checkbox element
    const newLabel = document.createElement('label');
    const newCheck = document.createElement('input');
    const newText = document.createTextNode(key);
    newLabel.id ="sett-subject-"+key;
    newCheck.className='sett-value-subject';
    newCheck.type='checkbox';
    newCheck.name=key;
    //If defaulted set to true
    if(userSubjects.includes(key)){
      newCheck.checked=true;
    };
    
    //Append new items to dropdown
    settSubjectContent.appendChild(newLabel);
    newLabel.appendChild(newCheck);
    newLabel.appendChild(newText);   
  });
};

function defSubjects(){
  const labels = settSubjectContent.querySelectorAll('label');
    labels.forEach(label => {
      const checkbox = label.querySelector('input');
      checkbox.checked=false;
      if(userSubjects.includes(checkbox.name)){
        checkbox.checked=true;
      };
    });
};

////Update user data with input
function readSubjects(){
  userSubjects = [];
  say(userSubjects);
  blackList = [];
  const subjectCheckbox = qs('.sett-value-subject');
  subjectCheckbox.forEach((element) => {
    if (element.checked) {
      userSubjects.push(element.name);
    } else {
      blackList.push(element.name);
    };
  });
  userSubjects.sort();
  set("settSubjects",userSubjects);
};


//Difficulty ---------------------------------------------------------------------------------------------------
//// Ranges for pre-defined difficulties
let kanjiMin;
let KanjiMax;
function settDifficulty(){
  const diff = inputDifficulty.value
  function r(min,max){
    kanjiMin=min;
    kanjiMax=max;
  };
  if (diff==="all"){
    r(1,2328);
  } if (diff==="beginner"){
    r(1,50);
  } if (diff==="novice"){
    r(51,150);
  } if (diff==="intermediate"){
    r(151,500);
  } if (diff==="advanced"){
    r(501,1000);
  } if (diff==="expert"){
    r(1001,2328);
  } if (diff==="custom"){
    const strElement = toString(diff);
    const rangeArr = strElement.split("-");
    r(parseInt(rangeArr[0]),parseInt(rangeArr[1]));
  };
};

//// Read custom option 
function showOther() {
  var difficulty = document.getElementById("sett-difficulty");
  var other = document.getElementById("custom");
  if (difficulty.value == "custom") {
    other.style.display = "block";
  } else {
    other.style.display = "none";
  }
};

////Update input with user data
function defDifficulty(){
  inputDifficulty.value = userDifficulty;
  settDifficulty();
};

////Update user data with input
function readDifficulty() {
  set("settDifficulty",inputDifficulty.value);
  settDifficulty();
};


