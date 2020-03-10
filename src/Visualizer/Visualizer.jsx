import React from 'react';
import * as Merge from '../Algorithms/mergeSort.js'
import * as Bubble from '../Algorithms/bubbleSort.js'
import * as Quick from '../Algorithms/quickSort.js'
import * as Heap from '../Algorithms/heapSort.js'

import './Visualizer.css';

// Change this value for the speed of the animations.
var ANIMATION_SPEED_MS = 10;

// Set MAX and MIN range for the array values
const MAX  = 350;
const MIN = 15;

// Main Color of the Sorted Values 
const PRIMARY_COLOR = '#1da1f2';

// Color when compared
const SECONDARY_COLOR = 'white';

// Default Color
const DEFAULT_COLOR = 'darkgrey';

// Color to show visited in that iteration
const INTERMEDIATE_COLOR = 'darkcyan';

// Color to focus on a particular position like pivot
const HIGHLIGHT_COLOR = 'yellow';

// Speed Values in String
var speedRating = "Average";

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            NUMBER_OF_ARRAY_BARS: 50,
            Speed: 3
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    // Assigns Delay in code per Animation
    speedAssign(speed) {
        switch(speed){
            case 1: ANIMATION_SPEED_MS = 2000; break;
            case 2: ANIMATION_SPEED_MS = 1000; break;
            case 3: ANIMATION_SPEED_MS = 500; break;
            case 4: ANIMATION_SPEED_MS = 50; break;
            case 5: ANIMATION_SPEED_MS = 1; break;
            default: console.log("Error");  
        }
    }

    // Rates the Speed in String
    speedRate(speed)
    {
        switch(speed){
            case 1: speedRating = "Slower"; break;
            case 2: speedRating = "Slow"; break;
            case 3: speedRating = "Average"; break;
            case 4: speedRating = "Fast"; break;
            case 5: speedRating = "Faster"; break; 
            default: console.log("Error");
        }
    }

    // Resets Array and changes to Default Color
    prepReset() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i ++)
            arrayBars[i].style.backgroundColor = DEFAULT_COLOR;
        this.resetArray();
    }

    // Resets the array in State
    resetArray() {
        const array = [];
        for(let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i ++) {
            array.push(Math.floor(Math.random() * MAX + MIN));
        }
        this.setState({array});
    }

    render() {
        const {array} = this.state;
        var length;
        var speed;
        return (
            <div className = "html-container">
                <h2 style={{color: "#1da1f2"}}>SORTING ALGORITHMS VISUALIZER</h2>
                <nav className = "button-container">
                        <li id = "randomize">
                            <p id ="random"onClick = {() => this.prepReset()}>Randomize Array!</p>
                        </li>


                        <li id = "slider1">
                                <label>Length </label>
                                <input type="range" min={4} max={100} defaultValue="50" step="1" value={length}  
                                onChange={e => {
                                    const x = parseInt(e.target.value, 10);
                                    console.log(x+"Here");
                                    this.setState((state) => ({ NUMBER_OF_ARRAY_BARS: x}));
                                    this.prepReset()
                                }}
                                id="sliderL"/>
                                <span className="tooltip1">{this.state.array.length}</span>
                        </li>

                        <li id = "slider2">
                                <label>Speed</label>
                                <input type="range" min="1" max="5" defaultValue="3" step="1"  value={speed}
                                onChange={e => {
                                    const y = parseInt(e.target.value, 10);
                                    console.log(y+"Here123");
                                    this.setState((state) => ({ Speed: y}));
                                    this.speedAssign(y);
                                    this.speedRate(y);
                                }}
                                id="sliderS"/>
                                <span className="tooltip1">{speedRating}</span>
                        </li>


                        <li id = "sorting-buttons">
                            <p id = "merge" onClick = {() => this.mergeSort()}>Merge Sort <span className="tooltipMerge"><b>Time Complexity</b>
                            <br></br>Best Case: Ω(nlogn)<br></br>Average Case: θ(nlogn)<br></br>Worst Case: O(nlogn)</span></p>

                            <p id = "quick" onClick = {() => this.quickSort()}>Quick Sort <span className="tooltipQuick"><b>Time Complexity</b>
                            <br></br>Best Case: Ω(nlogn)<br></br>Average Case: θ(nlogn)<br></br>Worst Case: O(n<sup>2</sup>)</span></p>
                            
                            <p id = "heap" onClick = {() => this.heapSort()}>Heap Sort <span className="tooltipHeap"><b>Time Complexity</b>
                            <br></br>Best Case: Ω(nlogn)<br></br>Average Case: θ(nlogn)<br></br>Worst Case: O(nlogn)</span></p>
                            
                            <p id = "bubble" onClick = {() => this.bubbleSort()}>Bubble Sort <span className="tooltipBubble"><b>Time Complexity</b>
                            <br></br>Best Case: Ω(n)<br></br>Average Case: θ(n<sup>2</sup>)<br></br>Worst Case: O(n<sup>2</sup>)</span></p>
                            {/* <button onClick = {() => this.testing()}>Testing</button> */}
                        </li>
                </nav>

                <div className = "array-container">

                {array.map((value, index) => (
                    <div className = "array-bar" key = {index} style = {{height: `${value}px`}}></div>
                ))}
                </div>
            </div>    
            
        );
    }  

    // To enable and disable buttons while in progress
    enable_disable(val) {
        const list = ["random", "merge", "quick", "heap", "bubble", "sliderL", "sliderS"];
        for (let i = 0; i < list.length; i ++) {
                document.getElementById(list[i]).style.pointerEvents = val;
        }
    }

    // Merge Sort
    mergeSort() {
        const button = document.getElementById("merge").style;
        button.backgroundColor = "#1da1f2";
        button.color = "white";
        this.enable_disable("none");
        const animations = Merge.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {    
            const [barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : INTERMEDIATE_COLOR;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
            } else {
            setTimeout(() => {
                const [barOneIndex, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
            }
        }
        setTimeout(() => {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i ++)
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        button.removeProperty("background-color");
        button.removeProperty("color");

        this.enable_disable("auto");
        }, animations.length * ANIMATION_SPEED_MS);

        
    }

    // Quick Sort
    quickSort() {
        const button = document.getElementById("quick").style;
        button.backgroundColor = "#1da1f2";
        button.color = "white";
        this.enable_disable("none");
        const animations = Quick.getQuickSort(this.state.array);
        for(let i = 0; i < animations.length; i ++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [message, value] = animations[i];
            if (message === "Pivot") {
                const pivot = value;
                const barStyle = arrayBars[pivot].style;
                setTimeout(() => {
                    barStyle.backgroundColor = HIGHLIGHT_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            else if (message === "Compare") {
                const compare = value;
                const barStyle = arrayBars[compare].style;
                setTimeout(() => {
                    barStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            else if (message === "Swap") {
                const [newHeight1, newHeight2, barOneIndex, barTwoIndex] = value;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    barOneStyle.height = `${newHeight1}px`;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * ANIMATION_SPEED_MS);
                setTimeout(() => {
                    barTwoStyle.backgroundColor = DEFAULT_COLOR;
                    barOneStyle.backgroundColor = INTERMEDIATE_COLOR;
                }, i * ANIMATION_SPEED_MS);

            }
            else if (message === "SwapPivot") {
                const [newHeight1, newHeight2, barOneIndex, barTwoIndex] = value;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barTwoStyle.backgroundColor = INTERMEDIATE_COLOR;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barOneStyle.height = `${newHeight1}px`;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * ANIMATION_SPEED_MS);
            }
            else if (message === "Reset") {
                const reset = value;
                const barStyle = arrayBars[reset].style;
                setTimeout(() => {
                    barStyle.backgroundColor = DEFAULT_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                for (let i = 0; i < arrayBars.length; i ++)
                    arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
                button.removeProperty("background-color");
                button.removeProperty("color");
                this.enable_disable("auto");
                }, animations.length * ANIMATION_SPEED_MS);
        }
    }

    // Heap Sort
    heapSort() {
        const button = document.getElementById("heap").style;
        button.backgroundColor = "#1da1f2";
        button.color = "white";
        this.enable_disable("none");
        const animations = Heap.getHeapSort(this.state.array);
        for( let i = 0; i < animations.length; i ++ ) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [message, value] = animations[i];
            if(message === "Parent") {
                const parent = value;
                const barStyle = arrayBars[parent].style;
                setTimeout(() => {
                    console.log("Parent Chosen"+parent);
                    barStyle.backgroundColor = HIGHLIGHT_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            else if(message === "Compare") {
                const [compare, limit] = value;
                if(compare < limit){
                    const barStyle = arrayBars[compare].style;
                    setTimeout(() => {
                        console.log("Compare with"+compare);
                        barStyle.backgroundColor = SECONDARY_COLOR;
                    }, i * ANIMATION_SPEED_MS);
                }
                
            }
            else if (message === "Swap") {
                const [newHeight1, newHeight2, barOneIndex, barTwoIndex] = value;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    console.log("Swapping with: "+barOneIndex+"\t"+barTwoIndex);
                    barOneStyle.height = `${newHeight1}px`;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * ANIMATION_SPEED_MS);
                setTimeout(() => {
                    barTwoStyle.backgroundColor = INTERMEDIATE_COLOR;
                    barOneStyle.backgroundColor = INTERMEDIATE_COLOR;
                }, i * ANIMATION_SPEED_MS);

            }
            else if (message === "Reset") {
                const [barParentIndex, barIndex] = value;
                const barParentStyle = arrayBars[barParentIndex].style;
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    if(barStyle.backgroundColor !== 'darkcyan'){
                        barStyle.backgroundColor = DEFAULT_COLOR;
                    }
                    if(barParentStyle.backgroundColor !== 'darkcyan'){
                        barParentStyle.backgroundColor = DEFAULT_COLOR;                    
                    }
                        
                }, i * ANIMATION_SPEED_MS);
            }
            else if (message === "SwapLargest") {
                const [newHeight1, newHeight2, barOneIndex, barTwoIndex] = value;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    console.log("Final Swapping with: "+barOneIndex+"\t"+barTwoIndex);
                    barOneStyle.height = `${newHeight1}px`;
                    barTwoStyle.height = `${newHeight2}px`;
                }, i * ANIMATION_SPEED_MS);
                setTimeout(() => {
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    barOneStyle.backgroundColor = INTERMEDIATE_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                for (let i = 0; i < arrayBars.length; i ++)
                    arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
                button.removeProperty("background-color");
                button.removeProperty("color");
                this.enable_disable("auto");
                }, animations.length * ANIMATION_SPEED_MS);
        }
    }

    //Bubble Sort
    bubbleSort() {
        const button = document.getElementById("bubble").style;
        button.backgroundColor = "#1da1f2";
        button.color = "white";
        this.enable_disable("none");
        const animations = Bubble.getBubbleSort(this.state.array);
        var len = (this.state.array.length - 1);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 1;
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color1 = i % 3 === 0 ? SECONDARY_COLOR : INTERMEDIATE_COLOR;
                const color2 = i % 3 === 0 ? SECONDARY_COLOR : INTERMEDIATE_COLOR;                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color1;
                    barTwoStyle.backgroundColor = color2;
                    if (i % 3 === 2 && barTwoIndex === len) {
                        len --;
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
                        if(len === 0)
                            barOneStyle.backgroundColor = PRIMARY_COLOR;
                    }
                    
                  }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [newHeight1, newHeight2] = animations[i];
                    const [barOneIndex, barTwoIndex] = animations[i + 1];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;
                    barOneStyle.height = `${newHeight1}px`;
                    barTwoStyle.height = `${newHeight2}px`;
                  }, i * ANIMATION_SPEED_MS);
            }
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                for (let i = 0; i < arrayBars.length; i ++)
                    arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
                button.removeProperty("background-color");
                button.removeProperty("color");
                this.enable_disable("auto");
                }, animations.length * ANIMATION_SPEED_MS);
        }
    }

    // testing() {
    //     var max = 1000;
    //     for (let i = 0; i < 1000; i ++){
    //         const arrayTest = [];
    //         const len = Math.floor(Math.random() * max + 1);
    //         for (let j = 0; j < len; j ++){
    //             arrayTest.push(Math.floor(Math.random() * max));
    //         }
    //         // console.log("arrayTest");
    //         // console.log(arrayTest);
    //         const jsarray = arrayTest.slice().sort((a, b) => a - b);
    //         const sortedArray = Heap.getHeapSort(arrayTest);
    //         // console.log(jsarray);
    //         // console.log(sortedArray);
    //         console.log(ifEqual(jsarray, sortedArray));
    //     }
    // }
}

// function ifEqual(arr1, arr2) {
//     if (arr1.length !== arr2.length) 
//         return false;
//     for (let i = 0; i < arr1.length; i ++){
//         if(arr1[i] !== arr2[i])
//         return false;
//     }
//     return true;
// }