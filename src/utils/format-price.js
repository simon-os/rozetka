const formatPrice = (value, format = 'uk-UA') => {
  return Intl.NumberFormat(format).format(value);
}

export default formatPrice;
