function sorting(arr) {
    let sorted = arr.slice().sort((a,b) => a-b);
    let diffs = [];
    arr.forEach((item,i) => {
        if (item !== sorted[i]) {
            diffs.push(i);
        }
    });
    if (diffs.length === 0) {
        console.log('yes');
    } else if (diffs.length === 2) {
        console.log('yes');
        console.log('swap',diffs[0]+1,diffs[1]+1);
    } else if (diffs.length > 2) {
        let subset = JSON.stringify(arr.slice(diffs[0],diffs[0]+diffs.length).reverse());
        let sortedSubset = JSON.stringify(sorted.slice(diffs[0],diffs[0]+diffs.length));
        if (subset === sortedSubset) {
            console.log('yes');
            console.log('reverse',diffs[0]+1,diffs[diffs.length-1]+1);
        } else {
            console.log('no');
        }
    } else {
        console.log('no');
    }
}
sorting([4, 2])