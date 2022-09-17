import HttpClientNetwork from '../client';

class SearchClient extends HttpClientNetwork {
  constructor() {
    super('/public/collection/v1/search');
  }

  search = {
    get: () => this.instance.get(``)
  };
}

const searchClient = new SearchClient();

delete searchClient.constructor;
Object.freeze(searchClient);

export default searchClient;
