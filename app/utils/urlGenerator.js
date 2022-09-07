class UrlGenerator {
  query = {};
  baseUrl = "";

  constructor(baseUrl, query) {
    this.baseUrl = baseUrl;
    this.query = { page: 1, ...query };
  }


  setQuery(filterId, filterValue) {
    this.query[filterId] = filterValue;
  }

  setFilter(filterId, filterValue) {
    this.setQuery(filterId, filterValue);
    this.setQuery('page', 1);
    window.location.href = this.getNewUrl();
  }

  removeFilter(queryId) {
    delete this.query[queryId];
    this.setQuery('page', 1);
    window.location.href = this.getNewUrl();
  }

  getNewUrl() {
    return (
      this.baseUrl + '?' + this.getQueryString()
    );
  }

  getQueryString() {
    return Object.entries(this.query)
      .map(([key, value], index) => {
        return `${key}=${value}&`;
      })
      .join("")
  }

  getQueryByName(name) {
    return this.query[name]
  }

  getQueries() {
    return this.query;
  }
}

module.exports = UrlGenerator;
