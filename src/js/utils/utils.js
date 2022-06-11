/**
 * Utils Module
 * @module Utils
 *
 * @author  victor Rodriguez <rodriguezviktor@gmail.com>
 * @version 1.0.0
 * @description Utilidades
 */

/**
 * Esta funcion recibe el precio y descuento para calcular cual era el precio sin descuento y mostrarlo.
 * @param {Number} price Precio de venta del producto
 * @param {Number} discount Descuento aplicable al producto
 * @returns {Number}  Precio del producto sin descuento.
 */
function discountPrice(price, discount) {
  return price + (price * discount) / 100;
}

export { discountPrice };
