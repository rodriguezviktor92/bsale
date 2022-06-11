import { currentProducts } from './getProductsList.js';

const cartModal = document.getElementById('cartModal');
const countCart = document.getElementById('countCart');

function getCart() {
  if (localStorage.getItem('cart')) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    showProductsCart(cart);
    return cart;
  } else {
    const cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart'));

  if (cart.find((product) => product.id === productId)) {
    const productIndex = cart.findIndex((product) => product.id === productId);
    cart[productIndex].quantity++;

    localStorage.setItem('cart', JSON.stringify(cart));
    showProductsCart(cart);
  } else {
    const currentProduct = currentProducts.find(
      (product) => product.id === productId
    );
    const product = {
      product: currentProduct,
      id: currentProduct.id,
      quantity: 1,
    };

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
    showProductsCart(cart);
  }
}

function removeProducToCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart'));

  const result = cart.filter((product) => product.id !== productId);
  localStorage.setItem('cart', JSON.stringify(result));
  showProductsCart(result);
}

function showProductsCart(cart) {
  countCart.innerHTML = cart.length;
  cartModal.innerHTML = '';
  cart.forEach((product) => {
    cartModal.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
                                <div class="row g-0">
                                  <div class="col-md-4">
                                    <img src="${product.product.url_image}" class="img-fluid rounded-start" alt="...">
                                  </div>
                                  <div class="col-md-6">
                                    <div class="card-body">
                                      <h5 class="card-title">${product.product.name}</h5>
                                      <h5 class="card-title">$ ${product.product.price}</h5>
                                      <h5 class="card-title">${product.quantity}</h5>
                                    </div>
                                  </div>
                                  <div class="col-md-2 btn-remove">
                                    <button
                                      type="button"
                                      id="${product.id}"
                                      class="removeProduct btn btn-primary"
                                    >
                                      X
                                    </button>
                                  </div>
                                </div>
                              </div>`;
  });
}

export { getCart, addToCart, removeProducToCart, showProductsCart };
