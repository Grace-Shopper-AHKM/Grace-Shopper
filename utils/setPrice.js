export function setPrice(price) {
    price = price.toString(16)
    const preDecimal = price.slice(0, price.length - 2);
    const postDecimal = price.slice(price.length - 2);
    return '$' + preDecimal + '.' + postDecimal;
}