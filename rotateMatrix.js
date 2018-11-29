function toMatrix(lines, rows) {
    let result = [],
        parseIntBase10 = function(n) {
            return parseInt(n, 10);
        };
    for(let i = 0; i < rows; i++) {
        result.push(lines[i].split(' ').map(parseIntBase10));
    }
    return result;
}
function flattenRect(matrix, y, x, width, height) {
    let points = [],
        i = y, j = x;
    for(let k = width - 1; k > 0; k--, j--) {
        points.push({val: matrix[i][j], i: i, j: j});
    } //top
    for(k = height - 1; k > 0; k--, i++) {
        points.push({val: matrix[i][j],i: i,j: j});
    } //left
    for(k = width - 1; k > 0; k--, j++) {
        points.push({val: matrix[i][j],i: i,j: j});
    } //bottom
    for(k = height - 1; k > 0; k--, i--) {
        points.push({val: matrix[i][j],i: i,j: j});
    } //right
    return points;
}
function flatRotate(rect, places) {
    let clone = [],
        len = rect.length,
        temp;
    for(let i = 0, newI; i < len; i++) {
        newI = (i + places) % len;
        newCell = {
            val: rect[i].val,
            i: rect[newI].i,
            j: rect[newI].j
        };
        clone[newI] = newCell;
    }
    return clone;
}
function getRectangles(matrix, rows, cols) {
    let result = [],
        i = 0, j = cols - 1,
        nRects = Math.min(rows, cols) / 2;
    for(let k = 0; k < nRects; k++) {
        result.push(flattenRect(matrix,i,j,cols,rows));
        i++;
        j--;
        cols -= 2;
        rows -= 2;
    }
    return result;
}
function rectanglesToMatrix(rects, rows) {
    let matrix = [],
        curRect,
        curCell;
    for(let i = 0; i < rows; i++)
        matrix.push([]);
    for(i = 0; i < rects.length; i++) {
        curRect = rects[i];
        for(let j = 0; j < rects[i].length; j++) {
            curCell = curRect[j];
            matrix[curCell.i][curCell.j] = curCell.val;
        }
    }
    return matrix;
}
function processData(input) {
    let lines = input.split('\n'),
        params = lines[0].split(' '),
        rows = parseInt(params[0]),
        cols = parseInt(params[1]),
        rotations = parseInt(params[2]);
    lines.shift();
    let rects = getRectangles(toMatrix(lines, rows), rows, cols);
    for(let i = 0; i < rects.length; i++) {
        rects[i] = flatRotate(rects[i], rotations);
    }
    let rotated = rectanglesToMatrix(rects, rows);
    for(i = 0; i < rows; i++) {
        console.log(rotated[i].join(' '));
    }
}

let arr = `4 4 3
1 2 3 4
5 6 7 8
9 10 11 12
13 14 15 16`

processData(arr)