var messageInputHasChange = [0,0,0,0];
var initMessage = ["请填写第一标题","请填写第二标题","请填写封面图片链接","请填写节点名"];
function submitRun(arr) {
    if(!checkInputText(arr) || !checkRadio("channel"))
        alert("请将文章信息填写完整。");
    else if(simplemde.value() == "")
        alert("文章内容不能为空。");
    else window.location.href = "article.html";
}
function checkInputText(arr) {
    for(i in arr){
        var ini = document.getElementById("messageInput_"+arr[i]);
        if(ini.value == "" || messageInputHasChange[arr[i]]==0)
            return false;
    }
    return true;
}
function messageInputOnfocus(r) {
    var inp = document.getElementById("messageInput_"+r);
    if(messageInputHasChange[r] == 0) {
        inp.value = "";
        messageInputHasChange[r] = 1;
    }
}
function messageInputOnblur(r) {
    var inp = document.getElementById("messageInput_"+r);
    if(inp.value == "") {
        inp.value = initMessage[r];
        messageInputHasChange[r] = 0;
    }
}
function checkRadio(idstr) {
    var radio = document.getElementsByName(idstr);
    for(var i=0; i<radio.length; i ++)
        if(radio[i].checked)
            return true;
    return false;
}