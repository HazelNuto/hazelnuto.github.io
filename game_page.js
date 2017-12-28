/* ---------------- target -------------------- */
function Board (size) {
    this.size = size;
    this.board = new Array();
    for(var i = 0; i < size; i++) {
        this.board[i] = new Array();
        for(var j = 0 ; j < size; j++) {
            this.board[i][j] = Math.floor(Math.random() * 3) + 1;
        }
    }

    this.sg = new Array();
    for(var i = 0; i < size; i++) {
        this.sg[i] = new Array();
        for(var j = 0; j < size; j++) {
            this.sg[i][j] = new Array();
            for(var k = 0; k < size; k++) {
                this.sg[i][j][k] = new Array();
                for(var l = 0; l < size; l++) {
                    this.sg[i][j][k][l] = -1;
                }
            }
        }
    }

    this.cur = this.getSG(0, 0, size - 1, size - 1);
}

Board.prototype.getSG = function(xa, ya, xb, yb) {
    if (
        xa > xb || ya > yb ||
        xa < 0 || ya < 0 || xb < 0 || yb < 0 ||
        xa >= this.size || ya >= this.size || xb >= this.size || yb >= this.size
      )
      return 0;
    if(this.sg[xa][ya][xb][yb] >= 0) {
        return this.sg[xa][ya][xb][yb];
    }

    var meg = new Set();
    for(var i = xa; i <= xb; i++) {
        for(var j = ya; j <= yb; j++) {
            meg.add(this.getSubSG(xa, ya, xb, yb, i, j));
        }
    }

    var cnt = 0;
    for(; meg.has(cnt); cnt++);
    return this.sg[xa][ya][xb][yb] = cnt;
}

Board.prototype.getSubSG = function(xa, ya, xb, yb, xc, yc) {
    if (this.board[xc][yc] === 1){
        return this.getSG(xa, ya, xc - 1, yb) ^ this.getSG(xc + 1, ya, xb, yb);
    } else if (this.board[xc][yc] === 2) {
        return this.getSG(xa, ya, xb, yc - 1) ^ this.getSG(xa, yc + 1, xb, yb);
    } else {
        return (this.getSG(xa, ya, xc - 1, yc - 1) ^ this.getSG(xa, yc + 1, xc - 1, yb) ^
      this.getSG(xc + 1, ya, xb, yc - 1) ^ this.getSG(xc + 1, yc + 1, xb, yb));
    }
}

Board.prototype.getBoundary = function(x, y) {
    var loc = {};
    for(loc.left = x; loc.left >= 0 && this.board[loc.left][y] > 0; loc.left--); loc.left ++;
    for(loc.top = y; loc.top >= 0 && this.board[x][loc.top] > 0; loc.top--); loc.top ++;
    for(loc.right = x; loc.right < this.size && this.board[loc.right][y] > 0; loc.right++); loc.right --;
    for(loc.bottom = y; loc.bottom < this.size && this.board[x][loc.bottom] > 0; loc.bottom++); loc.bottom --;
    return loc;
}

Board.prototype.select = function(x, y) {
    var bound = this.getBoundary(x, y);
    this.cur ^= (this.getSG(bound.left, bound.top, bound.right, bound.bottom) ^
        this.getSubSG(bound.left, bound.top, bound.right, bound.bottom, x, y));
        
    if(this.board[x][y] & 1) {
        for(var i = y - 1; i >= 0 && this.board[x][i] > 0; i--) {
            this.board[x][i] = 0;
        }
        for(var i = y + 1; i < this.size && this.board[x][i] > 0; i++) {
            this.board[x][i] = 0;
        }
    }

    if(this.board[x][y] & 2) {
        for(var i = x - 1; i >= 0 && this.board[i][y] > 0; i--) {
            this.board[i][y] = 0;
        }
        for(var i = x + 1; i < this.size && this.board[i][y] > 0; i++) {
            this.board[i][y] = 0;
        }
    }

    this.board[x][y] = 0;
}

Board.prototype.getWinPos = function() {
    var vis = new Array();
    for(var i = 0; i < this.size; i++) {
        vis[i] = new Array();
        for(var j = 0; j < this.size; j++) {
            vis[i][j] = false;
        }
    }

    var ret = null;
    for(var i = 0; i < this.size; i++) {
        for(var j = 0; j < this.size; j++) {
            if(this.board[i][j] > 0 && !vis[i][j]) {
                var bound = this.getBoundary(i, j);
                for(var _i = bound.left; _i <= bound.right; _i++) {
                    for(var _j = bound.top; _j <= bound.bottom; _j++) {
                        vis[_i][_j] = true;
                        if(ret === null || Math.random() < errorRate) {
                            ret = new Array(_i, _j);
                        }
                        if((this.cur ^ this.getSG(bound.left, bound.top, bound.right, bound.bottom) ^
                        this.getSubSG(bound.left, bound.top, bound.right, bound.bottom, _i, _j)) === 0) {
                            return new Array(_i, _j);
                        }
                    }
                }
            }
        }
    }
    return ret;
}

/* ------------------ exchange's animate -------------------- */
var gm_alpha = 1.0, gm_scale = 1.0;
var gm_backAppear = op_coordi[22] - 50, gm_back = true;
var boardBackId;

function drawGmBack() { 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = gm_alpha;
    context.drawImage(main_background, 0, 0, main_background.width, main_background.height,
         canvas.width * (1.0 - gm_scale), 0, canvas.width * gm_scale, canvas.height * gm_scale);
    context.globalAlpha = 1.0;
    context.font = 10 + 'px Arial';
    context.fillStyle = 'grey';
    context.fillText("All Copyright Reserved @2017 HazelNut", 400, 590);
}

function animateGmScale() {
    if(gm_scale < MAX_SIZE) {
        drawGmFrame();
        timer = requestAnimationFrame(animateGmScale);
    }else {
        updateCanvas();
        cancelAnimationFrame(timer); 
    }
}

function drawGmFrame() {
    gm_scale += cutStep;
    gm_alpha -= cutStep;
    drawGmBack();
}

function drawGmPage() {
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(animateGmScale);
}

function animateGmReturn() {
    if(gm_scale > 1.0) {
        gmReturnMain();
        timer = requestAnimationFrame(animateGmReturn);
    }else {
        updating = true;
        drawMainBack();
        for(var i=0; i<4; i++) {
            drawMainButton(i, 0.5, 150, 355);
        }
        cancelAnimationFrame(timer); 
    }
}

function gmReturnMain() {
    gm_scale -= cutStep;
    gm_alpha += cutStep;
    drawGmBack();
}

function animateGmSakura() {
    if(gm_backAppear < SakuraMax) {
        drawGmSakura();
        timer = requestAnimationFrame(animateGmSakura);
    }else {
        cancelAnimationFrame(timer);
    }
}

function drawGmSakura() {
    gm_backAppear += SakuraStep;
    updateCanvas();
    context.drawImage(eleSakura, gm_backAppear, op_coordi[23] - 30, 30, 30);
}

/* ------------------- surface ------------------- */
/****************************************************
 * Score： （等等 积分要怎么计算啊（？？？？
 * Time：new Date() - lastTime取模搞一下
 * Replay按钮
 * Tip（提示英语是什么
 * 还有啥功能 应该没了吧
 ****************************************************/
var totLen = 500, gridLen;
var board = new Board(boardSize);
var playTurn = true;

function updateCanvas() {
    drawGmBack();
    outputOptions(11, 0, 0, 0, 1);
    gridLen = totLen / boardSize;
    /*** draw grid */
    context.globalAlpha = 0.4;
    context.drawImage(backPattern, 0, 0, backPattern.height, backPattern.height,
        80, 60, totLen, totLen);
    context.globalAlpha = 1.0;
    context.lineWidth = 2; 
    for(var i=0; i<=boardSize; i++) {
        context.moveTo(80, 60 + i * gridLen);
        context.lineTo(80 + totLen, 60 + i * gridLen);
        context.stroke();
    }
    for(var i=0; i<=boardSize; i++) {
        context.moveTo(80 + i * gridLen, 60);
        context.lineTo(80 + i * gridLen, 60 + totLen);
        context.stroke();
    }
    /*** fill text */
    for(var i=0; i<boardSize; i++) {
        for(var j=0; j<boardSize; j++) {
            if(board.board[i][j] === 1) {
                context.fillText('--', 80 + j * gridLen + gridLen / 3,
                60 + (i + 1) * gridLen - gridLen / 3);
            } else if(board.board[i][j] === 2) {
                context.fillText('|', 80 + j * gridLen + gridLen / 2.5,
                60 + (i + 1) * gridLen - gridLen / 3);
            } else if(board.board[i][j] === 3) {
                context.fillText('+', 80 + j * gridLen + gridLen / 3,
                60 + (i + 1) * gridLen - gridLen / 3);
            } else {
                //context.globalAlpha = 0.7;
                context.drawImage(boardBackground[boardBackId], 80 + j * gridLen,
                60 + i * gridLen, gridLen, gridLen, 80 + j * gridLen, 60 + i * gridLen,
                gridLen, gridLen);
                context.globalAlpha = 1.0;
            }
        }
    }
}

function clickChess(loc) {
    if(!playTurn) return ;
    for(var i=0; i<boardSize; i++) {
        for(var j=0; j<boardSize; j++) {
            if(loc.x > 80 + j * gridLen && loc.x < 80 + (j + 1) * gridLen && loc.y > 60 + i * gridLen && loc.y < 60 + (i + 1) * gridLen) {
                if(board.board[i][j] === 0) return ;
                board.select(i ,j);
                updateCanvas();
                window.setTimeout('comTurn()', 500);
                playTurn = false;
                break;
            }
        }
    }
}

function comTurn() {
    var pos = board.getWinPos();
    if(pos != null) {
        board.select(pos[0], pos[1]);
        updateCanvas();
    } else {
        alert("YOU WIN");
    }
    playTurn = true;
}