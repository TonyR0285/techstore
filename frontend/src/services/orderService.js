const API = '/api/orders';

export const createOrder = (data) =>
  fetch(API, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(data) }).then(r => r.json());

export const getOrdersByUser = (userId) =>
  fetch(`${API}/${userId}`).then(r => r.json());
