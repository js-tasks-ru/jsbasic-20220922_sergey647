import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner" />
      </div>
    `);
    this.grid = this.elem.querySelector('.products-grid__inner');
    this.render();
  }
  render() {
    this.grid.innerHTML = '';
    this.products.map((product) => {
      let skip = 0;
      if(this.filters.noNuts && product.nuts) skip++;
      if(this.filters.vegeterianOnly && !product.vegeterian) skip++;
      if(product.spiciness > this.filters.maxSpiciness ) skip++;
      if(this.filters.category && product.category !== this.filters.category) skip++;
      if(skip === 0) {
        let card = new ProductCard(product);
        this.grid.append(card.elem);
      }
    });
  }
  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.render();
  }
}
