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
            }
            return;
        }

        checkStr(target.innerHTML);
        add(target.innerHTML);
        
    
});

function getElem(elem) {
    return document.getElementById(elem).value;
}

function checkStr(str) {
    if (str.indexOf("e") === -1 && str.indexOf("<") === -1 && str.indexOf("√")  && str.indexOf("^") === -1) {
        return str        
    }
    newStr = str.replace("e", "Math.exp").replace("<", "").replace("√", "Math.sqrt").replace("^", "**")
    return newStr;
}

function add(elem) {
    let result = getElem('result');
    result += elem;
    document.getElementById('result').value = result;
}

function clean() {
    document.getElementById('result').value = "";
}

function back() {
    let result = getElem('result');
    result = result.slice(0, result.length-1);
    document.getElementById('result').value = result;
}

function calculate(){
    let result = getElem('result');
    document.getElementById('result').value = eval(checkStr(result));
}

