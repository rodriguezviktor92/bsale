import { getProductsList } from './scripts.js';
let currentPage = 0;

function pagination(id) {
  if (id === 'next') currentPage++;
  if (id === 'prev') currentPage--;
  /* al presionar next se asigna como currenpage y no deberia */
  if (id !== 'next' && id !== 'prev') currentPage = id;
  getProductsList(currentPage);
}
export { pagination };
