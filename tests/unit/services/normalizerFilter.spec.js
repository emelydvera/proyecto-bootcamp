const normalizerFilters = require('../../../services/transforms/normalizerFilters');

const availableFilters = [
  {
    "id": "official_store",
    "name": "Tiendas oficiales",
    "type": "text",
    "values": [
      {
        "id": "all",
        "name": "Todas las tiendas oficiales",
        "results": 66
      },
      {
        "id": "72",
        "name": "Lenovo",
        "results": 18
      },
    ]
  }
]

const availableFiltersShort = [
  {
    "id": "accepts_mercadopago",
    "name": "Filtro por MercadoPago",
    "type": "boolean",
    "values": [
      {
        "id": "yes",
        "name": "Con MercadoPago",
        "results": 5817
      }
    ]
  },
  {
    "id": "BRAND",
    "name": "Marca",
    "type": "STRING",
    "values": [
      {
        "id": "8216",
        "name": "Dell",
        "results": 3
      }
    ]
  },
]

it('Should return the availableFilters array', () => {
  expect(normalizerFilters(availableFilters)).toEqual(availableFilters)
})

it('Should return the filters with only one value option in the same object', () => {
  expect(normalizerFilters(availableFiltersShort).length).toBe(1)
})