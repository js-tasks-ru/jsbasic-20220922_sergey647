import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").appendChild(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").appendChild(ribbonMenu.elem);

    let stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector("[data-slider-holder]").appendChild(stepSlider.elem);

    let cartIcon = new CartIcon();
    document.querySelector("[data-cart-icon-holder]").appendChild(cartIcon.elem);

    let cart = new Cart(cartIcon);


    let products = await fetch('products.json').then((res)=>res.json());

    let productsGrid = new ProductsGrid(products);
    let prodDiv = document.querySelector("[data-products-grid-holder]");
    prodDiv.innerHTML = '';
    prodDiv.appendChild(productsGrid.elem);

    document.body.addEventListener('product-add', (e)=> {
      let itm = products.filter((el)=>el.id === e.detail)[0];

      cart.addProduct( itm );
    });
    stepSlider.elem.addEventListener('slider-change', (e)=> {
      productsGrid.updateFilter({maxSpiciness: e.detail});
    });
    ribbonMenu.elem.addEventListener('ribbon-select', (e)=> {
      productsGrid.updateFilter({category: e.detail});
    });
    document.querySelector("#nuts-checkbox").addEventListener('change',(e) => {
      productsGrid.updateFilter({noNuts: e.target.checked});
    });
    document.querySelector("#vegeterian-checkbox").addEventListener('change',(e) => {
      productsGrid.updateFilter({vegeterianOnly: e.target.checked});
    });



  }
}
