function createPageLink(id, content) {
  const liPagination = document.createElement('li');
  const linkPagination = document.createElement('a');

  linkPagination.setAttribute('id', id);
  linkPagination.setAttribute('href', '#');
  linkPagination.classList.add('page-link');
  linkPagination.textContent = content;

  liPagination.classList.add('pagination', 'page-item');
  liPagination.appendChild(linkPagination);

  return liPagination;
}
export { createPageLink };
