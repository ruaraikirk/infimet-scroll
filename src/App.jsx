import React from 'react';
import { flatten, isEmpty } from 'ramda';
import Header from './components/Header';
import Footer from './components/Footer';
import Departments from './components/Departments';
import Body from './components/Body';
import Error from './components/Error';
import { objectClient } from './network/clients';
import useMetData from './hooks/useMetData';

const App = () => {
  const { states, actions } = useMetData();
  const { objectIds, objects, chunk, fetching, error } = states;
  const { setObjects, setChunk, setFetching, setError, loadListData } = actions;

  const fetchObjects = async () => {
    if (fetching) {
      return;
    }
    if (states.objectIds && !isEmpty(objectIds)) {
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

  if (error) {
    <Error />;
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
