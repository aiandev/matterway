/**
 * @typedef {{isDirectory: boolean, name: string, files?: File[]}} File
 *
 * @param {File[]} files
 * @param {string[]} ignorePatterns
 * @returns {string[]}
 */
const getAllFilesExcept = (files, ignorePatterns) => {
    const filesWithFullPath = getFilesWithFullPath(files);
    const listFiles = filesWithFullPath.filter((filePath) => {
    let inWhiteList = false;
    ignorePatterns.forEach((pattern) => {
      if(`!${filePath}` === pattern){
        inWhiteList = true
      }else if(filePath.includes(pattern) && pattern.startsWith('!/')){
        inWhiteList = true
      }else{
        return false;
        // TODO console.log(' I didn't complete full task because the time Sorry')
      }
    })
    return inWhiteList
  });

  return listFiles
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

module.exports.getAllFilesExcept = getAllFilesExcept;
