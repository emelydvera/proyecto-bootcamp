class FilterService {

  query = {}
  NewUrl = ''

  constructor( query ){
    this.query = query
  }

  setFilter(e){
    if(!this.query.hasOwnProperty(e.target.name) || this.query[e.target.name] != e.target.value){
      this.query[e.target.name] = e.target.value
    }else{
      delete this.query[e.target.name];
    }
    console.log(this.query);
  }

  getValueCheckedId(filter_id){
    return this.query[filter_id];
  }

  getNewUrl(){
    return Object.entries(this.query).map(([key, value], index) => {
      if(index == 0){
        return `?${key}=${value}&`
      }
      return `${key}=${value}&`
    }).join('');
  }


}

module.exports = FilterService;