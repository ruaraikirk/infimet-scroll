import { useState, useEffect } from 'react';
import { objectClient } from '../network/clients';
import getChunkedObjectArray from '../utils/getChunkedObjectArray';

const useMetData = () => {
  const [objectIds, setObjectIds] = useState(null);
  const [objects, setObjects] = useState([]);
  const [chunk, setChunk] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const loadListData = async (deptId) => {
    setObjectIds(null);
    setObjects([]);
    const loadListFn = deptId ? () => objectClient.objects.getByDept(deptId) : () => objectClient.objects.get();
    const objectsResponse = await loadListFn();
    const chunkedObjectIds = getChunkedObjectArray(objectsResponse.objectIDs);
    setObjectIds(chunkedObjectIds);
  };

  useEffect(() => {
    loadListData();
  }, []);

  return {
    states: {
      objectIds,
      objects,
      chunk,
      fetching,
      error
    },
    actions: {
      setObjectIds,
      setObjects,
      setChunk,
      setFetching,
      setError,
      loadListData
    }
  };
};

export default useMetData;
