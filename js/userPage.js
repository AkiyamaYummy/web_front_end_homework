var SCROLL_LINE_1 = 605,userRightPanelMode = 0;
function checkScrollForUserRightPanel(){
    var panel = document.getElementById("userRightPanel");
    if((userRightPanelMode===0)!==(getScroll().y<SCROLL_LINE_1)){
        userRightPanelMode = (userRightPanelMode+1)%2;
        if(userRightPanelMode === 1){
            panel.style.left = getElePosi(panel).x+"px";
            panel.style.top = "5px"
            panel.style.right = "";
            panel.style.position = "fixed";
        }else{
            panel.style.left = "";
            panel.style.right = "5px";
            panel.style.top = "20px";
            panel.style.position = "absolute";
        }
    }
}