var forkPanel = null;
function forkPanelRun(father) {
    forkPanel = document.createElement("div");
    forkPanel.setAttribute("id","forkPanel");
    getForkPanelTitle();
    getForkDisplayPanel();
    father.appendChild(forkPanel);
}
function getForkPanelTitle() {
    var tit = document.createElement("tit");
    tit.innerHTML = "请选择";
    forkPanel.appendChild(tit);
}
var itemsMessage = [
    [0,-1,0,"文章建立","测试账号",1,0],
    [1,0,2,"提交1","肥仔",0,0],
    [2,0,1,"续写1","测试账号",1,0],
    [3,2,1,"续写2","测试账号",1,1],
    [4,2,2,"分支1","测试账号",0,1],
    [5,2,2,"233","quin",0,0],
    [6,4,3,"合并","测试账号",1,1],
    [7,3,2,"rua","Akiyama",0,0],
    [8,2,1,"www","李老叁",0,0]
];
var isMaster = 1;
var forkDisplayItems = new Array(),choosenForkItem = -1;
var forkButtonPanel;
function getForkDisplayPanel() {
    var forkDisplayPanel = document.createElement("div");
    forkDisplayPanel.setAttribute("id","forkDisplayPanel");
    forkButtonPanel = document.createElement("div");
    forkButtonPanel.setAttribute("id","forkButtonPanel");
    for(var i=0;i<itemsMessage.length;i++){
        forkDisplayItems[i] = document.createElement("div");
        forkDisplayItems[i].setAttribute("class","forkItem");
        if(itemsMessage[i][5] == 1)
            forkDisplayItems[i].style.borderColor = "#326987";
        getMessageA(i,forkDisplayItems[i]);
        forkDisplayItems[i].setAttribute("onclick","forkDisplayItemOnclick("+i+")");
        forkDisplayItems[i].setAttribute("ondblclick","location.reload()");
        forkDisplayPanel.appendChild(forkDisplayItems[i]);
    }
    forkPanel.appendChild(forkDisplayPanel);
    forkPanel.appendChild(forkButtonPanel);
}
function forkDisplayItemOnclick(r) {
    if(choosenForkItem != -1) {
        forkDisplayItems[choosenForkItem].style.boxShadow = "";
        forkDisplayItems[choosenForkItem].style.marginLeft = "5px";
        forkDisplayItems[choosenForkItem].style.marginTop = "7px";
    }
    forkDisplayItems[r].style.boxShadow = "5px 5px 5px black";
    forkDisplayItems[r].style.marginLeft = "0px";
    forkDisplayItems[r].style.marginTop = "2px";

    var strarr = new Array(),sid = 0,fid;
    forkButtonPanel.innerHTML = "";
    if(itemsMessage[r][5] == 1) strarr[sid++] = "在节点上建立分支";
    if(itemsMessage[r][6] == 1) strarr[sid++] = "续写分支";
    fid = sid;
    if(isMaster == 1) {
        if(itemsMessage[r][5] == 0) strarr[sid++] = "合并到主分支";
        else if(itemsMessage[r][6] == 0) strarr[sid++] = "回退到该节点";
    }
    for(var i=sid-1;i>=0;i--) {
        var newa = getEleWithText(strarr[i], "a");
        newa.setAttribute("onclick",((i<fid)?"window.location.href='articleForkDemo.html'":"location.reload()"));
        forkButtonPanel.appendChild(newa);
    }
    choosenForkItem = r;
}
function getMessageA(r,ele) {
    //节点编号 1 ，用户 肥仔 对节点 0 文章建立 进行了 分支 操作。节点名 提交1 。
    var mes = itemsMessage[r];
    var strarr = ["文章建立","建立分支","续写分支","合并到主分支"]
    ele.appendChild(getEleWithText("节点编号","a"));
    ele.appendChild(getEleWithText(mes[0],"strong"));
    ele.appendChild(getEleWithText("。用户","a"));
    ele.appendChild(getEleWithText(mes[4],"strong"));
    if(mes[1] != -1) {
        ele.appendChild(getEleWithText("对节点", "a"));
        ele.appendChild(getEleWithText(mes[1], "strong"));
    }
    ele.appendChild(getEleWithText("进行了","a"));
    ele.appendChild(getEleWithText(strarr[mes[2]],"strong"));
    ele.appendChild(getEleWithText("操作。","a"));
    if(mes[1] != -1) {
        ele.appendChild(getEleWithText("节点名", "a"));
        ele.appendChild(getEleWithText(mes[3], "strong"));
        ele.appendChild(getEleWithText("。", "a"));
    }
}
function getEleWithText(str,tag) {
    var res = document.createElement(tag);
    res.innerHTML = str;
    return res;
}