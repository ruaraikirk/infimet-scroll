import HttpClientNetwork from '../client';

class ObjectClient extends HttpClientNetwork {
  constructor() {
    super('/public/collection/v1/objects');
  }

  objects = {
    get: () => this.instance.get(``),
    getByDept: (id) => this.instance.get(`?departmentIds=${id}`),
    getByDeptList: (list) => this.instance.get(`?departmentIds=${list}`),
    getByMetadataDate: (date) => this.instance.get(`?metadataDate=${date}`),
    getByMetaDateAndDept: (date, id) => this.instance.get(`?metadataDate=${date}&departmentIds=${id}`)
  };

  object = {
    get: (id) => this.instance.get(`/${id}`)
  };
}

const objectClient = new ObjectClient();

delete objectClient.constructor;
Object.freeze(objectClient);

export default objectClient;
