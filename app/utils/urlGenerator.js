class UrlGenerator {

  query = {}
  baseUrl = '';

  constructor(baseUrl, query) {
    this.baseUrl = baseUrl;
    this.query = { limit: 10, ...query };
  }

  setFilter(filterId, filterValue) {
    this.query[filterId] = filterValue
    window.location.href = this.getNewUrl()
  }

  removeFilter(queryId) {
    delete this.query[queryId];
    window.location.href = this.getNewUrl()
  }

  getNewUrl() {
    return this.baseUrl + Object.entries(this.query).map(([key, value], index) => {
      if (index == 0) {
        return `?${key}=${value}&`
      }
      return `${key}=${value}&`
    }).join('');
  }

  getQueries() {
    return this.query
  }
  // nextPage({totalProducts) {
  //   if (totalProducts / this.query.offset > 1) {
  //     this.query.offset += this.query.limit;
  //     window.location.href = this.getNewUrl()
  //   }
  // }

  // previousPage() {
  //   if (this.query.offset > 0) {
  //     this.query.offset -= this.query.limit;
  //     window.location.href = this.getNewUrl()
  //   }
  // }


}

module.exports = UrlGenerator;