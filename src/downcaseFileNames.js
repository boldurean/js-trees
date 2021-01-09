import {
  mkdir, mkfile, isFile, getName, getMeta, getChildren,
} from '@hexlet/immutable-fs-trees';
import _ from 'lodash';

const downcaseFileNames = (node) => {
  const name = getName(node);
  const newMeta = _.cloneDeep(getMeta(node));

  if (isFile(node)) {
    return mkfile(name.toLowerCase(), newMeta);
  }
  const children = getChildren(node);
  const newChildren = children.map(downcaseFileNames);
  return mkdir(name, newChildren, newMeta);
};

export default downcaseFileNames;

const tree = mkdir('/', [
  mkdir('eTc', [
    mkdir('NgiNx'),
    mkdir('CONSUL', [
      mkfile('config.json'),
    ]),
  ]),
  mkfile('hOsts'),
]);

const newTree = downcaseFileNames(tree);

console.log(newTree);
