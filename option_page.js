/* ------------------ Options Page ---------------------*/

var op_scale = 1.0, op_alpha = 1.0;
var op_selectTXT = ["MUSIC:", "ON", "OFF", "SCALE:", "5 * 5", "10 * 10", "20 * 20", "DIFFICULTY:", "EASY", "MID", "HARD", "Back To Main Menu"];
var op_coordi = [140, 200, 390, 200, 520, 200, 140, 300, 370, 300, 530, 300, 740, 300, 140, 400, 485, 400, 640, 400, 780, 400, 750, 580];
var op_seleMusic = 1, op_seleScale = 5, op_seleDiff = 8;
var op_backAppear = op_coordi[22] - 50, op_back = true;

/********************* Function **********************/
function drawOpBack() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = op_alpha;
    context.drawImage(main_background, 0, 0, canvas.width * op_scale, canvas.height * op_scale);
    context.globalAlpha = 1.0;
    context.font = 10 + 'px Arial';
    context.fillStyle = 'grey';
    context.fillText("All Copyright Reserved @2017 HazelNut", 400, 590);
}

function animateOpScale() {
    if(op_scale < MAX_SIZE) {
        drawOpFrame();
        timer = requestAnimationFrame(animateOpScale);
    }else {
        drawOpBack();
        updateOpPage(-1);
        cancelAnimationFrame(timer); 
    }
}

function drawOpFrame() {
    op_scale += cutStep;
    op_alpha -= cutStep;
    drawOpBack();
}

function animateOpReturn() {
    if(op_scale > 1.0) {
        opReturnMain();
        timer = requestAnimationFrame(animateOpReturn);
    }else {
        updating = true;
        drawMainBack();
        for(var i=0; i<4; i++) {
            drawMainButton(i, 0.5, 150, 355);
        }
        cancelAnimationFrame(timer); 
    }
}

function opReturnMain() {
    op_scale -= cutStep;
    op_alpha += cutStep;
    drawOpBack();
}

function animateOpSakura() {
    if(op_backAppear < SakuraMax) {
        drawOpSakura();
        timer = requestAnimationFrame(animateOpSakura);
    }else {
        cancelAnimationFrame(timer);
    }
}

function drawOpSakura() {
    op_backAppear += SakuraStep;
    updateOpPage(-1);
    context.globalAlpha = 0.6;
    context.drawImage(eleSakura, op_backAppear, op_coordi[23] - 30, 30, 30);
    context.globalAlpha = 1.0;
}

function outputOptions(Index, ques, moveon, selected, back) {
    var empha = false;
    if(moveon) empha = true;
    if(selected) {
        empha = true;
        context.drawImage(eleSakura, op_coordi[Index * 2] - 20, op_coordi[Index * 2 + 1] - 30, 50, 50);
    }
    if(ques) empha = true;
    if(empha) context.font = 53 + 'px Letter Gothic Std bord';
    else context.font = 47 + 'px Letter Gothic Std bord';
    if(back) {
        context.font = 30 + 'px Giddyup Std';

    }
    context.beginPath();
    context.fillStyle = 'rgb(5, 20, 27)';
    if(empha) context.fillText(op_selectTXT[Index], op_coordi[Index * 2] - op_selectTXT[Index].length * 3 / 2, op_coordi[Index * 2 + 1]);
    else context.fillText(op_selectTXT[Index], op_coordi[Index * 2], op_coordi[Index * 2 + 1] - 3);
    context.closePath();   
}

function updateOpPage(Index) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawOpBack();
    for(var i=0; i<12; i++) {
        if(i === 0 || i === 3 || i === 7) {
            outputOptions(i, 1, 0, 0, 0);
        } else if(i === op_seleMusic || i === op_seleScale || i === op_seleDiff) {
            outputOptions(i, 0, 0, 1, 0);
        } else if(i === Index) {
            outputOptions(i, 0, 1, 0, 0);
        } else if(i === 11) {
            outputOptions(i, 0, 0, 0, 1);
        } else {
            outputOptions(i, 0, 0, 0, 0);
        }
    }
}

function drawOpPage() {
    /* draw Option background */
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawOpBack();
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(animateOpScale);
}