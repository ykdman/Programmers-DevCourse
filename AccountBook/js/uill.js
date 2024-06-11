export function validatePrice(currentFunds, currentAmount) {
  return currentFunds >= currentAmount;
}

export function validateRequired({ category, description, price }) {
  return (
    Boolean(category) && Boolean(description) && Boolean(price) && price > 0
  );
}
