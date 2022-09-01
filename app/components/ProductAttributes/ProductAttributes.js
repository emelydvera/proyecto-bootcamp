const React = require('react')
const PropTypes = require('prop-types');

function ProductAttributes({ i18n, attributes }) {
  return (
    <details>
      <summary tabIndex={23}>{i18n.gettext('Características')}</summary>
      <table>
        <tbody>
          {
            attributes.map(({ id, name, value_name }) => (
              value_name &&
              <tr key={id} tabIndex={23}>
                <td>{name}</td>
                <td>{value_name}</td>
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