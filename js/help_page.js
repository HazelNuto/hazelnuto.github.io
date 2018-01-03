/* ------------------ Help Page ---------------------*/

var hp_scale = 1.0, hp_alpha = 1.0;
var hp_backAppear = op_coordi[22] - 50, hp_back = true;

function drawHpBack() { 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = hp_alpha;
    context.drawImage(main_background, 0, 0, main_background.width, main_background.height, 0, canvas.height * (1.0 - hp_scale), canvas.width * hp_scale, canvas.height * hp_scale);
    context.globalAlpha = 1.0;
    context.font = 10 + 'px Arial';
    context.fillStyle = 'grey';
    context.fillText("All Copyright Reserved @2017 HazelNut", 400, 590);
}

function animateHpScale() {
    if(hp_scale < MAX_SIZE) {
        drawHpFrame();
        timer = requestAnimationFrame(animateHpScale);
    }else {
        drawHpBack();
        outputHelp();
        cancelAnimationFrame(timer); 
    }
}

function drawHpFrame() {
    hp_scale += cutStep;
    hp_alpha -= cutStep;
    drawHpBack();
}

function animateHpReturn() {
    if(hp_scale > 1.0) {
        hpReturnMain();
        timer = requestAnimationFrame(animateHpReturn);
    }else {
        updating = true;
        drawMainBack();
        for(var i=0; i<4; i++) {
            drawMainButton(i, 0.5, 150, 355);
        }
        cancelAnimationFrame(timer); 
    }
}

function hpReturnMain() {
    hp_scale -= cutStep;
    hp_alpha += cutStep;
    drawHpBack();
}

function animateHpSakura() {
    if(hp_backAppear < SakuraMax) {
        drawHpSakura();
        timer = requestAnimationFrame(animateHpSakura);
    }else {
        cancelAnimationFrame(timer);
    }
}

function drawHpSakura() {
    hp_backAppear += SakuraStep;
    drawHpBack();
    outputHelp();
    context.drawImage(eleSakura, hp_backAppear, op_coordi[23] - 30, 30, 30);
}

function outputHelp() {
    outputOptions(11, 0, 0, 0, 1);
    /* BackRect */
    context.fillStyle = 'white';
    context.globalAlpha = 0.3;
    context.moveTo(70, 110);
    context.arcTo(960, 110, 960, 530, 30);
    context.arcTo(960, 530, 40, 530, 30);
    context.arcTo(40, 530, 40, 110, 30);
    context.arcTo(40, 110, 960, 110, 30);
    context.fill();
    context.globalAlpha = 1.0;
    /* Title */
    context.font = 40 + 'px Zapfino';
    context.fillStyle = 'rgb(5, 20, 27)';
    context.fillText("Rules and Tips", 310, 80);
    /* Text */
    context.font = 20 + 'px Papyrus';
    context.fillText("Player and computer take turns to play the game, and you will always make the first move.", 130, 150);
    context.fillText("During a move a player selects one of the active grids. Then depending on the type of chesspiece in", 60, 180);
    context.fillText("that grid, one of the following actions take place:", 60, 210);
    context.fillText("\"-\": Magical waves radiate from the grid to the left and to the right along horizontal paths. All", 110, 250);
    context.fillText("grids on the path of the waves (including the selected grid too) become inactive. The waves", 110, 280);
    context.fillText("continue until the next inactive grid or to the edge of the chessboard if there are no inactive", 110, 310);
    context.fillText("grids on the way.", 110, 340);
    context.fillText("\"|\": Magical waves radiate upwards and downwards.", 110, 380);
    context.fillText("\"+\": Magical waves radiate in all four directions.", 110, 420);
    context.fillText("The player who cannot make a move (that is to say, all the grids on the chessboard are ", 130, 460);
    context.fillText("inactive) will be the loser of this game.", 60, 490);
}

function drawHpPage() {
    cancelAnimationFrame(timer);
    timer = timer = requestAnimationFrame(animateHpScale);
}