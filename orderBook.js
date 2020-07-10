function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook = [];

  if (existingBook === 0) {
    updatedBook = existingBook.push(incomingOrder);

    return updatedBook;
  }

  while (existingBook.length > 0 && incomingOrder.quantity > 0) {
    const currentOrder = existingBook.shift();

    if (
      currentOrder.type !== incomingOrder.type &&
      currentOrder.price === incomingOrder.price
    ) {
      if (incomingOrder.quantity >= currentOrder.quantity) {
        incomingOrder = {
          type: incomingOrder.type,
          price: incomingOrder.price,
          quantity: incomingOrder.quantity - currentOrder.quantity,
        };
      } else {
        incomingOrder = {
          type: currentOrder.type,
          price: currentOrder.price,
          quantity: currentOrder.quantity - incomingOrder.quantity,
        };
      }
    } else {
      updatedBook.push(currentOrder);
    }
  }
  if (existingBook.length > 0) {
    updatedBook = updatedBook.concat(existingBook);
  }
  if (incomingOrder.quantity > 0) {
    updatedBook.push(incomingOrder);
  }

  return updatedBook;
}
module.exports = reconcileOrder;
