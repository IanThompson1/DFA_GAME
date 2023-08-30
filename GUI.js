var count = 0;
function drawAll(){
    if(gameover == 1){
        //background 
        c.fillStyle = "#2BB9FF";
        c.fillRect(0,0,canvas.width,canvas.height);
        //draw score
        var scoreText = "final score: "+currentScore+"/"+rounds;
        addText(scoreText, canvas.width*(5/10), canvas.height*(4/10), "black", 1);

        var scoreText = "Time: "+ totaltimes+"."+totaltimeds+"s";
        addText(scoreText, canvas.width*(5/10), canvas.height*(2/10), "black", 1); 

    }else{
        var interval = setInterval(() => {
            //background 
            c.fillStyle = "#2BB9FF";
            c.fillRect(0,0,canvas.width,canvas.height);
            count++;
            //draw DFA
            switch(difficulty){
                case 1:
                    source = "easy";
                    break;
                case 2:
                    source = "medium";
                    break;
                case 3: 
                    source = "hard";
                    break;
            }
            var imgsrc = "./img/"+source+currentDFA+".png"
            var DFAImage = new Image();
            DFAImage.src = imgsrc;
            c.drawImage(DFAImage, (canvas.width/2) - (DFAImage.width/2), (canvas.height/2)-(DFAImage.height/2));

            //draw input string
            var testText = "Input: "+testString;
            addText(testText, canvas.width/2, canvas.height/10, "black", 1);

            //draw score
            var scoreText = ""+currentScore+"/"+rounds;
            addText(scoreText, canvas.width*(9/10), canvas.height/10, "black", 1);

            //time
            var scoreText = "Time: "+ totaltimes+"."+totaltimeds+"s";
            addText(scoreText, canvas.width*(8.5/10), canvas.height*(2/10), "black", 1);  

            //draw accept/reject buttons
            c.fillStyle = "green";
            c.fillRect(canvas.width*(3/10), canvas.height*(7/10),canvas.width*(1/10),canvas.height*(3/10));
            addText("Accept",canvas.width*(3/10)+canvas.width*(1/20), canvas.height*(7/10)+canvas.height*(1/10),"black",0.5);
            
            c.fillStyle = "red";
            c.fillRect(canvas.width*(6/10), canvas.height*(7/10),canvas.width*(1/10),canvas.height*(3/10));
            addText("Reject",canvas.width*(6/10)+canvas.width*(1/20), canvas.height*(7/10)+canvas.height*(1/10),"black",0.5);
            if(count > 0){
                clearInterval(interval);
            }
        }, 10); //flash delay
    }
}


function addText(text, x, y, color, growth) {
    if(size === void 0) { size = 1; }
    c.fillStyle = color;
    c.textAlign = "center";
    var size = (77 - text.length) * growth;
    var font = size + "px serif";
    c.font = font;
    c.fillText(text, x, y);
    c.stroke();
}