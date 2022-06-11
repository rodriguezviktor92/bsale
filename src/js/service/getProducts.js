async function getProducts(search, category, page) {
  return await fetch(
    `http://localhost:3001/products?name=${search}&category=${parseInt(
      category
    )}&page=${page}`
  ).then((response) => response.json());
}

export { getProducts };
