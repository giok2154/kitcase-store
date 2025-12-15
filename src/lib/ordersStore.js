export const orders = [];

export function saveOrder(order) {
  orders.push({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...order,
  });
}

export function getOrders() {
  return orders;
}

