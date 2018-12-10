const fs = require('fs');
let foundCouple = 0;
let foundTriple = 0;
const combinations = fs.readFileSync('data/02.txt').toString().split('\n');
combinations.pop();

combinations.map(code => {
        // Returns an Object that has keys the letter of the array
        // and values the amount of times found in the sequence.
        code = code.split('')
            .reduce((c, n) => {
                c[n] = c[n] ? c[n] + 1 : 1;
                return c;
            }, {});

        return code;

    }).forEach((combination) => {

        let hasFoundedCouple = false;
        let hasFoundedTriple = false;

        Object.keys(combination).forEach(char => {
            if (!hasFoundedCouple && combination[char] === 2) {
                foundCouple += 1;
                hasFoundedCouple = true;
            }

            if (!hasFoundedTriple && combination[char] === 3) {
                foundTriple += 1;
                hasFoundedTriple = true;
            }
        });

    });


console.log(foundCouple, foundTriple, foundCouple * foundTriple);

const commonFoundPositions = combinations.reduce((state, next) => {

    const word = next.split('');
    const found = combinations.reduce((state, next) => {

        const comparedWord = next.split('');

        let result = comparedWord.length > word.length
            ? comparedWord.filter((letter, index) => letter !== word[index])
            : word.filter((letter, index) => letter !== comparedWord[index]);

        if (result.length === 1) {
            state = comparedWord;
        }

        return state;

    }, []);

    if (found.length > 0) {
        state.push([ word, found ]);
    }

    return state;

}, []).map(found => {

    return (found[0].length > found[1].length
        ? found[0].filter((letter, index) => letter === found[1][index])
            : found[1].filter((letter, index) => letter === found[0][index])).join('');

});

console.log(commonFoundPositions);
