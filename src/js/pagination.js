/**
 * Pagination Module
 * @module Pagination
 *
 * @author  victor Rodriguez <rodriguezviktor@gmail.com>
 * @version 1.0.0
 * @description Gestion de la paginación
 */

import { getProductsList } from './scripts.js';
/**
 * Esta variable almacena  la pagina actual en la que se encuentra el usuario.
 * @type {Number}
 */
let currentPage = 0;

/**
 * Recibe el id el boton presionado por el usuario ese valor lo envia a getProductsList para obtener la lista de productos.
 * @param {String} id Identificador del boton presionado por el usuario en la barra de paginacion
 * @returns {void}
 */
function pagination(id) {
  if (id === 'next') currentPage++;
  if (id === 'prev') currentPage--;

  if (id !== 'next' && id !== 'prev') currentPage = id;
  getProductsList(currentPage);
}
export { pagination };
