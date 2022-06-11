import { pagination } from './pagination.js';
import { getCart, addToCart, removeProducToCart } from './cart.js';
import { getProductsList } from './getProductsList.js';

const searchButton = document.getElementById('search');
const categorySelect = document.getElementById('category');
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

(function getCategories() {
  fetch(`http://localhost:3001/categories`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length) {
        data.forEach((category) => {
          categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
        });
      }
    });
})();

getCart();
getProductsList();

export { getProductsList };
