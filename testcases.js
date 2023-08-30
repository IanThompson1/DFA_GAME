//test cases 
testString = "abbabab";
difficulty = 1;
currentDFA = 2;
console.log("Test case 1 should accept \n"+doesAccept());
testString = "a";
difficulty = 2;
currentDFA = 1;
console.log("Test case 2 should reject \n"+doesAccept());
testString = "aa";
difficulty = 3;
currentDFA = 2;
console.log("Test case 3 should accept \n"+doesAccept());