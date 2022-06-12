/**
 * EntriPoint Module
 * @module
 *
 * @author  victor Rodriguez <rodriguezviktor@gmail.com>
 * @version 1.0.0
 * @description Archivo de inicio js
 */

import { pagination } from './pagination.js';
import { getCart, addToCart, removeProducToCart } from './cart.js';
import { getProductsList } from './getProductsList.js';
import { getCategories } from './service/getCategories.js';

/**
 * Esta veriable contiene el host del backend
 * @type {String}
 */
const host = 'https://victor-api-bsale.herokuapp.com/';

/**
 * Esta variable hace referencia al input en el cual el usuario puede hacer busquedas.
 * @type {Node<HTMLInputElement>}
 */
const searchButton = document.getElementById('search');

/**
 * Esta variable hace referencia al select el cual el usuario puede seleccionar la categoria para aplicar un filtro.
 * @type {Node<HTMLSelectElement>}
 */
const categorySelect = document.getElementById('category');

/**
 * Esta variable hace referencia al Ul el cual se renderizaran los numeros de paginas disponibles.
 * @type {Node<HTMLUListElement>}
 */
const paginationLI = document.querySelector('.pagination');

searchButton.addEventListener('click', () => getProductsList());
categorySelect.addEventListener('change', () => getProductsList());
paginationLI.addEventListener('click', (e) => pagination(e.target.id));

document.addEventListener('click', (e) => {
  let element = e.target;
  if (element.classList[0] === 'btn-add-cart') {
    addToCart(parseInt(element.id));
  }

  if (element.classList[0] === 'removeProduct') {
    console.log(element.id);
    removeProducToCart(parseInt(element.id));
  }
});

/**
 * Esta funcion consume el servicio getCategories para obtener y renderizar la lista de categorias.
 * @returns {void}
 */
(async function getAllCategories() {
  try {
    const data = await getCategories();
    if (data.length) {
      data.forEach((category) => {
        categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
})();

getCart();
getProductsList();

export { getProductsList, host };
