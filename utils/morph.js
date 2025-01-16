export default function (int, array) {
   return (
      (array = array || ["сессия", "сессии", "сессий"]) &&
      array[
         int % 100 > 4 && int % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]
      ]
   );
}
