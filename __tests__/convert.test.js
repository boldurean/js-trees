import convert from '../src/convert.js';

test('convert', () => {
  const tree1 = [];
  const result1 = convert(tree1);
  expect(result1).toEqual({});

  const tree2 = [['key', 'value']];
  const result2 = convert(tree2);
  expect(result2).toEqual({ key: 'value' });

  const tree3 = [['key2', 'value2'], ['key', 'value']];
  const result3 = convert(tree3);
  expect(result3).toEqual({ key: 'value', key2: 'value2' });

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
  const result4 = convert(tree4);
  expect(result4).toEqual({
    anotherKey: {
      innerKey: {}, key2: false,
    },
    anotherKey2: {
      key2: true,
      wow: {
        one: 'two',
        three: 'four',
      },
    },
    key: null,
    key2: 'value2',
  });
});
