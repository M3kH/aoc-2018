const fs = require('fs');
const tiles = fs.readFileSync('data/03.txt').toString().split('\n');
const popped = tiles.pop();

// const tiles = [
//     "#1 @ 1,3: 4x4",
//     "#2 @ 3,1: 4x4",
//     "#3 @ 5,5: 2x2"
// ];

function getTileDetails(stringValue) {
    const id = stringValue.match(new RegExp('#(.*).@'))[1];
    const [x, y] = stringValue.match(new RegExp('@.(.*):'))[1].split(',').map(el => parseInt(el));
    const [w, h] = stringValue.match(new RegExp(':.(.*)$'))[1].split('x').map(el => parseInt(el));

    return {
        id,
        x,
        y,
        w,
        h
    };

}

const boardSize = tiles.reduce((state, el) => {
    const {y, x, w, h} = getTileDetails(el);
    const totalRows = y + h;
    const totalColumns = x + w;

    if (totalColumns > state.columns) {
        state.columns = totalColumns;
    }

    if (totalRows > state.rows) {
        state.rows = totalRows;
    }

    return state;

}, {columns: 0, rows: 0});


const board = [...Array(boardSize.rows)].map((el, index) => {
    return [...Array(boardSize.columns)].map(el => '.');
});


const drawedBoard = tiles.reduce((board, next) => {

    const {id, x, y, w, h} = getTileDetails(next);

    for(let row = y; row < y+h; row++) {
        for(let column = x; column < x+w; column++) {
            board[row][column] = board[row][column] === '.' ? id.slice(0,1) : 'X';
        }
    }

    return board;

}, board);

const overLappedElements = [].concat(...drawedBoard).filter(el => el === 'X').length;

//console.log(drawedBoard.map(columns => columns.join('')).join('\n'));
console.log(overLappedElements);
