const React = require('react');
const { useState } = React;

function FilterItem(props) {
  const { filter, filterService} = props;
  const [show, setShow] = useState(false)

  return (
    <section key={filter.id}>
      <h4 onClick={() => setShow(!show)} >{filter.name}</h4>
      <ul>
        {
          show && filter.values.map(value => (
            <li key={filter.id + value.id}>
              <a onClick={() => filterService.setFilter(filter.id, value.id)}>
              {value.name}
              </a>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

module.exports = FilterItem;