# Ecommerce Team 5 Bootcamp / Wave5

> Brief project description

## Description

- Feature/Search Bar: Esta funcionalidad le permite al usuario realizar una busqueda y mostrar productos coincidentes con la palabra pedida.

- Feature/Product Details: Aqui se permite ver mas detalles del producto luego de que se haga click en su imagen.

- Feature/Product Filter: Se filtran los productos del listado a corde a la peticion del usuario y su precio.

- Feature/Error Page: Se redirige al usuario a una pagina de error cuando se busca un producto con un ID no valido.

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

## Colaboradores:

- Ivan Batista Ochoa
- Gabriela Pacheco Abarcia
- Enrique Chacon Mena
- Emely Vera Villamizar
- Susan Ortiz Muñoz
- Nahuel Occhipinti

## License

© 2021 Mercado Libre
