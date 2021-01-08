const signInContent = document.getElementById("sign-in");
const signUpContent = document.getElementById("sign-up");
const switcher = document.getElementById("switcher");
const signInSwitch = document.getElementById("in-switch");
const signUpSwitch = document.getElementById("up-switch");

//Modal window
switcher.addEventListener("click", ({ target }) => {
    if (target.classList.contains("activated")) return;
    target.classList.add("activated");

    if (target == signInSwitch){
        signUpSwitch.classList.toggle("activated");
    }
    else {
        signInSwitch.classList.toggle("activated");
    }
    if(signInSwitch.classList.contains("activated")){
        signUpContent.classList.toggle("invisible")
        signInContent.classList.toggle("invisible");
    }
    else {
        signInContent.classList.toggle("invisible");
        signUpContent.classList.toggle("invisible");
    }
})

