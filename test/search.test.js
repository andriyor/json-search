const { searchJson, jsonFlatPaths } = require('../src/index');

const json = {
  array: [1, 2, 3],
  boolean: false,
  color: 'gold',
  null: null,
  undefined: undefined,
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

describe('searchJson', () => {
  test('search number', () => {
    expect(searchJson(json, '2')).toStrictEqual(['root.array.1', 'root.number']);
  });
  test('search null', () => {
    expect(searchJson(json, 'nul')).toStrictEqual(['root.null']);
  });

  test('search undef', () => {
    expect(searchJson(json, 'undef')).toStrictEqual(['root.undefined']);
  });

  test('root name', () => {
    expect(searchJson(json, '2', 'main')).toStrictEqual(['main.array.1', 'main.number']);
  });

  test('isAlphabetically', () => {
    expect(searchJson(json, 'Hello', 'main', true)).toStrictEqual([
      'main.arr.0',
      'main.obj.string',
      'main.obj.obj2.string',
      'main.string',
    ]);
  });

  test('search substring', () => {
    expect(searchJson(json, 'ell')).toStrictEqual([
      'root.string',
      'root.obj.string',
      'root.obj.obj2.string',
      'root.arr.0',
    ]);
  });

  test('search substring', () => {
    expect(searchJson(json, '', 'root')).toStrictEqual([]);
  });
});

describe('jsonPaths', () => {
  test('flat paths', () => {
    expect(jsonFlatPaths(json)).toStrictEqual([
      'root.array.0',
      'root.array.1',
      'root.array.2',
      'root.boolean',
      'root.color',
      'root.null',
      'root.undefined',
      'root.number',
      'root.object.a',
      'root.object.c',
      'root.string',
      'root.obj.string',
      'root.obj.obj2.string',
      'root.arr.0',
      'root.arr.1',
      'root.New item',
    ]);
  });
});
