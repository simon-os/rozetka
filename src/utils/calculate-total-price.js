const calculateTotalPrice = (items) => 
  items.reduce((total, { price, quantity }) => total + price * quantity, 0);

export default calculateTotalPrice;
