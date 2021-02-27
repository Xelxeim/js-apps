function calc(){
  const calories = document.querySelector(".calculating__result span");
  let height, weight, age, ratio, gender;

  localStorageInit();
  checkActive("#gender");
  checkActive(".calculating__choose_big");

  function localStorageCheck(key, value, variable){
    if (localStorage.getItem(key)) return localStorage.getItem(key);
    else {
      variable = value;
      localStorage.setItem(key, value);
    }
    return variable;
  }

  function localStorageInit(){
    if (localStorage.getItem("height")){
      height = localStorage.getItem("height");
      document.querySelector("#height").value = height;
    }
    if (localStorage.getItem("weight")){
      weight = localStorage.getItem("weight");
      document.querySelector("#weight").value = weight;
    }
    if (localStorage.getItem("age")){
      age = localStorage.getItem("age");
      document.querySelector("#age").value = age;
    }
  }

  function checkActive(parent){
    const elements = document.querySelectorAll(`${parent} div`);
    ratio = localStorageCheck("ratio", 1.375, ratio);
    gender = localStorageCheck("gender", "female", gender);
    elements.forEach(item =>{
      item.classList.remove("calculating__choose-item_active");
      if(item.getAttribute("data-ratio")){
        if(item.getAttribute("data-ratio") === ratio){
          item.classList.add("calculating__choose-item_active");
        }
      } else {
        if (item.getAttribute("id") === gender){
          item.classList.add("calculating__choose-item_active");
        }
      }     
    });
  }

  function calcColories() {
    if (!gender || !height || !weight || !age || !ratio){
      calories.textContent = "____";
      return;
    }

    if (gender === "female") {
      calories.textContent = Math.floor((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      calories.textContent = Math.floor((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  function getStaticData(parent){
    const elements = document.querySelectorAll(`${parent} div`);
    document.querySelector(parent).addEventListener("click", ( {target} ) => {
      if (target.classList.contains("calculating__choose-item")){
        if (target.getAttribute("data-ratio")){
          ratio = +target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          gender = target.getAttribute("id");
          localStorage.setItem("gender", gender);
        }

        elements.forEach(item => {
          item.classList.remove("calculating__choose-item_active");
        });

        target.classList.add("calculating__choose-item_active");
        calcColories();
      }
    });
  }

  function getInputData(parent){
    document.querySelector(parent).addEventListener("input", ( {target} ) => {

      if (target.value.match(/\D/g)){
        target.style.border = "3px solid red";
      } else {
        target.style.border = "none";
        switch(target.getAttribute("id")){
          case "height":
            height = +target.value;
            localStorage.setItem("height", height);
            break;
          case "weight":
            weight = +target.value;
            localStorage.setItem("weight", weight);
            break;
          case "age":
            age = +target.value;
            localStorage.setItem("age", age);
            break;
        }
      }
      calcColories();
    });
  }
  calcColories();
  getStaticData("#gender");
  getStaticData(".calculating__choose_big");
  getInputData(".calculating__choose_medium");
}


export default calc;