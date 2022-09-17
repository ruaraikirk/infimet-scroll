import React, { useEffect, useState } from 'react';
import { flatten, isEmpty } from 'ramda';
import Header from './components/Header';
import Footer from './components/Footer';
import Departments from './components/Departments';
import Body from './components/Body';
import { objectClient } from './network/clients';
import getChunkedObjectArray from './utils/getChunkedObjectArray';

const App = () => {
  const [objectIds, setObjectIds] = useState(null);
  const [objects, setObjects] = useState([]);
  const [chunk, setChunk] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const loadListData = async (deptId) => {
    setObjects([]);
    const loadListFn = deptId ? () => objectClient.objects.getByDept(deptId) : () => objectClient.objects.get();
    const objectsResponse = await loadListFn();
    const chunkedObjectIds = getChunkedObjectArray(objectsResponse.objectIDs);
    setObjectIds(chunkedObjectIds);
  };

  const fetchObjects = async () => {
    if (fetching) {
      return;
    }
    if (objectIds && !isEmpty(objectIds)) {
      setFetching(true);
      // Prepare network calls
      const promises = objectIds[chunk].map((id) => {
        return objectClient.object.get(id);
      });
      // Handle situation if some requests fail. In this case catch it and return ({ error }) from it, thus recovering from exception.
      const promisesResolved = promises.map((promise) => promise.catch((err) => ({ err })));
      // Make calls and dispatch
      await Promise.all(promisesResolved)
        .then((response) => flatten(response))
        .then((flatResponse) => {
          const updatedObjectList = [...objects, ...flatResponse];
          setObjects(updatedObjectList);
          setChunk(chunk + 1);
        })
        .catch(() => setError(true))
        .finally(() => {
          setFetching(false);
        });
    }
  };

  useEffect(() => {
    loadListData();
  }, []);

  if (error) {
    <div>Error ...</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <Departments getObjectsByDept={loadListData} />
      <Body objects={objects} fetchObjects={fetchObjects} />
      <Footer />
    </div>
  );
};

export default App;
