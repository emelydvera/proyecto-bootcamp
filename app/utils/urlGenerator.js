class UrlGenerator {
  query = {};
  baseUrl = "";

  constructor(baseUrl, query) {
    this.baseUrl = baseUrl;
    this.query = {
      page: 1,
      limit: 10,
      ...query,
    };
  }

  setQuery(filterId, filterValue) {
    this.query[filterId] = filterValue;
  }

  setFilter(filterId, filterValue) {
    this.setQuery(filterId, filterValue);
    this.setQuery("page", 1);
    window.location.href = this.getNewUrl();
  }

  removeFilter(queryId) {
    if (!this.query.q || !(queryId !== "category")) {
      delete this.query[queryId];
      this.setQuery("page", 1);
      window.location.href = this.getNewUrl();
    }
  }

  getNewUrl() {
    return this.baseUrl + "?" + this.getQueryString();
  }

  getQueryString(withPage = true) {
    return Object.entries(this.query)
      .map(([key, value]) => {
        if (withPage) {
          return `${key}=${value}&`;
        }

        return key !== "page" ? `${key}=${value}&` : "";
      })
      .join("");
  }

  getQueryByName(name) {
    return this.query[name];
  }

  getQueries() {
    return this.query;
  }
}

module.exports = UrlGenerator;
