var ms_img = document.getElementById("mission_img"),
    ms_left = document.getElementsByClassName("mission-left"),
    ms_right = document.getElementsByClassName("mission-right");

function update() {
    var wd_width = window.innerWidth;
    document.getElementsByClassName("header")[0].style.height = wd_width / 30 + 50 + "px";
    document.getElementsByClassName("nav")[0].style.height = wd_width / 30 + 50 + "px";
    document.getElementsByClassName("nav")[0].style.lineHeight = wd_width / 30 + 50 + "px";
    document.getElementById("logo").style.width = 80 + 70 * wd_width / 1200 + "px";
    document.getElementsByClassName("burger")[0].style.height = wd_width / 30 + 50 + "px";
    document.getElementsByClassName("burger")[0].style.width = wd_width / 30 + 50 + "px";
    document.getElementById("burger").style.width = wd_width / 30 + 30 + "px";
    document.getElementById("list_cur").style.top = wd_width / 30 + 50 + "px";
    document.getElementsByClassName("banner")[0].style.height = wd_width / 8 + 420 + "px";
    document.getElementsByClassName("banner-info")[0].style.top = wd_width / 7 + 180 + "px";
    document.getElementsByClassName("banner-info")[0].style.width = wd_width / 6 + 220 + "px";
    if(wd_width >= 640) {
        document.getElementsByClassName("mission")[0].style.height = wd_width / 24 + 500 + "px";
        document.getElementsByClassName("nav")[0].style.visibility = "visible";
        document.getElementById("burger").style.visibility = "hidden";
        ms_left[0].style.float = "left";
        ms_right[0].style.float = "right";
        ms_left[0].style.width = wd_width / 2 - 20 + "px";
        ms_left[0].style.height = (wd_width / 2 - 100) * 0.8 + "px";
        ms_right[0].style.width = wd_width / 2 - 20 + "px";
        ms_img.style.width = (wd_width / 2 - 50) + "px";
        ms_right[0].style.position = "";
    }
    else {
        document.getElementsByClassName("mission")[0].style.height = (wd_width - 60) * 0.6  + 500 + "px";
        document.getElementsByClassName("nav")[0].style.visibility = "hidden";
        document.getElementById("burger").style.visibility = "visible";
        ms_left[0].style.float = "none";
        ms_right[0].style.float = "none";
        ms_left[0].style.width = wd_width - 60 + "px";
        ms_left[0].style.height = (wd_width - 60) * 0.6 + "px";
        ms_right[0].style.width = wd_width - 30 + "px";
        ms_img.style.width = (wd_width - 70) + "px";
        ms_right[0].style.position = "absolute";
        ms_right[0].style.left = 30 + "px";
    }
}

window.onload = function() {
    update();
}

window.onresize = function() {
    update();
}

function change(myid, mode) {
    document.getElementById(myid).style.display = mode;
    if(mode === 'block') {
        // 显示下拉菜单
        document.getElementById(myid).style.visibility = "visible";
        // 设置下拉菜单所在div的边框
        document.getElementById(myid).style.border = "1px solid #eee";
        document.getElementById(myid).style.borderTop = "none";
        // 设置鼠标滑过的li的边框及背景颜色
        document.getElementById(myid).parentNode.backgroundColor = "#fff";
        document.getElementById(myid).parentNode.border = "1px solid #eee";
        document.getElementById(myid).parentNode.borderBottom = "none";
    }
    else {
        // 不现实下拉菜单，鼠标滑过的li的边框及背景颜色
        document.getElementById(myid).parentNode.backgroundColor = "";
        document.getElementById(myid).parentNode.border = "";
    }
}
