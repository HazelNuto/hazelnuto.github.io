/****************************************************
 * 加载完进度条
 * about改下改成介绍人工智能（process拼错了
 * 精灵 floating SAKURA
 * 鼠标移动到按键上颜色加深
 * 鼠标点击后波纹扩散整列
 * 棋盘背景随机 ， 毛玻璃效果
 * (太难写了：扩散状生成棋盘)
 * ┼
 * ─
 * │
 ****************************************************/

/* ------------------ Main Page ---------------------*/

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    backMusic = document.getElementById('music'),
    main_background = new Image(),
    main_title = new Image(),
    eleSakura = new Image(),
    backPattern = new Image(),
    boardBackground = [new Image(), new Image(), new Image()],
    INDEX = 0, boardSize = 10, errorRate = 1.0,
    cutStep = 0.03, MAX_SIZE = 1.35, 
    SakuraMax = 950, SakuraStep = 13,
    loading = 0;

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

var COLOR = ['LightSlateGray', 'lightblue', 'LightCyan', 'LightSteelBlue'],
    TEXT = ['Options', 'Play', 'Help', 'About'],
    timer, nowPointer = {},
    updating = true;
/********************* Function **********************/
function animateRedraw() {
    if(nowPointer.x > nowPointer.limit) {
        drawFrame();
        timer = requestAnimationFrame(animateRedraw);
    }else cancelAnimationFrame(timer); 
}

function drawFrame() {
    nowPointer.x -= nowPointer.step;
    nowPointer.alpha += 0.02;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMainBack();
    for(var i=0; i<4; i++) {
        if(i != nowPointer.index) {
            drawMainButton(i, 0.5, 150, 355);
        }
    }
    drawMainButton(nowPointer.index, nowPointer.alpha, nowPointer.x, nowPointer.y);
}

function drawMainButton(Index, Alpha, x, y) {
    context.beginPath();
    context.globalAlpha = Alpha;
    context.arc((Index & 1) * 200 + 150, Math.floor(Index / 2) * 150 + 350, 50, 0, 2 * Math.PI);
    context.fillStyle = COLOR[Index];
    context.fill();
    context.globalAlpha = 1.0;
    context.closePath();

    context.font = 20 + 'px Zapfino';
    context.fillStyle = 'white';
    context.fillText(TEXT[Index], (Index & 1) * 200 + x, Math.floor(Index / 2) * 150 + y);
}

function drawMainBack() {
    context.drawImage(main_background, 0, 0, canvas.width, canvas.height);
    context.drawImage(main_title, 625, 20, main_title.width, main_title.height);
    context.font = 10 + 'px Arial';
    context.fillStyle = 'grey';
    context.fillText("All Copyright Reserved @2017 HazelNut", 400, 590);
}

/********************** Events ***********************/
canvas.onmousemove = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    if(INDEX === 0) {
        if((loc.x - 150) * (loc.x - 150) + (loc.y - 350) * (loc.y - 350) <= 50 * 50) {
            canvas.style.cursor = 'pointer';

            if(updating) {
                nowPointer.index = 0;
                nowPointer.x = 150;
                nowPointer.y = 355;
                nowPointer.alpha = 0.5;
                nowPointer.step = (150 - 105) / 10;
                nowPointer.limit = 105;

                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animateRedraw);
            }

            updating = false;
        } else if((loc.x - 350) * (loc.x - 350) + (loc.y - 350) * (loc.y - 350) <= 50 * 50) {
            canvas.style.cursor = 'pointer';

            if(updating) {
                nowPointer.index = 1;
                nowPointer.x = 150;
                nowPointer.y = 355;
                nowPointer.alpha = 0.5;
                nowPointer.step = (150 - 124) / 10;
                nowPointer.limit = 124;

                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animateRedraw);
            }

            updating = false;
        } else if((loc.x - 150) * (loc.x - 150) + (loc.y - 500) * (loc.y - 500) <= 50 * 50) {
            canvas.style.cursor = 'pointer';

            if(updating) {
                nowPointer.index = 2;
                nowPointer.x = 150;
                nowPointer.y = 355;
                nowPointer.alpha = 0.5;
                nowPointer.step = (150 - 124) / 10;
                nowPointer.limit = 124;

                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animateRedraw);
            }

            updating = false;
        } else if((loc.x - 350) * (loc.x - 350) + (loc.y - 500) * (loc.y - 500) <= 50 * 50) {
            canvas.style.cursor = 'pointer';

            if(updating) {
                nowPointer.index = 3;
                nowPointer.x = 150;
                nowPointer.y = 355;
                nowPointer.alpha = 0.5;
                nowPointer.step = (150 - 115) / 10;
                nowPointer.limit = 115;

                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animateRedraw);
            }
            
            updating = false;
        } else {
            updating = true;
            canvas.style.cursor = 'default';
            drawMainBack();
            for(var i=0; i<4; i++) {
                drawMainButton(i, 0.5, 150, 355);
            }
        }
    } else if(INDEX === 1) {
        if(loc.x >= op_coordi[2] && loc.x <= op_coordi[2] + op_selectTXT[1].length * 25 && loc.y <= op_coordi[3] && loc.y >= op_coordi[3] - 50) {
            if(op_seleMusic != 1) {
                canvas.style.cursor = 'pointer';
                updateOpPage(1);
            }
        } else if(loc.x >= op_coordi[4] && loc.x <= op_coordi[4] + op_selectTXT[2].length * 25 && loc.y <= op_coordi[5] && loc.y >= op_coordi[5] - 50) {
            if(op_seleMusic != 2) {
                canvas.style.cursor = 'pointer';
                updateOpPage(2);
            }
        } else if(loc.x >= op_coordi[8] && loc.x <= op_coordi[8] + op_selectTXT[4].length * 25 && loc.y <= op_coordi[9] && loc.y >= op_coordi[9] - 50) {
            if(op_seleScale != 4) {
                canvas.style.cursor = 'pointer';
                updateOpPage(4);
            }
        } else if(loc.x >= op_coordi[10] && loc.x <= op_coordi[10] + op_selectTXT[5].length * 25 && loc.y <= op_coordi[11] && loc.y >= op_coordi[11] - 50) {
            if(op_seleScale != 5) {
                canvas.style.cursor = 'pointer';
                updateOpPage(5);
            }
        } else if(loc.x >= op_coordi[12] && loc.x <= op_coordi[12] + op_selectTXT[6].length * 25 && loc.y <= op_coordi[13] && loc.y >= op_coordi[13] - 50) {
            if(op_seleScale != 6) {
                canvas.style.cursor = 'pointer';
                updateOpPage(6);
            }
        } else if(loc.x >= op_coordi[16] && loc.x <= op_coordi[16] + op_selectTXT[8].length * 25 && loc.y <= op_coordi[17] && loc.y >= op_coordi[17] - 50) {
            if(op_seleScale != 8) {
                canvas.style.cursor = 'pointer';
                updateOpPage(8);
            }
        } else if(loc.x >= op_coordi[18] && loc.x <= op_coordi[18] + op_selectTXT[9].length * 25 && loc.y <= op_coordi[19] && loc.y >= op_coordi[19] - 50) {
            if(op_seleScale != 9) {
                canvas.style.cursor = 'pointer';
                updateOpPage(9);
            }
        } else if(loc.x >= op_coordi[20] && loc.x <= op_coordi[20] + op_selectTXT[10].length * 25 && loc.y <= op_coordi[21] && loc.y >= op_coordi[21] - 50) {
            if(op_seleScale != 10) {
                canvas.style.cursor = 'pointer';
                updateOpPage(10);
            }
        } else if(loc.x >= op_coordi[22] && loc.x <= op_coordi[22] + op_selectTXT[11].length * 12 && loc.y <= op_coordi[23] && loc.y >= op_coordi[23] - 30) {
            canvas.style.cursor = 'pointer';
            if(op_back) {
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animateOpSakura);
            }
            op_back = false;
        } else {
            op_back = true;
            op_backAppear = op_coordi[22] - 50;
            canvas.style.cursor = 'default';
            updateOpPage(-1);
        }
    } else if(INDEX === 2) {
        /* Play */
         if(loc.x >= op_coordi[22] && loc.x <= op_coordi[22] + op_selectTXT[11].length * 12 && loc.y <= op_coordi[23] && loc.y >= op_coordi[23] - 30) {
            canvas.style.cursor = 'pointer';
            if(gm_back) {
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animateGmSakura);
            }
            gm_back = false;
        } else {
            gm_back = true;
            gm_backAppear = op_coordi[22] - 50;
            canvas.style.cursor = 'default';
            drawGmBack();
            updateCanvas();
        }
    } else if(INDEX === 3) {
        /* Help */
        if(loc.x >= op_coordi[22] && loc.x <= op_coordi[22] + op_selectTXT[11].length * 12 && loc.y <= op_coordi[23] && loc.y >= op_coordi[23] - 30) {
            canvas.style.cursor = 'pointer';
            if(hp_back) {
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animateHpSakura);
            }
            hp_back = false;
        } else {
            hp_back = true;
            hp_backAppear = op_coordi[22] - 50;
            canvas.style.cursor = 'default';
            drawHpBack();
            outputHelp();
        }
    } else if(INDEX === 4) {
        /* About */
        if(loc.x >= 380 && loc.x <= "[Professional interpretation]".length * 9 + 380 && loc.y <= 180 && loc.y >= 180 - 20) {
            canvas.style.cursor = 'pointer';
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = 'rgb(10, 100, 95)';
            context.moveTo(377, 185);
            context.lineTo("[Professional interpretation]".length * 9 + 380, 185);
            context.stroke();
        } else if(loc.x >= 100 && loc.x <= "http://thwiki.cc".length * 9 + 100 && loc.y <= 350 && loc.y >= 350 - 20) {
            canvas.style.cursor = 'pointer';
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = 'rgb(10, 100, 95)';
            context.moveTo(97, 355);
            context.lineTo("http://thwiki.cc".length * 9 + 100, 355);
            context.stroke();
        } else if(loc.x >= 100 && loc.x <= "http://www.cnblogs.com/HazelNut/".length * 10 + 100 && loc.y <= 410 && loc.y >= 410 - 20) {
            canvas.style.cursor = 'pointer';
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = 'rgb(10, 100, 95)';
            context.moveTo(97, 415);
            context.lineTo("http://www.cnblogs.com/HazelNut/".length * 10 + 100, 415);
            context.stroke();
        } else if(loc.x >= op_coordi[22] && loc.x <= op_coordi[22] + op_selectTXT[11].length * 12 && loc.y <= op_coordi[23] && loc.y >= op_coordi[23] - 30) {
            canvas.style.cursor = 'pointer';
            if(ab_back) {
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animateAbSakura);
            }
            ab_back = false;
        } else {
            ab_back = true;
            ab_backAppear = op_coordi[22] - 50;
            canvas.style.cursor = 'default';
            drawAbBack();
            outputAbout();
        }
    }
};

canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    if(INDEX === 0) {
        /* ----> Main <----- */
        updating = true;
        if((loc.x - 150) * (loc.x - 150) + (loc.y - 350) * (loc.y - 350) <= 50 * 50) {
             /* Option */
            INDEX = 1;
            canvas.style.cursor = 'default';
            drawOpPage();
        } else if((loc.x - 350) * (loc.x - 350) + (loc.y - 350) * (loc.y - 350) <= 50 * 50) {
            /* Play */
            INDEX = 2;
            canvas.style.cursor = 'default';
            board = new Board(boardSize);
            boardBackId = new Date() % 3;
            console.log(boardBackId);
            playTurn = true;
            drawGmPage();
        } else if((loc.x - 150) * (loc.x - 150) + (loc.y - 500) * (loc.y - 500) <= 50 * 50) {
            /* Help */
            INDEX = 3;
            canvas.style.cursor = 'default';
            drawHpPage();
        } else if((loc.x - 350) * (loc.x - 350) + (loc.y - 500) * (loc.y - 500) <= 50 * 50) {
            /* About */
            INDEX = 4;
            canvas.style.cursor = 'default';
            drawAbPage();
        }
    } else if(INDEX === 1) {
        /* ----> Option <---- */
        if(loc.x >= op_coordi[2] && loc.x <= op_coordi[2] + op_selectTXT[1].length * 25 && loc.y <= op_coordi[3] && loc.y >= op_coordi[3] - 50) {
            if(op_seleMusic != 1) {
                op_seleMusic = 1;
                backMusic.src = "Sound/Music.mp3"; 
                updateOpPage(1);
            }
        } else if(loc.x >= op_coordi[4] && loc.x <= op_coordi[4] + op_selectTXT[2].length * 25 && loc.y <= op_coordi[5] && loc.y >= op_coordi[5] - 50) {
            if(op_seleMusic != 2) {
                op_seleMusic = 2;
                backMusic.src = "";
                updateOpPage(2);
            }
        } else if(loc.x >= op_coordi[8] && loc.x <= op_coordi[8] + op_selectTXT[4].length * 25 && loc.y <= op_coordi[9] && loc.y >= op_coordi[9] - 50) {
            if(op_seleScale != 4) {
                op_seleScale = 4;
                boardSize = 5;
                updateOpPage(4);
            }
        } else if(loc.x >= op_coordi[10] && loc.x <= op_coordi[10] + op_selectTXT[5].length * 25 && loc.y <= op_coordi[11] && loc.y >= op_coordi[11] - 50) {
            if(op_seleScale != 5) {
                op_seleScale = 5;
                boardSize = 10;
                updateOpPage(5);
            }
        } else if(loc.x >= op_coordi[12] && loc.x <= op_coordi[12] + op_selectTXT[6].length * 25 && loc.y <= op_coordi[13] && loc.y >= op_coordi[13] - 50) {
            if(op_seleScale != 6) {
                op_seleScale = 6;
                boardSize = 15;
                updateOpPage(6);
            }
        } else if(loc.x >= op_coordi[16] && loc.x <= op_coordi[16] + op_selectTXT[8].length * 25 && loc.y <= op_coordi[17] && loc.y >= op_coordi[17] - 50) {
            if(op_seleScale != 8) {
                op_seleDiff = 8;
                errorRate = 1.0;
                updateOpPage(8);
            }
        } else if(loc.x >= op_coordi[18] && loc.x <= op_coordi[18] + op_selectTXT[9].length * 25 && loc.y <= op_coordi[19] && loc.y >= op_coordi[19] - 50) {
            if(op_seleScale != 9) {
                op_seleDiff = 9;
                errorRate = 0.6;
                updateOpPage(9);
            }
        } else if(loc.x >= op_coordi[20] && loc.x <= op_coordi[20] + op_selectTXT[10].length * 25 && loc.y <= op_coordi[21] && loc.y >= op_coordi[21] - 50) {
            if(op_seleScale != 10) {
                op_seleDiff = 10;
                errorRate = 0.2;
                updateOpPage(10);
            }
        } else if(loc.x >= op_coordi[22] && loc.x <= op_coordi[22] + op_selectTXT[11].length * 15 && loc.y <= op_coordi[23] && loc.y >= op_coordi[23] - 30) {
            INDEX = 0;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(animateOpReturn);

        }
    } else if(INDEX === 2) {
        /* ----> Play <---- */
        if(loc.x >= op_coordi[22] && loc.x <= op_coordi[22] + op_selectTXT[11].length * 15 && loc.y <= op_coordi[23] && loc.y >= op_coordi[23] - 30) {
            INDEX = 0;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(animateGmReturn);

        } else if(loc.x > 80 && loc.x < 80 + totLen && loc.y > 60 && loc.y < 60 + totLen) {
            clickChess(loc);
        }
    } else if(INDEX === 3) {
        /* ----> Help <---- */
        if(loc.x >= op_coordi[22] && loc.x <= op_coordi[22] + op_selectTXT[11].length * 15 && loc.y <= op_coordi[23] && loc.y >= op_coordi[23] - 30) {
            INDEX = 0;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(animateHpReturn);

        }
    } else if(INDEX === 4) {
        /* ----> ABOUT <---- */
        if(loc.x >= 380 && loc.x <= "[Professional interpretation]".length * 9 + 380 && loc.y <= 180 && loc.y >= 180 - 20) {
            self.location='https://baike.baidu.com/item/%E4%B8%9C%E6%96%B9Project/6217040?fr=aladdin';
        } else if(loc.x >= 100 && loc.x <= "http://thwiki.cc".length * 9 + 100 && loc.y <= 350 && loc.y >= 350 - 20) {
            self.location='http://thwiki.cc';
        } else if(loc.x >= 100 && loc.x <= "http://www.cnblogs.com/HazelNut/".length * 10 + 100 && loc.y <= 410 && loc.y >= 410 - 20) {
            self.location='http://www.cnblogs.com/HazelNut/';
        } else if(loc.x >= op_coordi[22] && loc.x <= op_coordi[22] + op_selectTXT[11].length * 15 && loc.y <= op_coordi[23] && loc.y >= op_coordi[23] - 30) {
            INDEX = 0;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(animateAbReturn);
        }
    }
};
/****************** Initialization *******************/
main_background.src = "Image/mainBack.jpeg";
main_title.src = "Image/mainTitle.png";
eleSakura.src = "Image/sakura.png";
backPattern.src = "Image/002.jpg";
boardBackground[0].src = "Image/backSakura01.jpeg";
boardBackground[1].src = "Image/backSakura05.jpeg";
boardBackground[2].src = "Image/backSakura04.jpg";
main_background.onload = function(e) {
    drawMainBack();
    
    loading ++;
    // hua jin du tiao
    if(loading === 4) {
        for(var i=0; i<4; i++) {
            drawMainButton(i, 0.5, 150, 355);
        }
    }
}
main_title.onload = function(e) {
    drawMainBack();
    loading ++;
    // hua jin du tiao
    if(loading === 4) {
        for(var i=0; i<4; i++) {
            drawMainButton(i, 0.5, 150, 355);
        }
    }
}
eleSakura.onload = function(e) {
    drawMainBack();
    loading ++;
    // hua jin du tiao
    if(loading === 4) {
        for(var i=0; i<4; i++) {
            drawMainButton(i, 0.5, 150, 355);
        }
    }
}
backPattern.onload = function(e) {
    drawMainBack();
    loading ++;
    // hua jin du tiao
    if(loading === 4) {
        for(var i=0; i<4; i++) {
            drawMainButton(i, 0.5, 150, 355);
        }
    }
}