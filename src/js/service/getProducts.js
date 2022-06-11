/**
 * Service GetProducts Module
 * @module Service_GetProducts
 *
 * @author  victor Rodriguez <rodriguezviktor@gmail.com>
 * @version 1.0.0
 * @description Fecth de los productos con el endpoint del backend
 */

import { host } from '../scripts.js';
/**
 * Esta funcion recibe los parametros solicitados por el usuario y devuelve los productos que coinciden con los parametros recibidos.
 * @param {String} search Termino de busqueda ingresado en el buscador.
 * @param {String} category Identificador de lca categoria seleccionada por el usuario.
 * @param {Number} page Numero de pagina que desea visilizar el usuario.
 * @returns {Promise}
 */
async function getProducts(search, category, page) {
  return await fetch(
    `${host}products?name=${search}&category=${parseInt(category)}&page=${page}`
  ).then((response) => response.json());
}

export { getProducts };
