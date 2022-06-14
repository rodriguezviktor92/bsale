/**
 * GetProductsList Module
 * @module GetProductsList
 *
 * @author  victor Rodriguez <rodriguezviktor@gmail.com>
 * @version 1.0.0
 * @description Consulta el servicio para obtener los productos y los renderiza en la pagina.
 */

import { getProducts } from './service/getProducts.js';
import { createPageLink } from './paginatioinLink.js';
/**
 * Esta variable almacena los productos encontrados segun los criterios solicitados por el usuario.
 * @type {Array}
 */
let currentProducts = [];

/**
 * Esta variable hace referencia al div donde se agregan los productos.
 * @type {Node<HTMLDivElement>}
 */
const productList = document.getElementById('productList');

/**
 * Esta variable hace referencia al UL donde se agregan las paginas.
 * @type {Node<HTMLUListElement>}
 */
const paginationUL = document.getElementById('pagination');

/**
 * Esta funcion consume el servicio getProducts para obtener y renderizar los productos que coinciden con los criterioas solicitados por el usuario.
 * @param {Number} currentPage Numero de pagina que se quiere mostrar al usuario.
 * @async
 * @returns {void}
 */
async function getProductsList(currentPage = 0) {
  const default_url_image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssaEpDZ2QDfCM4FHEBDx6C9lJ2VolMcKtvm3QdvSxTcDrWnMjzAUAja636gNn0LBYlbY&usqp=CAU';
  const search = document.getElementById('searchInput').value.trim();
  const category = document.getElementById('category').value.trim();
  const orderPrice = document.getElementById('orderPrice').value.trim();
  const filterDiscount = document.getElementById('filterDiscount').value.trim();

  productList.innerHTML = `<div class="d-flex align-items-center">
    <strong>Loading...</strong>
    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
  </div>`;

  try {
    const data = await getProducts(
      search,
      category,
      orderPrice,
      filterDiscount,
      currentPage
    );

    if (data.content.length) {
      currentProducts = data.content;
      /* productList.innerHTML = ''; */
      productList.replaceChildren();
      data.content.forEach((product) => {
        const image = product.url_image ? product.url_image : default_url_image;

        const cardProduct = document.createElement('card-product');

        cardProduct.setAttribute('image', image);
        cardProduct.setAttribute('name', product.name);
        cardProduct.setAttribute('discount', product.discount);
        cardProduct.setAttribute('price', product.price);
        cardProduct.setAttribute('id', product.id);

        productList.appendChild(cardProduct);
      });

      paginationUL.replaceChildren();
      paginationUL.appendChild(createPageLink('prev', 'Prev'));

      for (let i = 1; i <= data.totalPages; i++) {
        const pageNumber = i - 1;
        paginationUL.appendChild(createPageLink(pageNumber, i));
      }

      paginationUL.appendChild(createPageLink('next', 'Next'));

      if (parseInt(currentPage) === data.totalPages - 1)
        document.getElementById('next').classList.add('disabled');

      if (parseInt(currentPage) === 0)
        document.getElementById('prev').classList.add('disabled');

      document.getElementById(currentPage).classList.add('active');
    } else {
      /* cambiar para que muestre 1 div */
      productList.classList.add('notFound');

      productList.innerHTML = `<div class="col d-flex justify-content-center mb-4">
          <p class="card-text">Sorry, we didn't find any product</p>
          </div>`;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export { getProductsList, currentProducts };
