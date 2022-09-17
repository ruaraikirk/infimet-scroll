import { splitEvery, sort } from 'ramda';

const getChunkedObjectArray = (arr, chunkSize = 6) => {
  const shuffledArray = sort(() => Math.random() - 0.5, arr);
  const chunkedArray = splitEvery(chunkSize, shuffledArray);
  return chunkedArray;
};

export default getChunkedObjectArray;
