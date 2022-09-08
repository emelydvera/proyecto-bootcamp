const React = require('react')
const PropTypes = require('prop-types');

function ProductAttributes({ i18n, attributes }) {
  return (
    <details className='attributes'>
      <summary
        className='attributes__title'
        tabIndex={23}
      >
        {i18n.gettext('Características')}
      </summary>
      <table className='attributes__table'>
        <tbody>
          {
            attributes.map(({ id, name, value_name }) => (
              value_name &&
              <tr key={id} tabIndex={23}>
                <td>{i18n.gettext(name)}</td>
                <td>{i18n.gettext(value_name)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </details>
  )
}

ProductAttributes.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired
}

module.exports = ProductAttributes