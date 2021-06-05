const _ = require('lodash');

/**
 * @param {Object} json
 * @param {String} searchTerm
 * @param {String} levelPath
 * @return {Array.<String>}
 */
const searchJson = (json, searchTerm, levelPath) => {
  const paths = [];

  for (const jsonElement in json) {
    const path = `${levelPath}.${jsonElement}`;
    if (_.isString(json[jsonElement]) && json[jsonElement].toLowerCase().includes(searchTerm)) {
      paths.push(path);
    } else if (_.isNumber(json[jsonElement]) && String(json[jsonElement]).includes(searchTerm)) {
      paths.push(path);
    } else if (_.isBoolean(json[jsonElement]) && String(json[jsonElement]).includes(searchTerm)) {
      paths.push(path);
    } else if (_.isObject(json[jsonElement])) {
      const result = searchJson(json[jsonElement], searchTerm, path);
      if (result.length) {
        paths.push(...result);
      }
    }
  }

  return paths;
};

module.exports = {
  searchJson,
};
