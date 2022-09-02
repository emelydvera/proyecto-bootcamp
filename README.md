# Ecommerce Team 5 Bootcamp / Wave5

> BRIEF PROJECT DESCRIPTION

## Description

- Feature/Search Bar: This feature allows users to perform a search in the search bar and shows them products that match with their search.

- Feature/Product Details: This feature allows users to get more information about a specific product when they click on an image.

- Feature/Product Filter: This feature allows users to limit their search by different filters so they can easily get what they are looking for.

- Feature/Error Page: This feature was developed to allow users land in an friendly error page when there is an error in page by a server response error or an user request error or even some other errors that comes up during the interaction of the user with the page.

- Feature/Pagination: This feature allows users to better navigate among products; go to next page, go back to previous page, go to the first page or even hide buttons where there is only one page to show.

- Feature/Prepare Purchasing Process: This feature allows users to initiate a purchasing process by choosing the product quantity of the selected product) they want to buy; when users are ready they can press the purchase button and they will be taken to the checkout page.

- Feature/Checkout: This feature allows users to get a summary of their purchase and allows them to modify if needed. The summary allow users to see the name of the product, the image of the product, the quantity they are going, the price per unit and the total price.

## Environment setup

- Install [Node.js](https://nodejs.org/)
  - Recommended method is by using [NVM](https://github.com/creationix/nvm)
  - Recommended Node.js version is the [active LTS](https://github.com/nodejs/LTS#lts-schedule1)
- Update `npm` to the latest version by running `npm i -g npm@latest`
- **While staying connected to VPN**, run `npm install` to install the project dependencies
- For the e2e tests install locally selenium, chromedriver and geckodriver by running `npm run install-selenium`
- Edit your `/etc/hosts` file by adding virtual hosts required for the app running:

_These are just examples, please indicate the real list of domains that is used in project_

```
    127.0.0.1 dev.mercadolibre.com.ar dev.mercadolibre.com.mx dev.mercadolibre.com.co
    127.0.0.1 dev.mercadopago.com.ar
    127.0.0.1 dev.mercadolivre.com.br
    # In case you run the project by `fury run` you should add also these ones
    192.168.99.100 dev.mercadolibre.com.ar dev.mercadolibre.com.mx dev.mercadolibre.com.co
    192.168.99.100 dev.mercadopago.com.ar
    192.168.99.100 dev.mercadolivre.com.br
```

- You may find convenient editing your `.bash_profile` to [auto pick the Node version](https://github.com/mercadolibre/frontend/wiki/Auto-Picking-Node-version) of each project.

## Development

### 1) Run and build the app:

```
npm run dev
```

**Note**: Running this command you will be using React Fast Refresh and Hot Reload Server, [please follow this documentation](https://nordic.adminml.com/docs/fast-refresh) for more information and recommendations of usage.

### 2) Navigate to:

```
https://dev.mercadolibre.com.ar:8443/
https://dev.mercadolibre.com.mx:8443/
https://dev.mercadolibre.com.co:8443/
https://dev.mercadolibre.cl:8443/

```

## Debug

### 1) Build the assets:

```
npm run build
```

_Alternatively you may use the watcher for automatic assets rebuilding: `npm run watch`_

### 2) Run the app with the debug mode:

```
npm run debug
```

## Team:

- Enrique Chacon Mena
- Emely Vera Villamizar
- Susan Ortiz Muñoz
- Nahuel Occhipinti
- Gabriela Pacheco Abarcia
- Ivan Batista Ochoa

## License

© 2021 Mercado Libre
