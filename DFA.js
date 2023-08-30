"use strict";
// exports.__esModule = true;
var canvas = document.querySelector("canvas");
//@ts-ignore
var c = canvas.getContext("2d");
//html buttons
var easy = document.querySelector('#EasyDFA');
var medium = document.querySelector('#MediumDFA');
var hard = document.querySelector('#HardDFA');
var minString = document.querySelector('#minStringLength');
var maxString = document.querySelector('#maxStringLength');
var mainMenu = document.querySelector('#mainMen');
var startGameButton = document.querySelector('#startGameBtn');
//@ts-ignore
canvas.width = innerWidth;
//@ts-ignore 
canvas.height = innerHeight;
//@ts-ignore
var scaleH = canvas.height / 890;
//@ts-ignore
var scaleW = canvas.width / 1920;
var mouseX = 0;
var mouseY = 0;
var difficulty = 1; // 1 is easy 2 is medium 3 is hard
var minLength = 1;
var maxLength = 1;
var testString = "a";
var screenTest = 1;
var currentScore = 0;
var rounds = 0;
var currentDFA = 0;
var image = "";
var source = "";
var flashcol= "s";
var started = 0;
var gameover = 0;
var totaltimes = 0;
var totaltimeds = 0;
// to do 
// add more DFA's 

function nextDFA() {
    if(rounds >= 10){
        gameover = 1;
    }
    testString = generateString();
    currentDFA = Math.floor(Math.random()*2)+1;
    source = "./img/"+source+currentDFA+".png";
    console.log("this string accepts? ",doesAccept());
    console.log("diff=%d, DFA=%d",difficulty,currentDFA);
    
}

function drawing(){
    var enddraw = setInterval(() => {
        drawAll();
        if(gameover == 1){
            clearInterval(enddraw);
        }
    }, 100);
}

function timer(){
    var endtimer = setInterval(() => {
        totaltimeds += 1;
        if(totaltimeds >= 10){
            totaltimeds = 0;
            totaltimes += 1;
        }
        if(gameover == 1){
            clearInterval(endtimer);
        }
    }, 100);
}

function play(){
    var audio = new Audio('disco-groove.mp3');
    audio.play();
    timer();
}

addEventListener("click", () => {
    if(gameover == 1){
        return;
    }
    //start first animation
    if(started == 0){
        drawing();
        started = 1;
    }
    // check if in accept/reject position
    if(screenTest != 1){
        return;
    }
    if(mouseX > canvas.width*(3/10) && mouseX < canvas.width*(4/10) && mouseY > canvas.height*(7/10)){
        //accept button pressed
        calcScore("accept");
        rounds ++;
        nextDFA();
    }else if(mouseX > canvas.width*(6/10) && mouseX < canvas.width*(7/10) && mouseY > canvas.height*(7/10)){
        //reject button pressed
        calcScore("reject");
        rounds ++;
        nextDFA();
    }
});

function calcScore(accept){
    if(accept == "accept" && doesAccept() == true){
        currentScore++;
        flashcol="green";
    }else if(accept == "reject" && doesAccept() == false){
        currentScore++;
        flashcol="green";
    }else{
        flashcol="red";
    }
}


function doesAccept(){
    if(difficulty == 1 && currentDFA == 1){//first DFA
        return false;
    }else if(difficulty == 1 && currentDFA == 2){//even b's DFA
        var num_b=0;
        for(var i=0; i<testString.length; i++){
            if(testString[i] == "b"){
                num_b++;
            }
        }
        if(num_b %2 == 0){
            return true;
        }
    }else if(difficulty == 2 && currentDFA == 1){//starts with a ends with b
        if(testString[0] == "a" && testString[testString.length-1] == "b"){
            return true;
        }
    }else if(difficulty == 2 && currentDFA == 2){//contains aba substring
        var curState = 0;
        for(var i=0; i<testString.length; i++){
            switch(curState){
                case 0:
                    if(testString[i] == "a"){
                        curState = 1;
                    }else{
                        curState = 0;
                    }
                    break;
                case 1:
                    if(testString[i] == "a"){
                        curState = 1;
                    }else{
                        curState = 2
                    }
                    break;
                case 2:
                    if(testString[i] == "a"){
                        curState = 3;
                    }else{
                        curState = 0;
                    }
                    break;
                case 3:
                    if(testString[i] == "a"){
                        curState = 3;
                    }else{
                        curState = 3;
                    }
                    break;
            }
        }
        if(curState == 3){
            return true;
        }
    }else if(difficulty == 3 && currentDFA == 1){//hard DFA 1
        var curState = 1;
        for(var i=0; i<testString.length; i++){
            switch(curState){
                case 1:
                    if(testString[i] == "a"){
                        curState = 3;
                    }else{
                        curState = 2;
                    }
                    break;
                case 2:
                    if(testString[i] == "a"){
                        curState = 1;
                    }else{
                        curState = 2;
                    }
                    break;
                case 3:
                    if(testString[i] == "a"){
                        curState = 5;
                    }else{
                        curState = 4;
                    }
                    break;
                case 4:
                    if(testString[i] == "a"){
                        curState = 5;
                    }else{
                        curState = 6;
                    }
                    break;
                case 5:
                    if(testString[i] == "a"){
                        curState = 2;
                    }else{
                        curState = 5;
                    }
                    break;
                case 6:
                    if(testString[i] == "a"){
                        curState = 6;
                    }else{
                        curState = 4;
                    }
                    break;
            }
        }
        if(curState == 1 || curState == 4 || curState == 5){
            return true;
        }
    }else if(difficulty == 3 && currentDFA == 2){//hard DFA 2
        var curState = 0;
        for(var i=0; i<testString.length; i++){
            switch(curState){
                case 0:
                    if(testString[i] == "a"){
                        curState = 1;
                    }else{
                        curState = 0;
                    }
                    break;
                case 1:
                    if(testString[i] == "a"){
                        curState = 2;
                    }else{
                        curState = 1;
                    }
                    break;
                case 2:
                    if(testString[i] == "a"){
                        curState = 3;
                    }else{
                        curState = 5;
                    }
                    break;
                case 3:
                    if(testString[i] == "a"){
                        curState = 5;
                    }else{
                        curState = 4;
                    }
                    break;
                case 4:
                    if(testString[i] == "a"){
                        curState = 4;
                    }else{
                        curState = 5;
                    }
                    break;
                case 5:
                    if(testString[i] == "a"){
                        curState = 0;
                    }else{
                        curState = 6;
                    }
                    break;
                case 6:
                    if(testString[i] == "a"){
                        curState = 0;
                    }else{
                        curState = 2;
                    }
                    break;
            }
        }
        if(curState == 0 || curState == 2 || curState == 4){
            return true;
        }
    }
    return false; //default case
}




function generateString() {
    var randRange = Math.floor(Math.random() * (+maxLength - +minLength + 1));
    var stringLength = +minLength+ +randRange;
    //generates string
    var output = "";
    for (var i = 0; i < stringLength; i++) {
        if (Math.floor(Math.random() * 2) % 2 == 0) {
            output += 'b';
        }
        else {
            output += 'a';
        }
    }
    console.log("str %s", output);
    return output;
}
//updates mouse position when moved
onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
};



//creates a random DFA 
function newDFA(){
    var states = Math.floor(Math.random() * 3) + 4;
    var transitions = [[]];
}