import React from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

/**
 * As of v18.2.0, there's no way to turn a functional component into an error boundary.
 * See https://reactjs.org/docs/error-boundaries.html
 */

export default class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    const { onError } = this.props;
    if (onError) {
      onError(error, errorInfo);
    }
  }

  render() {
    const { hasError } = this.state;
    const { errorElement } = this.props;

    if (hasError) {
      // You can render any custom fallback UI
      return errorElement || <Error />;
    }

    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onError: PropTypes.func,
  errorElement: PropTypes.node
};
