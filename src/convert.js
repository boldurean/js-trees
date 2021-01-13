const convert = (coll) => coll
  .reduce((acc, node) => {
    const [key, value] = node;
    const newValue = Array.isArray(value) ? convert(value) : value;
    return { ...acc, [key]: newValue };
  }, {});

export default convert;

const result = [
  ['key', [['key2', 'anotherValue']]],
  ['key2', 'value2'],
];

// { key: { key2: 'anotherValue' }, key2: 'value2' }

console.log(convert(result));

const tree4 = [
  ['key2', 'value2'],
  ['anotherKey', [
    ['key2', false],
    ['innerKey', []],
  ]],
  ['key', null],
  ['anotherKey2', [
    ['wow', [['one', 'two'], ['three', 'four']]],
    ['key2', true],
  ]],
];

// {
//     anotherKey: {
//       innerKey: {},
//       key2: false,
//     },
//     anotherKey2: {
//       key2: true,
//       wow: {
//         one: 'two',
//         three: 'four',
//       },
//     },
//     key: null,
//     key2: 'value2',
//   }

console.log(convert(tree4));
