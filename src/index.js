/**
 * @param {Object} json
 * @param {String} searchTerm
 * @param {String} levelPath
 * @return {Array.<String>}
 */
const searchJson = (json, searchTerm, levelPath = 'root') => {
  const paths = [];

  if (!searchTerm) {
    return paths;
  }

  for (const jsonElement in json) {
    const path = `${levelPath}.${jsonElement}`;
    if (typeof json[jsonElement] === 'string' && json[jsonElement].toLowerCase().includes(searchTerm)) {
      paths.push(path);
    } else if (
      (typeof json[jsonElement] === 'number' || typeof json[jsonElement] === 'boolean') &&
      String(json[jsonElement]).includes(searchTerm)
    ) {
      paths.push(path);
    } else if (typeof json[jsonElement] === 'object') {
      const result = searchJson(json[jsonElement], searchTerm, path);
      if (result.length) {
        paths.push(...result);
      }
    }
  }

  return paths;
};

/**
 * @param {Object} json
 * @param {String} levelPath
 * @return {Array.<String>}
 */
const jsonFlatPaths = (json, levelPath = 'root') => {
  const paths = [];

  for (const jsonElement in json) {
    const path = `${levelPath}.${jsonElement}`;
    if (typeof json[jsonElement] === 'object') {
      const result = jsonFlatPaths(json[jsonElement], path);
      if (result.length) {
        paths.push(...result);
      }
    } else {
      paths.push(path);
    }
  }

  return paths;
};

module.exports = {
  searchJson,
  jsonFlatPaths,
};
