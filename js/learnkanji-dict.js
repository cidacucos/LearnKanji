//Create return option from definition
definition.addEventListener("click", () =>  {
    
    back();
});

//Construct kanji definition
function constructDef(element,check){
    const index = kanjiList.indexOf(element)
    const indexFix = (index+1).toString().padStart(4, '0');
    
    //Add and construct text for definition
    defIndex.textContent = "|"+indexFix+"|";
    defKanji.textContent = element;
    if(question.style.display !== 'flex') {
        defBody.style.borderTop = "1px solid rgb(177, 177, 177)";
        defEng.textContent = "English: " + defList[index].English.join(", ") + "。";
        defOny.textContent = "Onyomi: " + defList[index].Onyomi.join(", ") + "。";
        defKun.textContent = "Kunyomi: " + defList[index].Kunyomi.join(", ") + "。";
    } else {
        defBody.style.borderTop = "none";
        defEng.textContent = "";
        defOny.textContent = "";
        defKun.textContent = "";
    };
    
    
};

//Construct dictionary containing all Kanji
function constructDict(){
    kanjiList.forEach(function(element) {
        const listItem = document.createElement('li');
        const index = (kanjiList.indexOf(element)+1).toString().padStart(4, '0');
        listItem.innerText = index + " " + element;
        
        //Create click action to open definition
        listItem.addEventListener("click", () => {
            constructDef(element);
            displayOff(dictionary);
            displayOn(definition);
        });

        //Append to dictionary list
        dictList.appendChild(listItem);
    });
};

