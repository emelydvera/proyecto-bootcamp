class UrlGenerator {
  query = {};
  baseUrl = "";

  constructor(baseUrl, query) {
    this.baseUrl = baseUrl;
    this.query = { ...query };
  }

  setFilter(filterId, filterValue) {
    this.query[filterId] = filterValue;
    window.location.href = this.getNewUrl();
  }

  removeFilter(queryId) {
    delete this.query[queryId];
    window.location.href = this.getNewUrl();
  }

  getNewUrl() {
    return (
      this.baseUrl +
      Object.entries(this.query)
        .map(([key, value], index) => {
          if (index == 0) {
            return `?${key}=${value}&`;
          }
          return `${key}=${value}&`;
        })
        .join("")
    );
  }

  getQueries() {
    return this.query;
  }
}

module.exports = UrlGenerator;
