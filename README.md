# Ecommerce Team 5 Bootcamp / Wave5

> BRIEF PROJECT DESCRIPTION

## Index

* [1. Walk through and description](#1-Walk-through-and-description)
* [2. Environment setup](#2-Environment-setup)
* [3. Development](#3-Development)
* [4. Debug](#4-Debug)
* [5. Testing](#5-Testing)
* [6. Work methodology](#6-Work-methodology)
* [7. Improvement opportunities](#7-Improvement-opportunities)
* [8. Team](#8-Team)
* [9. License](#9-License)

## 1. Walk through and description

### Pages
- Home: This page show an search bar and button, here users can find products, not only by name, but also by category. The component we use are:
  - SearchInput

      <img src='./imagesReadme/home1.png' alt='page home'  width='70%'/>
      <img src='./imagesReadme/home2.png' alt='page home'  width='70%'/>
      <img src='./imagesReadme/home_error.png' alt='page home error'  width='70%'/>
    <br>

- Products: This page shows a list of products that match what the user searched for on the home page, it also has filters such as: categories, discounts, location, price, products per page and pagination. The component we use are:
  - Filters
  - Breadcrumb
  - SelectProductsPerPage
  - ProductsList
  - Pagination

      <img src='./imagesReadme/product_list.png' alt='page product list'  width='70%'/>
    <br>

- Page Product: Here you can see the product chosen on the previous page with its information:
  Product Images
  Name
  Condition(If it is new or used)
  Quantity Sold
  Quantity Available
  Shipping type
  Price
And it also has a detailed description of the product and its characteristics.
    Required components:
   - ProductAttributes
    -ProductInfo
    -ProductView
    -BreadCrumb

      <img src='./imagesReadme/product_detail.png' alt='page product detail'  width='70%'/>
      <img src='./imagesReadme/Input_error.png' alt='detail input error'  width='30%'/>
      <br>

- Checkout: This page shows a summary of the product or products that the user is going to buy, showing the number of products, the unit price of the product and the total price of the purchase. The component we use are:
  - Checkout

      <img src='./imagesReadme/checkout.png' alt='page buy'  width='70%'/>
      <br>

- Page error404: It is redirected to this page when trying to enter an invalid address, the message appears along with an image and a button to redirect to the main page
   Required component:
  - Component404   

      <img src='./imagesReadme/page_error.png' alt='page error' width='70%'/>
    <br>

## 2. Environment setup

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

## 3. Development

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

## 4. Debug

### 1) Build the assets:

```
npm run build
```

_Alternatively you may use the watcher for automatic assets rebuilding: `npm run watch`_

### 2) Run the app with the debug mode:

```
npm run debug
```
## 5. Testing

Run all the tests with the following command:

```
npm run test:unit
```

### Files and testers

- Views 

  - Home - Susan Ortiz Muñoz 
  - Products - Enrique Chacon Mena 
  - Product - Ivan Batista Ochoa
  - Buy - Gabriela Pacheco Abarcia
  - Error404 - Nahuel Occhipinti  

<br/>

- Components

  - BreadCrumb - Enrique Chacon Mena
  - Checkout - Gabriela Pacheco Abarcia
  - Component404 - Nahuel Occhipinti
  - Filter - Enrique Chacon Mena
  - FilterModal - Enrique Chacon Mena
  - FilterApplied - Enrique Chacon Mena
  - FiltersAvailables  - Susan Ortiz Muñoz
  - FilterValue - Emely Vera Villamizar
  - FilterSections - Enrique Chacon Mena
  - InputQuantity - Gabriela Pacheco Abarcia
  - Pagination - Ivan Batista Ochoa
  - ProductAttributes - Ivan Batista Ochoa
  - ProductsCard - Ivan Batista Ochoa
  - ProductInfo - Nahuel Occhipinti
  - ProductInfoBuy - Emely Vera Villamizar
  - ProductView - Emely Vera Villamizar
  - SearchInput - Susan Ortiz Muñoz
  - SelectProductPerPage - Ivan Batista Ochoa
  - ProductSlider - Emely Vera Villamizar
  - ProductsList - Enrique Chacon Mena

<br>

- Services

  - ProductService - All

<br>

- Middlewares

  - Buy Controller - Emely Vera & Enrique Chacon
  - Product - Ivan Batista & Susan Ortiz
  - Products - Gabriela Pacheco & Nahuel Occhipinti

<br>

- Utils

  - priceFormatter - Gabriela Pacheco Abarcia
  - urlGenerator - Enrique Chacon Mena

    <img src='./imagesReadme/test_coverage.png' alt='test coverage 100%' width='80%' style='margin-top:30px'/>
<br>

## 6. Work methodology

To work, we organized ourselves using Trello, where we associated the different user stories with the assigned person in order to have an overview of the progress of the project and what was causing us blockages.

We organize ourselves by small groups to develop some functionalities together in the first 3 sprints.

In Sprint 4 we work more independently to get to test all the functionalities of the application; we work some tests individually and some we work in teams.

## 7. Improvement opportunities

We believe that every project always has at least one opportunity for improvement. In our case, we are aware that the project can improve the following:

- Accessibility: Especially the accessibility of the page that renders the product listing.

- Adaptive Design: We can adjust the project so that it has a design that adapts to devices of different sizes.

- SEO: Although the browser analysis indicates that our application has a 91 / 100, the reality is that we believe that we can optimize it a little more.

## 8. Team:

- Enrique Chacon Mena
- Emely Vera Villamizar
- Susan Ortiz Muñoz
- Nahuel Occhipinti
- Gabriela Pacheco Abarcia
- Ivan Batista Ochoa

## 9. License

© 2022 Mercado Libre
