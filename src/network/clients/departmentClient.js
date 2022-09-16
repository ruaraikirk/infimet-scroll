import HttpClientNetwork from '../client';

class DepartmentClient extends HttpClientNetwork {
  constructor() {
    super('/public/collection/v1/departments');
  }

  departments = {
    get: () => this.instance.get(``)
  };
}

const departmentClient = new DepartmentClient();

delete departmentClient.constructor;
Object.freeze(departmentClient);

export default departmentClient;
