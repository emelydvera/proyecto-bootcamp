const React = require('react');
const { useState } = React;

function FilterItem(props) {
  const { filter, filterService} = props;
  const [show, setShow] = useState(false)
  const [isChecked, setIsChecked] = useState(filterService.getValueCheckedId(filter.id))
  

  const handleChecked = (e) => {
    filterService.setFilter(e)
    setIsChecked(filterService.getValueCheckedId(filter.id))
  }

  return (
    <section key={filter.id}>
      <h4 onClick={() => setShow(!show)} >{filter.name}</h4>
      <ul>
        {
          show && filter.values.map(value => (
            <li key={filter.id + value.id}>
              {
                isChecked == value.id ?
                  <input 
                    type="checkbox" 
                    name={filter.id} 
                    id={filter.id + value.id} 
                    value={value.id}  
                    onChange={handleChecked}
                    checked={true}
                  />
                :
                  <input 
                    type="checkbox" 
                    name={filter.id} 
                    id={filter.id + value.id} 
                    value={value.id}  
                    onChange={handleChecked}
                    checked={false}
                  />
              }
              <label htmlFor={filter.id + value.id}>{value.name}</label>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

module.exports = FilterItem;