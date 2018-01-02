var ele,mousePosiX = -1,mousePosiY = -1,FLOOR_HEIGHT = 0,RIGHT_DIF = 50;
var elvesTimer = null,wallRight,wallBottom;
var leftBase,topBase;
var dia,diaText,diaButPan,diaSearch;
var buttons = new Array();
var getButtonsBySta = [
    [0,1,2,3],
    [4,5,3],
    [5,3]
];
var staticText = [
    "你好，我的名字叫，动感肥仔企鹅。" +
    "我是这个博客网站的可爱的吉祥物，也负责一些微不足道的杂事。" +
    "请问你需要什么服务？",
    "喏，搜吧，请快点搜。",
    "本网站含有“分支”功能，" +
    "可以在他人现有文章的基础上建立自己的分支，" +
    "对他人文章进行续写或者改写，请打开想要fork的文章，" +
    "点击“查看分支”后，进行相应操作。"
];
var butText = [
    "发表文章",
    "fork文章",
    "搜索文章",
    "关闭对话框",
    "搜索关键词",
    "返回上一页"
]
var nowSta = 8;
function elvesInit() {
    buttonsInit();
    diaInit();
    diaSearchInit();

    ele = document.getElementById("elves");
    ele.setAttribute("onmousedown","eleOnMouseDown(event)");
    ele.setAttribute("onmouseup","eleOnMouseUp(event)");
    ele.setAttribute("ondblclick","changeSubSta1()");
    ele.appendChild(dia);
    body.setAttribute("onmousemove","bodyOnMouseMove(event)");

    stateInit();
    resizeInit();
}
function stateInit() {
    dia.style.visibility = nowSta&8==0?"hidden":"visible";
    setSubSta0(nowSta%8);
}
function buttonsInit() {
    for(i in butText) {
        buttons[i] = document.createElement("a");
        buttons[i].innerHTML = butText[i];
    }
    buttons[0].onclick = function () {
        window.location.href = "articlePost.html";
    }
    buttons[1].onclick = function () {
        setSubSta0(2);
    }
    buttons[2].onclick = function () {
        setSubSta0(1);
    }
    buttons[3].onclick = function () {
        changeSubSta1();
    }
    buttons[4].onclick = function () {
        window.location.href = "article.html";
    }
    buttons[5].onclick = function () {
        setSubSta0(0);
    }
}
function diaInit() {
    dia = document.createElement("div");
    dia.setAttribute("id","elvesDialog");
    diaText = document.createElement("text");
    dia.appendChild(diaText);
    diaButPan = document.createElement("butPan");
    dia.appendChild(diaButPan);
}
function diaSearchInit() {
    diaSearch = document.createElement("input");
    diaSearch.style.width = "100%";
    diaSearch.setAttribute("type","text");
    diaSearch.style.color = "white";
    diaSearch.style.backgroundColor = "hsl(0,0%,20%)";
    diaSearch.style.borderColor = "black";
    diaSearch.setAttribute("onkeydown","diaSearchKeyDown(event)");
}
function diaSearchKeyDown(e) {
    if(e.keyCode != 13)return;
    window.location.href = "article.html";
}
function changeSubSta1() {
    nowSta = (nowSta+8)%16;
    dia.style.visibility = (nowSta&8)==0?"hidden":"visible";
}
function setSubSta0(sta) {
    setDiaText(sta);
    setButtons(sta);
    nowSta = nowSta&8|sta;
}
function setButtons(sta) {
    diaButPan.innerHTML = "";
    for(i in getButtonsBySta[sta]){
        diaButPan.appendChild(buttons[getButtonsBySta[sta][i]]);
    }
}
function setDiaText(sta) {
    diaText.innerHTML = staticText[sta];
    if(sta == 1)diaText.appendChild(diaSearch);
}
function resizeInit() {
    var tele = document.createElement("div");
    tele.style.height = "144px";
    tele.style.width = "144px";
    tele.style.position = "fixed";
    tele.style.right = RIGHT_DIF+"px";
    tele.style.bottom = FLOOR_HEIGHT+"px";
    body.appendChild(tele);

    leftBase = tele.offsetLeft;
    topBase = tele.offsetTop;
    wallRight = tele.offsetLeft+RIGHT_DIF;
    wallBottom = tele.offsetTop+FLOOR_HEIGHT;

    body.removeChild(tele);
    ele.style.left = leftBase+"px";
    ele.style.top = topBase+"px";
}
function eleOnMouseDown(e) {
    if(elvesTimer != null)clearTimeout(elvesTimer);
    elvesTimer = null;
    mousePosiX = e.clientX;mousePosiY = e.clientY;
    lastTime = (new Date()).getTime();
    lastTopPosi = ele.offsetTop;
    lastLeftPosi = ele.offsetLeft;
}
var lastTime = -1,timeDif,vecLeft,vecTop,movePointCon = 0;
var lastLeftPosi,lastTopPosi;
function bodyOnMouseMove(e) {
    var left = e.clientX,top = e.clientY;
    //alert(left+" "+top);
    if(mousePosiX!=-1 || mousePosiY!=-1){
        if(elvesTimer != null)clearTimeout(elvesTimer);
        elvesTimer = null;
        eleMove(left-mousePosiX,top-mousePosiY);
        mousePosiX = left;mousePosiY = top;
        if((movePointCon++)%5 == 0) {
            var timeNow = (new Date()).getTime();
            var leftPosi = ele.offsetLeft, topPosi = ele.offsetTop;
            vecLeft = leftPosi - lastLeftPosi;
            vecTop = topPosi - lastTopPosi;
            timeDif = timeNow - lastTime;
            lastLeftPosi = leftPosi;
            lastTopPosi = topPosi;
            lastTime = timeNow;
        }
    }
}
var backFrame = 20,msPerFrameToBack = 5,lOneStep,tOneStep;
var acceleration = 0.05,collisionLoss = 0.15,slideLoss = 0.1;
var stopSpeed = 3;
function eleOnMouseUp(e) {
    if(elvesTimer != null)clearTimeout(elvesTimer);
    elvesTimer = null;
    mousePosiX = mousePosiY = -1;
    /*
    lOneStep = (leftBase-ele.offsetLeft)/backFrame;
    tOneStep = (topBase-ele.offsetTop)/backFrame;
    var lFlag = ele.offsetLeft-topBase,tFlag = ele.offsetTop-topBase;
    elvesTimer = setTimeout("elvesBackThread("+lFlag+","+tFlag+")",msPerFrameToBack);
    */
    vecLeft *= (msPerFrameToBack/timeDif);
    vecTop *= (msPerFrameToBack/timeDif);
    elvesTimer = setTimeout("elvesThrowThread()",msPerFrameToBack);
}
function elvesThrowThread() {
    if(vecLeft==0 && vecTop==0)return;
    var downVec = acceleration*msPerFrameToBack;
    eleMove(vecLeft,vecTop);
    vecTop += downVec;
    var topNow = ele.offsetTop,leftNow = ele.offsetLeft;
    if(topNow>=wallBottom)vecTop = -vecTop*(1-collisionLoss);
    if(topNow<=0){
        vecTop = Math.abs(vecTop);
        //alert(vecTop+" "+vecLeft);
    }
    if(leftNow<=0 || leftNow>=wallRight)vecLeft = -vecLeft*(1-collisionLoss);
    if(topNow>=wallBottom && Math.abs(vecTop)<=stopSpeed){
        vecTop = 0; ele.style.top = wallBottom+"px";
        if(Math.abs(vecLeft) <= slideLoss)vecLeft = 0;
        else vecLeft = (vecLeft>0?1:-1)*(Math.abs(vecLeft)-slideLoss);
    }
    elvesTimer = setTimeout("elvesThrowThread()",msPerFrameToBack);
}
function eleMove(lmove,tmove) {
    if(isNaN(lmove)||isNaN(tmove)||(lmove==0&&tmove==0))
        return;
    var theLeft = Math.max(Math.min(ele.offsetLeft+lmove,wallRight),0);
    var theTop = Math.max(Math.min(ele.offsetTop+tmove,wallBottom),0);
    ele.style.left = theLeft+"px";
    ele.style.top = theTop+"px";
}