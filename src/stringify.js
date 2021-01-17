const stringify = (data, replacer = ' ', count = 1) => {
  const iter = (item, depth) => {
    if (typeof item !== 'object' || item === null) {
      return String(item);
    }
    const tab = replacer.repeat(count * depth);
    const bracketTab = replacer.repeat(count * (depth - 1));
    const entries = Object.entries(item);
    const result = entries.map(([key, value]) => `${tab}${key}: ${iter(value, depth + 1)}`);
    return `{\n${result.join('\n')}\n${bracketTab}}`;
  };
  return iter(data, 1);
};

const tree = {
  hello: 'world',
  is: true,
  nested: {
    count: 5,
  },
};

console.log(stringify(tree, '|-', 2));

// {
// |-|-hello: world
// |-|-is: true
// |-|-nested: {
// |-|-|-|-count: 5
// |-|-}
// }

const data2 = {
  string: 'value',
  boolean: 'true',
  number: 5,
  float: 1.25,
  object: {
    5: 'number',
    1.25: 'float',
    null: null,
    true: 'boolean',
    value: 'string',
    nested: {
      boolean: 'true',
      float: 1.25,
      string: 'value',
      number: 5,
      null: null,
    },
  },
};

console.log(stringify(data2, '.', 3));
