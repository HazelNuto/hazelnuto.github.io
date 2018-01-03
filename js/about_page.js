/* ------------------ About Page ---------------------*/

var ab_scale = 1.0, ab_alpha = 1.0;
var ab_backAppear = op_coordi[22] - 50, ab_back = true;

function drawAbBack() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = ab_alpha;
    context.drawImage(main_background, 0, 0, main_background.width, main_background.height, canvas.width * (1.0 - ab_scale), canvas.height * (1.0 - ab_scale), canvas.width * ab_scale, canvas.height * ab_scale);
    context.globalAlpha = 1.0;
    context.font = 10 + 'px Arial';
    context.fillStyle = 'grey';
    context.fillText("All Copyright Reserved @2017 HazelNut", 400, 590);
}

function animateAbScale() {
    if(ab_scale < MAX_SIZE) {
        drawAbFrame();
        timer = requestAnimationFrame(animateAbScale);
    }else {
        drawAbBack();
        outputAbout();
        cancelAnimationFrame(timer); 
    }
}

function drawAbFrame() {
    ab_scale += cutStep;
    ab_alpha -= cutStep;
    drawAbBack();
}

function animateAbReturn() {
    if(ab_scale > 1.0) {
        abReturnMain();
        timer = requestAnimationFrame(animateAbReturn);
    }else {
        updating = true;
        drawMainBack();
        for(var i=0; i<4; i++) {
            drawMainButton(i, 0.5, 150, 355);
        }
        cancelAnimationFrame(timer); 
    }
}

function abReturnMain() {
    ab_scale -= cutStep;
    ab_alpha += cutStep;
    drawAbBack();
}

function animateAbSakura() {
    if(ab_backAppear < SakuraMax) {
        drawAbSakura();
        timer = requestAnimationFrame(animateAbSakura);
    }else {
        cancelAnimationFrame(timer);
    }
}

function drawAbSakura() {
    ab_backAppear += SakuraStep;
    drawAbBack();
    outputAbout();
    context.drawImage(eleSakura, ab_backAppear, op_coordi[23] - 30, 30, 30);
}

function outputAbout() {
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
    context.fillText("About the Game", 310, 80);
    /* Text */
    context.font = 20 + 'px Papyrus';
    context.fillText("The Touhou Project is a series of Japanese bullet hell shooter video games developed by the", 100, 150);
    context.fillText("single-person Team Shanghai Alice.", 60, 180);
    context.fillStyle = 'rgb(10, 100, 95)';
    context.fillText("[Professional interpretation]", 380, 180);
    context.fillStyle = 'rgb(5, 20, 27)';
    context.fillText("I used the background of this game and combined it with a new chess rule to create my own", 100, 220);
    context.fillText("game. It's an indie game made by me alone, as its structure and materials are all conceived and made", 60, 250);
    context.fillText("by myself. I hope that you will enjoy it.", 60, 280);
    context.fillText("If you want to get more Information about Touhou:", 60, 320);
    context.fillStyle = 'rgb(10, 100, 95)';
    context.fillText("http://thwiki.cc", 100, 350);
    context.fillStyle = 'rgb(5, 20, 27)';
    context.fillText("Progress of coding has been posted on my own blog:", 60, 380);
    context.fillStyle = 'rgb(10, 100, 95)';
    context.fillText("http://www.cnblogs.com/HazelNut/", 100, 410);
    context.fillStyle = 'rgb(5, 20, 27)';
    context.fillText("If you want to send me an Email: shiraihazel@163.com", 60, 440);
}

function drawAbPage() {
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(animateAbScale);
}
