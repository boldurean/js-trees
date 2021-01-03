export default (three) => {
  const result = three.filter((element) => Array.isArray(element));
  return result.flat();
};

// alternative

export const removeFirstLevel = (tree) => {
  const nodes = tree.filter(Array.isArray);
  return nodes.flat();
};
