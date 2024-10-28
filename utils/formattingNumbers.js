export function formatPrice(number) {
   // var decimal = 0;
   // var separator = " ";
   // var decpoint = ".";
   // var format_string = "# ₽";
   // var r = parseFloat(_number);
   // var exp10 = Math.pow(10, decimal); // приводим к правильному множителю
   // r = Math.round(r * exp10) / exp10; // округляем до необходимого числа знаков после запятой
   // var rr = Number(r).toFixed(decimal).toString().split(".");
   // var b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "$1" + separator);
   // r = rr[1] ? b + decpoint + rr[1] : b;
   // return format_string.replace("#", r);
   return formatNumber(number) + " ₽";
}
export function formatNumber(number) {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
