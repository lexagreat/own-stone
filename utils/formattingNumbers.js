export function formatPrice(number) {
   return formatNumber(number) + " ₽";
}
export function formatNumber(number) {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
