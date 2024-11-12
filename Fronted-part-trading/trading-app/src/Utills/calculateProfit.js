export function calculateProfit(order) {
  if (order && order.orderItem?.buyPrice && order.orderItem?.sellPrice) {
    return order.orderItem?.sellprice - order.orderItem?.buyPrice;
  }

  return "-";
}
