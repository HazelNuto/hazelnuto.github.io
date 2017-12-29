var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    imageGOI = new Image(),
    imageBLOG = new Image(),
    photo = new Image();
photo.src = "testICN.png";
imageGOI.src = "Image/mainBack.jpeg";
imageBLOG.src = "Image/backSakura01.jpeg";

photo.onload = function(e) {
    outputProfile();
}

function outputProfile() {
    context.drawImage(photo, canvas.width / 2 - photo.width / 2, 20);
    context.font = 25 + "px litterlover";
    context.fillStyle = "lightCoral";
    context.fillText("HazelNut", canvas.width / 2 - "HazelNut".length * 10, 50 + photo.height);
    context.font = 10 + "px litterlover";
    context.fillText("from.  Hangzhou China", canvas.width / 2 - "from. Hangzhou China".length * 4, 80 + photo.height);
    context.fillText("touhou / MUG / ACMer", canvas.width / 2 - "touhou / MUG / ACMer".length * 4, 100 + photo.height);
    context.font = 10 + 'px Arial';
    context.fillStyle = 'grey';
    context.fillText("All Copyright Reserved @2017 HazelNut", 280, 990);
}

imageGOI.onload = function(e) {
    outputGOI(1.0, false);
}
imageBLOG.onload = function(e) {
    outputBLOG(1.0, false);
}

function outputGOI(alpha, selected) {
    context.globalAlpha = alpha;
    context.drawImage(imageGOI, 200, 0, imageGOI.height, imageGOI.height, 0, 300, 350, 350);
    context.globalAlpha = 1.0;
    context.fillStyle = "white";
    if(selected) {
        context.font = 30 + 'px Zapfino';
        context.fillStyle = "IndianRed";
        context.fillText("Enter", 120, 580);
    }
    context.font = 35 + 'px Zapfino';
    context.fillText("Getting over it", 15, 440);
    context.fillText("with Hazelnut", 25, 500);
}

function outputBLOG(alpha, selected) {
    context.globalAlpha = alpha;
    context.drawImage(imageBLOG, 0, 0, imageBLOG.width, imageBLOG.height, 350, 300, 350, 350);
    context.globalAlpha = 1.0;
    context.fillStyle = "white";
    if(selected) {
        context.font = 30 + 'px Zapfino';
        context.fillStyle = "IndianRed";
        context.fillText("Enter", 470, 580);
    }
    context.font = 35 + 'px Zapfino';
    context.fillText("Share music list", 365, 440);
    context.fillText("of myown", 440, 500);
}

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}
function drawICN(id) {
    if(id === -1) {
        outputGOI(1.0, false);
        outputBLOG(1.0, false);
    }else if(id === 0) {
        outputGOI(0.4, true);
        outputBLOG(1.0, false);
    }else if(id === 1) {
        outputGOI(1.0, false);
        outputBLOG(0.4, true);
    }
}

canvas.onmousemove = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    context.clearRect(0, 0, canvas.width, canvas.height);
    outputProfile();
    
    if(loc.x < 350 && loc.y > 300 && loc.y < 650) {
        canvas.style.cursor = "pointer";
        drawICN(0);
    }else if(loc.x > 350 && loc.y > 300 && loc.y < 650) {
        canvas.style.cursor = "pointer";
        drawICN(1);
    }else {
        canvas.style.cursor = "default";
        drawICN(-1);
    }
}

canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    if(loc.x < 350 && loc.y > 300 && loc.y < 650) {
        self.location = 'game.html';
    }else if(loc.x > 350 && loc.y > 300 && loc.y < 650) {
        self.location = 'music.html';
    }
}

