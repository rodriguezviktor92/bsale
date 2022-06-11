import { discountPrice } from './utils/utils.js';
import { getProducts } from './service/getProducts.js';

let currentProducts = [];
const productList = document.getElementById('productList');
const paginationUL = document.getElementById('pagination');

async function getProductsList(currentPage = 0) {
  const default_url_image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssaEpDZ2QDfCM4FHEBDx6C9lJ2VolMcKtvm3QdvSxTcDrWnMjzAUAja636gNn0LBYlbY&usqp=CAU';
  const search = document.getElementById('searchInput').value.trim();
  const category = document.getElementById('category').value.trim();

  productList.innerHTML = `<div class="d-flex align-items-center">
    <strong>Loading...</strong>
    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
  </div>`;

  const data = await getProducts(search, category, currentPage);

  if (data.content.length) {
    currentProducts = data.content;
    productList.innerHTML = '';
    data.content.forEach((product) => {
      const image = product.url_image ? product.url_image : default_url_image;

      productList.innerHTML += `<div class="col d-flex justify-content-center mb-4">
                          <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem">
                              <img
                                  src="${image}"
                                  class="card-img-top img_cover"
                                  alt="${product.name}"
                              />
                              
                              <div class="card-body text-white-50">
                                  <p class="card-text">${product.name}</p>
                              </div>
                              <div class="discount card-body text-white-50" style="padding:10px">
                                <h6 class="card-title" style="text-decoration:line-through;">
                                  <span>${
                                    product.discount > 0
                                      ? `$ ${discountPrice(
                                          product.price,
                                          product.discount
                                        )}`
                                      : ''
                                  }</span>
                                </h6>
                              </div>
                              <div
                                  class="card-body text-white-50 d-flex justify-content-between align-items-baseline" style="padding:10px"
                              >
                              <h5 class="card-title"><span>$ ${
                                product.price
                              }</span></h5>
                             
                              <span  style="font-size: 13px; font-weight: 600; color: green">${
                                product.discount > 0
                                  ? `${product.discount}% OFF`
                                  : ``
                              }</span>
                          <button
                          type="button"
                          id="${
                            product.id
                          }" class="btn-add-cart btn btn-primary">Add to cart</button>
                          </div>
                      </div>
                  `;
    });

    paginationUL.innerHTML = `<li class="pagination page-item"><a id="prev" class="page-link" href="#">Prev</a></li>`;

    for (let i = 1; i <= data.totalPages; i++) {
      const pageNumber = i - 1;
      if (i === 1) {
        paginationUL.innerHTML += `<li class="pagination age-item cursor-pointer"><a id="${pageNumber}" class="page-link" href="#">${i}</a></li>`;
      } else {
        paginationUL.innerHTML += `<li class="pagination page-item cursor-pointer"><a id="${pageNumber}"  class="page-link" href="#">${i}</a></li>`;
      }
    }

    paginationUL.innerHTML += `<li class="pagination page-item"><a id="next" class="page-link" href="#">Next</a></li>`;

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
}

export { getProductsList, currentProducts };
