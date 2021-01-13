import path from 'path';
import {
  isFile, getName, getChildren, mkfile, mkdir,
} from '@hexlet/immutable-fs-trees';

const findFilesByName = (tree, str) => {
  const iter = (node, acc) => {
    const name = getName(node);
    const children = getChildren(node);
    const pathToFile = path.join(acc, name);
    if (isFile(node)) {
      return name.includes(str) ? pathToFile : [];
    }
    return children.flatMap((child) => iter(child, pathToFile));
  };
  return iter(tree, '');
};

// Подсказки
// eslint-disable-next-line max-len
// Для реализации этой логики вам понадобится аккумулятор, в котором будет храниться путь от корня до текущего узла. При проваливании внутрь директорий к нему добавляется имя текущей директории. В остальном логика работы идентична примеру из теории.
//   Переменную, содержащую внутри себя путь от корня до текущего узла, можно назвать ancestry.
//   Для построения путей используйте функцию path.join().
//   Проверку вхождения строк можно делать с помощью функции str.includes().

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

console.log(findFilesByName(tree, 'co'));
// ['/etc/nginx/nginx.conf', '/etc/consul/config.json']
