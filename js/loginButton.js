var loginButton,registerButton,loginPanelMask,loginPanel,buttonList;
function loginButtonInit() {
    buttonList = document.getElementById("buttonList");

    var a1 = document.createElement("a");
    a1.innerHTML = "登录";
    var a2 = document.createElement("a");
    a2.innerHTML = "注册";

    loginButton = document.createElement("li");
    loginButton.setAttribute("id","loginButton");
    loginButton.appendChild(a1);
    registerButton = document.createElement("li");
    registerButton.setAttribute("id","registerButton");
    registerButton.appendChild(a2);

    loginButton.setAttribute("onclick","showLoginPanel(0)");
    registerButton.setAttribute("onclick","showLoginPanel(1)");

    buttonList.appendChild(registerButton);
    buttonList.appendChild(loginButton);
}
function showLoginPanel(op) {
    loginPanelMask = document.createElement("div");
    loginPanelMask.setAttribute("id","loginPanelMask");
    loginPanelMask.setAttribute("onclick","loginPanelgoBack()");
    document.getElementById("body").appendChild(loginPanelMask);
    setTimeout("showThePanel("+op+")",500);
}
var loginPanelTitles = ["登录","注册"];
var loginButtonTitles = ["LOGIN","REGISTER"];
var loginPanelItemTitles = [["用户名","密码","p"],["用户名","密码","p","重复密码","p"]];
function showThePanel(op) {
    loginPanel = document.createElement("div");
    loginPanel.setAttribute("id", "loginPanel");
    if (op < 2) {
        getLoginPanelTitle(op);
        getLoginPanelItems(op);
        getLoginPanelButton(op);
        if (op == 0) loginPanel.style.height = "255px";
    }else forkPanelRun(loginPanel);
    document.getElementById("body").appendChild(loginPanel);
}
function getLoginPanelButton(op) {
    var logBut = document.createElement("logBut");
    var butTit = document.createElement("a");
    butTit.innerHTML = loginButtonTitles[op];
    logBut.appendChild(butTit);
    logBut.setAttribute("onclick","loginRun("+op+")");
    loginPanel.appendChild(logBut);
}
function getLoginPanelTitle(op) {
    var title = document.createElement("tit");
    title.innerHTML = loginPanelTitles[op];
    loginPanel.appendChild(title);
}
function getLoginPanelItems(op){
    for(var i=0;i<loginPanelItemTitles[op].length;i++){
        if(loginPanelItemTitles[op][i] == "p")continue;
        var isp = ((i+1<loginPanelItemTitles[op].length)&&
                    (loginPanelItemTitles[op][i+1]=="p"));
        var item = getLoginPanelItem(loginPanelItemTitles[op][i],isp);
        loginPanel.appendChild(item);
    }
}
function getLoginPanelItem(titStr,isp) {
    var item = document.createElement("item");
    var tit = document.createElement("tit");
    tit.innerHTML = titStr;
    var input = document.createElement("input");
    var type = isp?"password":"text";
    input.setAttribute("type",type);
    item.appendChild(tit);
    item.appendChild(input);
    return item;
}
function loginPanelgoBack() {
    document.getElementById("body").removeChild(loginPanel);
    document.getElementById("body").removeChild(loginPanelMask);
}

var userMessage = {
    nickname:"测试账号",
    headPortrait:"pics/userPage/hp.png",
    homePage:"user.html"
}
var nameLabelWidth,loginNameSubPanelOn = 0;
var loginNameSubPanel,loginNameSubPanelMask;

function loginRun() {
    buttonList.removeChild(registerButton);
    buttonList.removeChild(loginButton);
    getNameLabelAfterLogin();
    document.getElementById("body").removeChild(loginPanel);
    document.getElementById("body").removeChild(loginPanelMask);
}
function getNameLabelAfterLogin() {
    var nameLabel = document.createElement("li");
    nameLabel.setAttribute("id","loginNameLabel");

    var name = document.createElement("a");
    name.innerHTML = userMessage.nickname;
    name.setAttribute("onclick","nameSubPanelSwitch()");
    nameLabel.appendChild(name);

    buttonList.appendChild(nameLabel);

    nameLabelWidth = nameLabel.offsetWidth;
    loginNameSubPanel = document.createElement("div");
    loginNameSubPanel.setAttribute("id","loginNameSubPanel");

    loginNameSubPanelMask = document.createElement("div");
    loginNameSubPanelMask.setAttribute("id","loginNameSubPanelMask");
    loginNameSubPanelMask.setAttribute("onclick","nameSubPanelSwitch()");

    var hp = document.createElement("hp");
    hp.style.backgroundImage = "url("+userMessage.headPortrait+")";
    hp.setAttribute("onclick","window.location.href='"+userMessage.homePage+"'");
    loginNameSubPanel.appendChild(hp);
    var logoutButton = document.createElement("logBut");
    logoutButton.setAttribute("onclick","logoutRun()");
    var logoutButtonText = document.createElement("a");
    logoutButtonText.innerHTML = "LOGOUT";
    logoutButton.appendChild(logoutButtonText);
    loginNameSubPanel.appendChild(logoutButton);

    loginNameSubPanel.style.marginLeft = "-"+((230-nameLabelWidth)/2)+"px";
}
function nameSubPanelSwitch() {
    loginNameSubPanelOn = loginNameSubPanelOn^1;
    var nameLabel = document.getElementById("loginNameLabel");
    if(loginNameSubPanelOn == 0){
        nameLabel.removeChild(loginNameSubPanel);
        body.removeChild(loginNameSubPanelMask);
    }else {
        body.appendChild(loginNameSubPanelMask);
        nameLabel.appendChild(loginNameSubPanel);
    }
}
function logoutRun() {
    nameSubPanelSwitch();
    buttonList.removeChild(document.getElementById("loginNameLabel"));
    buttonList.appendChild(registerButton);
    buttonList.appendChild(loginButton);
}