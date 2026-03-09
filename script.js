const generateBtn = document.getElementById("generate-array");
const bubbleBtn = document.getElementById("bubble-sort");
const selectionBtn = document.getElementById("selection-sort");
const insertionBtn = document.getElementById("insertion-sort");
const mergeBtn = document.getElementById("merge-sort");
const quickBtn = document.getElementById("quick-sort");
const arrayContainer = document.getElementById("array");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

    bar.style.height = numbers[i] + "px";

    arrayContainer.appendChild(bar);
    } 
}

async function bubbleSort() {
    
    const bars = document.getElementsByClassName("bar");

    for(let i = 0; i < numbers.length; i++){
        for(let j = 0; j < numbers.length - i - 1; j++){

            bars[j].style.backgroundColor = "var(--compare-color)";
            bars[j + 1].style.backgroundColor = "var(--compare-color)";

            await sleep(50);

            if(numbers[j] > numbers[j + 1]){
                
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;

                bars[j].style.height = numbers[j] + "px";
                bars[j + 1].style.height = numbers[j + 1] + "px";

                await sleep(20);
            }

            bars[j].style.backgroundColor = "var(--bar-color)";
            bars[j + 1].style.backgroundColor = "var(--bar-color)";

        }

        bars[numbers.length - i - 1].style.backgroundColor = "var(--accent-bg)";
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName("bar");
    for(let i = 0; i < numbers.length; i++){
       let minIndex = i;
       bars[i].style.backgroundColor = "var(--min-color)";
       for(let j = i + 1; j < numbers.length; j++){
        bars[j].style.backgroundColor = "var(--compare-color)";
        await sleep(50);
        if(numbers[j] < numbers[minIndex]){
            if(minIndex !== i){
                bars[minIndex].style.backgroundColor = "var(--bar-color)";
            }
            minIndex = j;
            bars[minIndex].style.backgroundColor = "var(--min-color)";
        }else{
            bars[j].style.backgroundColor = "var(--bar-color)";
        }
       }
       if(minIndex !== i){
        let temp = numbers[i];
        numbers[i] = numbers[minIndex];
        numbers[minIndex] = temp;
        bars[i].style.height = numbers[i] + "px";
        bars[minIndex].style.height = numbers[minIndex] + "px";
       }
       bars[i].style.backgroundColor = "var(--accent-bg)";
       if(minIndex !==i){
        bars[minIndex].style.backgroundColor = "var(--bar-color)";
       }      
    }    
}

async function insertionSort() {
    const bars = document.getElementsByClassName("bar");
    
    for(let i = 1; i < numbers.length; i++){
        let key = numbers[i];
        let j = i - 1;

        bars[i].style.backgroundColor = "var(--min-color)";
        await sleep(100);
        while (j >= 0 && numbers[j] > key) {
            bars[j].style.backgroundColor = "var(--compare-color)";
            numbers[j + 1] = numbers[j];
            bars[j + 1].style.height = numbers[j + 1] + "px";
            
            await sleep(60);
            
            bars[j].style.backgroundColor = "var(--accent-bg)";
            bars[j + 1].style.backgroundColor = "var(--accent-bg)";
            j--;
    }

    numbers[j + 1] = key;
    bars[j + 1].style.height = key + "px";
        
    bars[j + 1].style.backgroundColor = "var(--accent-bg)";
        
    bars[0].style.backgroundColor = "var(--accent-bg)";
}
}

async function merge(start, mid, end) {
    const bars = document.getElementsByClassName("bar");

    let n1 = mid - start + 1;
    let n2 = end - mid;
    let left = [];
    let right = [];

    for (let i = 0; i < n1; i++){
        left[i] = numbers[start + i];
    } 
    for (let j = 0; j < n2; j++){
        right[j] = numbers[mid + 1 + j];
    } 
    
    let i = 0, j = 0, k = start;

    while (i < n1 && j < n2) {

        bars[start + i].style.backgroundColor = "var(--compare-color)";
        bars[mid + 1 + j].style.backgroundColor = "var(--compare-color)";
        await sleep(50);

        if (left[i] <= right[j]) {
            numbers[k] = left[i];
            i++;
        } else {
            numbers[k] = right[j];
            j++;
        }
        
        bars[k].style.height = numbers[k] + "px";
        bars[k].style.backgroundColor = "var(--min-color)";
        k++;
    }

    while (i < n1) {
        numbers[k] = left[i];
        bars[k].style.height = numbers[k] + "px";
        bars[k].style.backgroundColor = "var(--min-color)";
        i++; k++;
        await sleep(50);
    }

    while (j < n2) {
        numbers[k] = right[j];
        bars[k].style.height = numbers[k] + "px";
        bars[k].style.backgroundColor = "var(--min-color)";
        j++; k++;
        await sleep(50);
    }

    for (let x = start; x <= end; x++) {
        bars[x].style.backgroundColor = "var(--accent-bg)";
    }
}

async function mergeSortRecursive(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    await mergeSortRecursive(start, mid);
    await mergeSortRecursive(mid + 1, end);
    await merge(start, mid, end);
}

async function startMergeSort() {
    await mergeSortRecursive(0, numbers.length - 1);
}

async function partition(low, high) {
    const bars = document.getElementsByClassName("bar");
    let pivot = numbers[high]; 
    
    bars[high].style.backgroundColor = "var(--min-color)"; 
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "var(--compare-color)"; 
        await sleep(50);

        if (numbers[j] < pivot) {
            i++;
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            
            bars[i].style.height = numbers[i] + "px";
            bars[j].style.height = numbers[j] + "px";
        }
        
        bars[j].style.backgroundColor = "var(--bar-color)"; 
    }

    [numbers[i + 1], numbers[high]] = [numbers[high], numbers[i + 1]];
    bars[i + 1].style.height = numbers[i + 1] + "px";
    bars[high].style.height = numbers[high] + "px";
    
    bars[high].style.backgroundColor = "var(--bar-color)";
    bars[i + 1].style.backgroundColor = "var(--accent-bg)"; 

    return i + 1; 
}

async function quickSortRecursive(low, high) {
    const bars = document.getElementsByClassName("bar");

    if (low < high) {
        let pi = await partition(low, high);

        await quickSortRecursive(low, pi - 1);
        await quickSortRecursive(pi + 1, high);
        
        for(let k = low; k <= high; k++) {
            bars[k].style.backgroundColor = "var(--accent-bg)";
        }
    }
}

async function startQuickSort() {
    const bars = document.getElementsByClassName("bar");
    await quickSortRecursive(0, numbers.length - 1);
    for (let k = 0; k < numbers.length; k++) {
        bars[k].style.backgroundColor = "var(--accent-bg)";
        await sleep(10); 
    }
}


generateBtn.addEventListener("click", function(){
    numbers = [];
    generateRandomArray();
    renderBars();
});

bubbleBtn.addEventListener("click", bubbleSort);
selectionBtn.addEventListener("click", selectionSort);
insertionBtn.addEventListener("click", insertionSort);
mergeBtn.addEventListener("click", startMergeSort);
quickBtn.addEventListener("click", startQuickSort);

generateRandomArray();
renderBars();
console.log(numbers);