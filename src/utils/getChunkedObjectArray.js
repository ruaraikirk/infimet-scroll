import { splitEvery, sort } from 'ramda';

/**
 * Function which takes array of art ids, randomises then splits it into arrays of length "chunkSize"
 * @param {Array<number>} arr e.g.  [1,2,3,4,5,6,7,8,9,10]
 * @param {number} chunkSize e.g. 3
 * @returns {Array<Array<number>>} e.g. [[7,3,4][1,8,9][6,5,10][2]]
 */

const getChunkedObjectArray = (arr, chunkSize = 6) => {
  if (!Array.isArray(arr)) throw new Error('Collection is not an array');
  const shuffledArray = sort(() => Math.random() - 0.5, arr);
  const chunkedArray = splitEvery(chunkSize, shuffledArray);
  return chunkedArray;
};

export default getChunkedObjectArray;
