export function getQuickSort(array) {
    const auxiliaryArray = array.slice();
    const animations = [];
    sort(animations, auxiliaryArray, 0, array.length - 1);
    return animations;
}

function sort(animations, auxiliaryArray, low, high) {
    if(low < high) {
        const pi = partition(animations, auxiliaryArray, low, high);
        sort(animations, auxiliaryArray, low, (pi - 1));
        sort(animations, auxiliaryArray, (pi + 1), high);
    }
    else if (low === high) {
        animations.push(["SwapPivot", [auxiliaryArray[low], auxiliaryArray[low], low, low]]);
    }
}

function partition(animations, auxiliaryArray, low, high) {
    const pivot = auxiliaryArray[low];
    animations.push(["Pivot", low]);
    var i = low;
    var temp;
    for(let j = low + 1; j <= high; j ++) {
        animations.push(["Compare", j])
        if(auxiliaryArray[j] <= pivot) {
            i = i + 1;
            temp = auxiliaryArray[i];
            auxiliaryArray[i] = auxiliaryArray[j];
            auxiliaryArray[j] = temp;
            animations.push(["Swap", [auxiliaryArray[i], auxiliaryArray[j], i, j]]);
        } else 
        // animations.push([i, j]);
            animations.push(["Reset", j])
    }
    temp = auxiliaryArray[i];
    auxiliaryArray[i] = auxiliaryArray[low];
    auxiliaryArray[low] = temp;
    animations.push(["SwapPivot", [auxiliaryArray[i], auxiliaryArray[low], i, low]]);
    return i;
}