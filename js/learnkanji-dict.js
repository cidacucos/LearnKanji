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
    if(question.style.display !== 'flex') {
        //Show Elements if not in question
        defKeyword.textContent = defList[index].Keyword[0];
        defArrow.style.display = "block";
        defBody.style.display = "block";
        defBody.style.borderTop = "1px solid rgb(177, 177, 177)";      
        defEng.textContent = "↳ " + defList[index].English.join(", ") + "。";
        defOny.textContent = "↳ " + defList[index].Onyomi.join(", ") + "。";
        defKun.textContent = "↳ " + defList[index].Kunyomi.join(", ") + "。";

        defEx1.innerHTML = defList[index].Ex1Kanji[0] + "(" + defList[index].Ex1Kana[0] + ")<br>↳ " + defList[index].Ex1English[0];
        defEx2.innerHTML = defList[index].Ex2Kanji[0] + "(" + defList[index].Ex2Kana[0] + ")<br>↳ " + defList[index].Ex2English[0];
        defEx3.innerHTML = defList[index].Ex3Kanji[0] + "(" + defList[index].Ex3Kana[0] + ")<br>↳ " + defList[index].Ex3English[0];
        defEx4.innerHTML = defList[index].Ex4Kanji[0] + "(" + defList[index].Ex4Kana[0] + ")<br>↳ " + defList[index].Ex4English[0];

        defOrigin.textContent = defList[index].Origin[0];
        defMnemonic1.textContent = '"' +  defList[index].Mnemonic1[0] + '"';
        defMnemonic2.textContent = '"' + defList[index].Mnemonic2[0] + '"';
    } else {
        //Hide Elements if within question
        defArrow.style.display = "none";
        defBody.style.display = "none";
        defBody.style.borderTop = "none";
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

