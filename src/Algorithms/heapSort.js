export function getHeapSort(array) {
    const auxiliaryArray = array.slice(0);
    const animations = [];
    sort(animations, auxiliaryArray);
    console.log(animations);
    return animations;
}

function sort(animations, auxiliaryArray) {
    const len = auxiliaryArray.length;
    var temp;
    for(let i = Math.floor((len / 2) - 1); i >= 0; i --) {
        
        heapify(animations, auxiliaryArray, len, i);
    }

    for(let i = len - 1; i >= 0; i --) {
        temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[0];
        auxiliaryArray[0] = temp;
        
        animations.push(["SwapLargest", [auxiliaryArray[0], auxiliaryArray[i], 0, i]]);
        heapify(animations, auxiliaryArray, i, 0);
    }
}

function heapify(animations, auxiliaryArray, n, i) {
    var temp;
    var largest = i;
    var l = (i * 2) + 1;
    var r = (i * 2) + 2;
    animations.push(["Parent", i]);
    animations.push(["Compare", [l, n]]);
    if(l < n && auxiliaryArray[l] > auxiliaryArray[largest]){
        largest = l;
    }
    animations.push(["Compare", [r, n]]);
    if(r < n && auxiliaryArray[r] > auxiliaryArray[largest]){
        largest = r;
    }

    if(largest !== i) {
        temp = auxiliaryArray[largest];
        auxiliaryArray[largest] = auxiliaryArray[i];
        auxiliaryArray[i] = temp;

        animations.push(["Swap", [auxiliaryArray[largest], auxiliaryArray[i], largest, i]]);
        if(l < n)
            animations.push(["Reset", [i, l]]);
        if(r < n)
            animations.push(["Reset", [i, r]]);

        heapify(animations, auxiliaryArray, n, largest);
    }

    if(l < n)
        animations.push(["Reset", [i, l]]);
    if(r < n)
        animations.push(["Reset", [i, r]]);
}
