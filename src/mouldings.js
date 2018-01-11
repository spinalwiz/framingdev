export default class Mouldings {
  constructor() {
    this.mouldings = [];
    this.mouldingsFiltered = [];
    this.filters = [];
    this.fetchMouldings();
  }

  fetchMouldings() {
    const url = 'https://api.frames.co.uk/mouldings?key=aSztEMgfdIU2Mx5LVzcxVcfRKuV7S1IOKMKDS7YJzSG1XsJEcfawjX48obrZvRVQ';
    axios.get(url)
      .then((response) => {
        this.mouldings = response.data;
        this.mouldingsFiltered = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllMouldings() {
    return this.mouldings;
  }

  getFilteredMouldings() {
    return this.getFilteredMouldings;
  }

  addFilter(filter, criteria) {

  }

  applyFilter() {

  }

  resetFilters() {

  }
}
