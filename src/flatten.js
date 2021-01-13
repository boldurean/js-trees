const flatten = (coll) => coll
  .reduce((acc, item) => {
    const newArr = Array.isArray(item) ? flatten(item) : [item];
    return [...acc, ...newArr];
  }, []);

export default flatten;

const list = [1, 2, [3, 5], [[4, 3], 2]];

// [1, 2, 3, 5, 4, 3, 2]
console.log(flatten(list));
