const generateBtn = document.getElementById("generate-array");
const bubbleBtn = document.getElementById("bubble-sort");
const selectionBtn = document.getElementById("selection-sort");
const insertionBtn = document.getElementById("insertion-sort");
const mergeBtn = document.getElementById("merge-sort");
const quickBtn = document.getElementById("quick-sort");
const arrayContainer = document.getElementById("array");


let numbers = [];

function generateRandomArray(){
    for(let i = 0; i < 20; i++){
        let randomNum = Math.floor(Math.random() * 100) + 1;
        numbers.push(randomNum);
    }
}

function renderBars(){
    arrayContainer.innerHTML = "";

    for(let i = 0; i < numbers.length; i++){

    const bar = document.createElement("div");

    bar.className = "bar";

    bar.style.height = numbers[i] + "px"

    arrayContainer.appendChild(bar);
    } 
}



generateBtn.addEventListener("click", function(){
    numbers = [];
    generateRandomArray();
    renderBars();
});

generateRandomArray();
renderBars();
console.log(numbers);