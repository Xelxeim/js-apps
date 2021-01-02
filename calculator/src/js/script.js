const root = document.getElementById("root")
root.addEventListener("click", ({ target }) => {
    if (target.tagName !== "BUTTON") return;

    const { action } = target.dataset;

        if (action){
            switch(action) {
                case "calculate":
                    calculate();
                    break;
                case "clean":
                    clean();
                    break;
                case "back":
                    back();
                    break;
                case "bracket":
                    checkStr(target.innerHTML + "(");
                    add(target.innerHTML + "(")    
            }
            return;
        }

        checkStr(target.innerHTML);
        add(target.innerHTML);
        
});

function getElem(elem) {
    return document.getElementById(elem).value;
}

function updateElem(elem, value) {
    document.getElementById(elem).value = value;
}

function checkStr(str) {
    if (str.indexOf("e") === -1 && str.indexOf("<") === -1 && str.indexOf("√")  && str.indexOf("^") === -1) return str;        

    newStr = str.replace("e", "Math.exp").replace("<", "").replace("√", "Math.sqrt").replace("^", "**")
    return newStr;
}

function add(elem) {
    let result = getElem("result");
    result += elem;
    updateElem("result", result);
}

function clean() {
    updateElem("result", "")
}

function back() {
    let result = getElem('result');
    result = result.slice(0, result.length-1);
    updateElem("result", result);
}

function calculate(){
    let result = getElem('result');
    updateElem("result", eval(checkStr(result)))
}

