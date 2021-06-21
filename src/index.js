const pushPath = (json, jsonElement, levelPath, searchTerm, paths) => {
  const path = `${levelPath}.${jsonElement}`;
  if (typeof json[jsonElement] === 'string' && json[jsonElement].toLowerCase().includes(searchTerm)) {
    paths.push(path);
  } else if (
    (typeof json[jsonElement] === 'number' ||
      typeof json[jsonElement] === 'boolean' ||
      json[jsonElement] === null ||
      json[jsonElement] === undefined) &&
    String(json[jsonElement]).includes(searchTerm)
  ) {
    paths.push(path);
  } else if (typeof json[jsonElement] === 'object' && !(json[jsonElement] === null)) {
    const result = searchJson(json[jsonElement], searchTerm, path);
    if (result.length) {
      paths.push(...result);
    }
  }
};

/**
 * @param {Object} json
 * @param {String} searchTerm
 * @param {String} levelPath
 * @param {Boolean} isAlphabetically
 * @return {Array.<String>}
 */
const searchJson = (json, searchTerm, levelPath = 'root', isAlphabetically = false) => {
  const paths = [];

  if (!searchTerm) {
    return paths;
  }

  const normalized = searchTerm.toLowerCase();
  if (isAlphabetically) {
    for (const jsonElement of Object.keys(json).sort()) {
      pushPath(json, jsonElement, levelPath, normalized, paths);
    }
  } else {
    for (const jsonElement in json) {
      pushPath(json, jsonElement, levelPath, normalized, paths);
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
    if (typeof json[jsonElement] === 'object' && !(json[jsonElement] === null)) {
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
