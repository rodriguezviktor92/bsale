/**
 * GetCategoriesList Module
 * @module GetCategoriesList
 *
 * @author  victor Rodriguez <rodriguezviktor@gmail.com>
 * @version 1.0.0
 * @description Fecth de las categorias con el endpoint del backend
 */

import { host } from '../scripts.js';

/**
 * Esta funcion hace un fecth para obtener la lista de categorias desde el backend.
 * @returns {Array}
 */
async function getCategories() {
  return await fetch(`${host}categories`).then((response) => response.json());
}

export { getCategories };
