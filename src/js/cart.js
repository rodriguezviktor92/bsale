/**
 * Cart Module
 * @module Cart
 *
 * @author  victor Rodriguez <rodriguezviktor@gmail.com>
 * @version 1.0.0
 * @description Gestion del carrito de compras
 */

import { currentProducts } from './getProductsList.js';
/**
 * Esta variable hace referencia al div donde se agregan los elementos del carrito de compras
 * @type {Node<HTMLDivElement>}
 */
const cartModal = document.getElementById('cartModal');

/**
 * Esta variable hace referencia al span donde se aumenta o disminuye el numero de productos agregados al carrito
 * @type {Node<HTMLSpanElement>}
 */
const countCart = document.getElementById('countCart');

/**
 * Esta funcion recupera los elementos almacenados en el localstorage y sino existe se crear para poder guardar los productos del usuario
 * @returns {Array} Array de objectos agregados al carrito de compras
 */
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
/**
 * Esta funciona agregar 1 producto al carrito de compras, si el producto existe aumenta en 1 la cantidad.
 * @param {Number} productId Numero de id del producto que sera agregado al carrito de compras.
 * @returns {void}
 */
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
/**
 * Esta funcion elimina el producto del carrito.
 * @param {Number} productId Numero de ide del prodcuto que sera eliminado del carrito de compras.
 * @returns {void}
 */
function removeProducToCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart'));

  const result = cart.filter((product) => product.id !== productId);
  localStorage.setItem('cart', JSON.stringify(result));
  showProductsCart(result);
}
/**
 * Esta funcion renderiza cada uno de los elementos del array a la ventama modal del carrito de compras.
 * @param {Array} cart Array de objectos que contiene los productos agregados al carrito de compras.
 * @returns {void}
 */
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
