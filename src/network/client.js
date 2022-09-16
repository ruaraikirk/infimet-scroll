import axios from 'axios';
import getBaseUrl from './utils/getBaseUrl';

class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL
    });

    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
  }

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  };

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this._handleRequest, this._handleError);
  };

  _handleRequest = (config) => {
    return config;
  };

  _handleResponse = (response) => {
    if (response.config.fullResponse) return response;
    return response.data;
  };

  _handleError = (error) => {
    return Promise.reject(error);
  };
}

class HttpClientNetwork extends HttpClient {
  constructor(baseURL) {
    super(getBaseUrl(baseURL));
  }
}

export default HttpClientNetwork;
