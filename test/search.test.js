const { searchJson } = require('../src/index');

const json = {
  array: [1, 2, 3],
  boolean: false,
  color: 'gold',
  null: null,
  number: 123,
  object: {
    a: 'b',
    c: 'd',
  },
  string: 'Hello World',
  obj: {
    string: 'Hello World',
    obj2: {
      string: 'Hello World',
    },
  },
  arr: ['Hello World', 'kek'],
  'New item': '',
};

test('search number', () => {
  expect(searchJson(json, '2', 'root')).toStrictEqual(['root.array.1', 'root.number']);
});

test('search substring', () => {
  expect(searchJson(json, 'ell', 'root')).toStrictEqual([
    'root.string',
    'root.obj.string',
    'root.obj.obj2.string',
    'root.arr.0',
  ]);
});

test('search substring', () => {
  expect(searchJson(json, '', 'root')).toStrictEqual([]);
});
