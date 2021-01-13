import {
  getChildren, getMeta, getName, isFile, mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import _ from 'lodash';

const getFilesCount = (node) => {
  if (isFile(node)) {
    const { size } = getMeta(node);
    return size;
  }

  const children = getChildren(node);
  const descendantCounts = children.map(getFilesCount);
  return _.sum(descendantCounts);
};

const du = (node) => {
  const children = getChildren(node);
  return children
    .map((child) => [getName(child), getFilesCount(child)])
    .sort(([, size1], [, size2]) => size2 - size1);
};

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

console.log(du(getChildren(tree)[0]));
// [
//   ['etc', 10280],
//   ['hosts', 3500],
//   ['resolve', 1000],
// ]
