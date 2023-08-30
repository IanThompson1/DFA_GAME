//html stuff
startGameButton.addEventListener('click', function () {
    if(+maxString.value >= +minString.value){
        minLength = minString.value;
        maxLength = maxString.value;
    }else{
        minLength = maxString.value;
        maxLength = minString.value;
    }
    
    nextDFA();
    drawAll();
    //@ts-ignore
    mainMenu.style.display = "none";
});


easy.addEventListener('click', function () {
    difficulty = 1;
    resetButtons();
    //@ts-ignore
    easy.style.backgroundColor = "red";
});
medium.addEventListener('click', function () {
    difficulty = 2;
    resetButtons();
    //@ts-ignore
    medium.style.backgroundColor = "red";
});
hard.addEventListener('click', function () {
    difficulty = 3;
    resetButtons();
    //@ts-ignore
    hard.style.backgroundColor = "red";
});

//reset color function
function resetButtons() {
    easy.style.backgroundColor = "blue";
    //@ts-ignore
    medium.style.backgroundColor = "blue";
    //@ts-ignore
    hard.style.backgroundColor = "blue";
}