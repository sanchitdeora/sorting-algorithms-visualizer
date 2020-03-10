export function getBubbleSort(array) {
    const auxiliaryArray = array.slice();
    const animations = [];
    console.log(auxiliaryArray);
    const length = array.length;
    var temp;
    for (let i = 0; i < length - 1; i ++) {
        for (let j = 0; j < length - i - 1; j ++) {
            animations.push([j, (j +1)]);
            if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                temp = auxiliaryArray[j];
                auxiliaryArray[j] = auxiliaryArray[j + 1];
                auxiliaryArray[j + 1] = temp;
            }
            animations.push([auxiliaryArray[j], auxiliaryArray[j + 1]]);
            animations.push([j, j + 1]);
        }
        // animations.push(["End of Iteration", length - 1 - i]);
    }
    console.log(animations);
    return animations;
}