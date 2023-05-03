//Set local storage functions
function say(e) {
    console.log(e);
  };

function set(key,value){
    localStorage.setItem(key,value);
};

function get(key){
    return localStorage.getItem(key);
};

function add(key,addValue){
    var value = localStorage.getItem(key);
    value += addValue;
    localStorage.setItem(key,value);
};


//Default

//Restore Defaults
function dataRestore(){
    set("firstLaunch",1);

    //Quiz settings
    set("settQuestions",20);
    set("settSubjects",["English","Onyomi","Kunyomi"]);
    set("settDifficulty","beginner");
};

if(get("firstLaunch") === null){
    dataRestore();
};

//Load data on launch
function dataLoad(){
    userQuestions = get("settQuestions");
    userSubjects = get("settSubjects").split(',');
    userDifficulty = get("settDifficulty");
};
dataLoad();

//Reset Data
function dataReset(){
    localStorage.clear();
};


/*{
    "users": [
        {
        "id": 1,
        "username": "Caleb",
        "start_date":0,
        "activities":0,
        "questions":0,
        "correct":0,
        "wrong":0,
        "bookmarks":0
        }
    ],
    "bookmarks":[
        {
        "index":0,
        "success":0,
        "failure":0      
        }
    ],
    "settings": [
        {
        "settQuestions":20,
        "settSubject":["English","Kunyomi","Onyomi"],
        "settDifficulty":"all"
        }
    ],
    "default-users": [
        {
        "id": 1,
        "username": "User",
        "start_date":0,
        "activities":0,
        "questions":0,
        "correct":0,
        "wrong":0,
        "bookmarks":0
        }
    ],
    "default-bookmarks":[
        {
        "index":0,
        "success":0,
        "failure":0      
        }
    ],
    "default-settings": [
        {
        "settQuestions":20,
        "settSubject":["English","Kunyomi","Onyomi"],
        "settDifficulty":"beginner"
        }
    ]
}*/