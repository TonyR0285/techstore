const API = '/api/products';

export const getProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetch(`${API}?${query}`).then(r => r.json());
};

export const getProductById = (id) =>
  fetch(`${API}/${id}`).then(r => r.json());

export const createProduct = (data) =>
  fetch(API, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
