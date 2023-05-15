//Create return option from definition
definition.addEventListener("click", () =>  {
    
    back();
});

//Construct kanji definition
function constructDef(element){
    const index = kanjiList.indexOf(element)
    const indexFix = (index+1).toString().padStart(4, '0');
    
    //Add and construct text for definition
    defIndex.textContent = "|"+indexFix+"|";
    defKanji.textContent = element;
    //If generated during quiz question
    if(question.style.display !== 'flex') {
        //Visual tweaks//
        definition.style.overflowx = "hidden";
        definition.style.overflowy = "scroll";
        defKeyword.textContent = defList[index].Keyword[0];
        defArrow.style.display = "block";
        defBody.style.display = "block";
        defBody.style.borderTop = "1px solid rgb(177, 177, 177)";      

        //Text tweaks//
        //Core definition
        defEng.textContent = "↳ " + defList[index].English.join(", ") + "。";
        defOny.textContent = "↳ " + defList[index].Onyomi.join(", ") + "。";
        defKun.textContent = "↳ " + defList[index].Kunyomi.join(", ") + "。";

        //Vocabulary Examples
        if(defList[index].Ex1Kanji[0] != ""){
            defEx1.innerHTML = defList[index].Ex1Kanji[0] + "(" + defList[index].Ex1Kana[0] + ")<br>↳ " + defList[index].Ex1English[0];
        }
        else{
            defEx1.innerHTML = "";
        }
        if(defList[index].Ex2Kanji[0] != ""){
            defEx2.innerHTML = defList[index].Ex2Kanji[0] + "(" + defList[index].Ex2Kana[0] + ")<br>↳ " + defList[index].Ex2English[0];
        }
        else{
            defEx2.innerHTML = "";
        }
        if(defList[index].Ex3Kanji[0] != ""){
            defEx3.innerHTML = defList[index].Ex3Kanji[0] + "(" + defList[index].Ex3Kana[0] + ")<br>↳ " + defList[index].Ex3English[0];
        }
        else{
            defEx3.innerHTML = "";
        }
        if(defList[index].Ex4Kanji[0] != ""){
            defEx4.innerHTML = defList[index].Ex4Kanji[0] + "(" + defList[index].Ex4Kana[0] + ")<br>↳ " + defList[index].Ex4English[0];
        }
        else{
            defEx4.innerHTML = "";
        }
        //Kanji Descriptions
        if(defList[index].Origin[0] != ""){
            defOrigin.textContent = defList[index].Origin[0];
        } else {
            defOrigin.textContent = "None";
        }
        if(defList[index].Mnemonic1[0] != ""){
            defMnemonic1.textContent = '"' +  defList[index].Mnemonic1[0] + '"';
        } else {
            defMnemonic1.textContent = "None";
        }
        if(defList[index].Mnemonic1[0] != ""){
            defMnemonic2.textContent = '"' + defList[index].Mnemonic2[0] + '"';
        } else {
            defMnemonic2.textContent = "None";
        }
        
    //If generated outside of quiz question
    } else {
        //Visual tweaks
        definition.style.overflowx = "hidden";
        definition.style.overflowy = "hidden";
        defArrow.style.display = "none";
        defBody.style.display = "none";
        defBody.style.borderTop = "none";

        //Text tweaks
        defKeyword.textContent = "";
        defEng.textContent = "";
        defOny.textContent = "";
        defKun.textContent = "";
        defOrigin.textContent = "";
        defMnemonic1.textContent = "";
        defMnemonic2.textContent = "";
    };  
};

//Construct dictionary containing all Kanji
function constructDict(){
    kanjiList.forEach(function(element) {
        //Create list element
        const listItem = document.createElement('li');
        //Ensure index contains leading zeroes
        const index = (kanjiList.indexOf(element)+1).toString().padStart(4, '0');

        //Tweak list element properties
        listItem.id = "kanji" + index;
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

