export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product || !product.id) return false;
    let exists = false;
    let prodObj;
    this.cartItems.map((itm, idx) => {
      if (itm.product.id === product.id) {
        this.cartItems[idx].count += 1;
        prodObj = this.cartItems[idx];
        exists = true;
      }
    });
    if (!exists) {
      prodObj = {
        product: product,
        count: 1
      };
      this.cartItems.push(prodObj);
    }
    this.onProductUpdate(prodObj);
  }

  updateProductCount(productId, amount) {
    /*console.log(amount)
    console.log(productId)*/

    let prodObj;
    this.cartItems.map((itm, idx) => {
      if (itm.product.id === productId) {
        if(amount > 0) {
          this.cartItems[idx].count += 1;
        } else {
          this.cartItems[idx].count -= 1;
          if(this.cartItems[idx].count <= 0) {
            this.cartItems.splice(idx, 1)
          }
        }
        prodObj = this.cartItems[idx];
      }
    });
    this.onProductUpdate(prodObj);
  }

  isEmpty() {
    return (!this.cartItems.length);
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.map((itm) => {
      if (itm.count) {
        count += itm.count;
      }
    });
    return count;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.map((itm) => {
      price += (itm.product.price * itm.count);
    });
    return price;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

