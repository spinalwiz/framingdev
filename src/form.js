export default class Form {
  constructor(data) {
    this.originalData = data;
    this.errors = {};

    for (let field in data) {
      if (data.hasOwnProperty(field)) {
        this[field] = data[field];
      }
    }
  }

  data() {
    let data = {};

    for (let property in this.originalData) {
      data[property] = this[property];
    }

    return data;
  }

  reset() {
    for (let field in this.originalData) {
      this[field] = '';
    }
  }

  submit(requestType, path) {
    let url = "https://api.frames.co.uk/" + path + "?key=aSztEMgfdIU2Mx5LVzcxVcfRKuV7S1IOKMKDS7YJzSG1XsJEcfawjX48obrZvRVQ";
    return new Promise((resolve, reject) => {
      axios[requestType](url)
        .then(response => {
          this.onSuccess(response.data);
          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error);
          reject(error);
        })
    });
  }

  onSuccess(data) {
    console.log("success");
  }

  onFail(error) {
    this.errors = error.response.data;
  }
}
