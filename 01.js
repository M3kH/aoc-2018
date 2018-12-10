const fs = require('fs');
const frequencies = fs.readFileSync('data/01.txt').toString().split('\n').map(el => new Number(el));
frequencies.pop();

const totalFreq = frequencies.reduce((nextValue, currentState) => {

    return currentState + nextValue;

}, 0);

const initialState = {graph: {}, total: 0};

function recursiveSearch(state, resolve) {

    let firstFound;
    state = frequencies.reduce((currentValue, nextValue) => {

        currentValue.total = currentValue.total + nextValue;

        const {total} = currentValue;
        currentValue.graph[total] = currentValue.graph[total] ? currentValue.graph[total] + 1 : 1;


        if (!firstFound && currentValue.graph[total] === 2) {
            firstFound = total;
        }

        return currentValue;

    }, state);

    if (!firstFound) return recursiveSearch(state, resolve);
    resolve({firstFound, state});

}

new Promise((resolve) => {
    recursiveSearch(initialState, resolve);
}).then(({firstFound, state}) => {
    console.log('Founded')
    console.log(firstFound);
}).catch(err => console.error(err));

console.log(frequencies[0], frequencies[frequencies.length - 1]);

// +3, +3, +4, -2, -4, +3, +3, +4, -2, -4
// 0, 3, 6, 10, 8, 4, 7, 10, 14, 12, 8
