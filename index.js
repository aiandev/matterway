/**
 * @typedef {{isDirectory: boolean, name: string, files?: File[]}} File
 *
 * @param {File[]} files
 * @param {string[]} ignorePatterns
 * @returns {string[]}
 */
const getAllFilesExcept = (files, ignorePatterns) => {

  const filesWithFullPath     = getFilesWithFullPath(files);
  const ignorePatternsMappped = mappedIgnorePatterns(ignorePatterns)

  const listFiles = filesWithFullPath.filter((filePath) => {

    return ignorePatternsMappped.every((pattern) => {
      
      let result = true;

      if (!pattern.isWhiteList && filePath == pattern.path) {
        result = false;
      }

      if (
        pattern.isDirectory &&
        !pattern.isWhiteList &&
        filePath.startsWith(pattern.path + "/") &&
        !ignorePatterns.includes(`!${filePath}`)
      ) {
        result = false;
      }

      return result;
    });
  });

  return listFiles;
};

function getFilesWithFullPath(files, currentdirName = "") {
  let paths = [];
  files.forEach((file) => {
    if (file.isDirectory) {
      paths = [
        ...paths,
        ...getFilesWithFullPath(file.files, `${currentdirName}/${file.name}`),
      ];
    } else {
      paths.push(`${currentdirName}/${file.name}`);
    }
  });
  return paths;
}

function mappedIgnorePatterns(ignorePatterns){
  return ignorePatterns.map((pattern) => {
    const patternData = {
      isDirectory: false,
      isWhiteList: false,
      path: pattern,
    };

    if (!pattern.includes(".")) {
      patternData.isDirectory = true;
    }

    if (pattern.startsWith("!/")) {
      patternData.isWhiteList = true;
    }
    return patternData;
  });
}
module.exports.getAllFilesExcept = getAllFilesExcept;
