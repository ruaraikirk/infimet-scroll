import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import Loading from '../components/Loading';
import errorBoundaryHOC from './ErrorBoundaryHOC';

const Body = ({ objects, fetchObjects }) => {
  // Error Boundary Test throw Error('error!');
  return (
    <main className="flex justify-center flex-1 overflow-auto bg-slate-100">
      <InfiniteScroll loadMore={fetchObjects} hasMore={true} loader={<Loading key={0} />} useWindow={false}>
        {objects.map((object) => (
          <Card key={object.objectID} artObject={object} />
        ))}
      </InfiniteScroll>
    </main>
  );
};

Body.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object),
  fetchObjects: PropTypes.func
};

export default errorBoundaryHOC(Body);
