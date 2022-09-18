import React from 'react';
import ErrorBoundary from './ErrorBoundary';

/**
 * Wraps error boundary
 * * */
const errorBoundaryHOC = (ChildComponent, errorElement, onError) => (props) =>
  (
    <ErrorBoundary errorElement={errorElement} onError={onError}>
      <ChildComponent {...props} />
    </ErrorBoundary>
  );

export default errorBoundaryHOC;
