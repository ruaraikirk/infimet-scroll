import HttpClientNetwork from '../client';

class ObjectClient extends HttpClientNetwork {
  constructor() {
    super('/public/collection/v1');
  }

  objects = {
    get: () => this.instance.get(`objects`),
    getByDept: (id) => this.instance.get(`objects?departmentIds=${id}`),
    getByDeptList: (list) => this.instance.get(`objects?departmentIds=${list}`),
    getByMetadataDate: (date) => this.instance.get(`objects?metadataDate=${date}`),
    getByMetaDateAndDept: (date, id) => this.instance.get(`objects?metadataDate=${date}&departmentIds=${id}`)
  };

  object = {
    get: (id) => this.instance.get(`objects/${id}`)
  };
}

const objectClient = new ObjectClient();

delete objectClient.constructor;
Object.freeze(objectClient);

export default objectClient;
