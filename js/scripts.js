const productList = document.getElementById('productList');
const searchButton = document.getElementById('search');
const categorySelect = document.getElementById('category');
const paginationUL = document.getElementById('pagination');

searchButton.addEventListener('click', () => getProductsList());
categorySelect.addEventListener('change', () => getProductsList());

let currentPage = 0;

function pagination(id) {
  if (id === 'next') currentPage++;
  if (id === 'prev') currentPage--;

  if (id !== 'next' && id !== 'prev') currentPage = id;
  getProductsList(currentPage);
}

function getProductsList(currentPage = 0) {
  console.log(currentPage);
  const search = document.getElementById('searchInput').value.trim();
  const category = document.getElementById('category').value.trim();

  productList.innerHTML = `<div class="d-flex align-items-center">
  <strong>Loading...</strong>
  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div>`;

  fetch(
    `http://localhost:3001/products?name=${search}&category=${parseInt(
      category
    )}&page=${currentPage}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.content.length) {
        productList.innerHTML = '';
        data.content.forEach((product) => {
          const image = product.url_image
            ? product.url_image
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssaEpDZ2QDfCM4FHEBDx6C9lJ2VolMcKtvm3QdvSxTcDrWnMjzAUAja636gNn0LBYlbY&usqp=CAU';

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
                            <div
                                class="card-body text-white-50 d-flex justify-content-between align-items-baseline"
                            >
                            <h5 class="card-title"><span class="price">$ ${product.price}</span></h5>
                            <a href="#" class="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                `;
        });

        paginationUL.innerHTML = `<li data-id="prev" onclick="pagination('prev')" class="page-item"><a class="page-link ${
          currentPage === 0 ? 'disabled' : null
        }" href="#">Prev</a></li>`;

        for (let i = 1; i <= data.totalPages; i++) {
          if (i === 1) {
            paginationUL.innerHTML += `<li id="${i - 1}" onclick="pagination(${
              i - 1
            })" class="page-item cursor-pointer"><a class="page-link" href="#">${i}</a></li>`;
          } else {
            paginationUL.innerHTML += `<li id="${i - 1}" onclick="pagination(${
              i - 1
            })" class="page-item cursor-pointer"><a class="page-link" href="#">${i}</a></li>`;
          }
        }

        paginationUL.innerHTML += `<li id="next" onclick="pagination('next')" lass="page-item"><a class="page-link ${
          currentPage === data.totalPages - 1 ? 'disabled' : null
        }" href="#">Next</a></li>`;

        document.getElementById(currentPage).classList.add('active');
      } else {
        /* cambiar para que muestre 1 div */
        productList.classList.add('notFound');

        productList.innerHTML = `<div class="col d-flex justify-content-center mb-4">
        <p class="card-text">Sorry, we didn't find any product</p>
        </div>`;
      }
    });
}

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

getProductsList();
