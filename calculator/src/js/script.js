function getElem(elem) {
    return document.getElementById(elem).value;
}

function checkStr(str) {
    if (str.indexOf("e") === -1) {
        return str        
    }
    else {
        newStr = str.replace("e", "Math.exp");
        return newStr;
    } 
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
