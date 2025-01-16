export default function objectToFormData(
   obj,
   form = new FormData(),
   namespace = ""
) {
   for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
         const formKey = namespace ? `${namespace}[${key}]` : key;

         if (typeof obj[key] === "object" && !(obj[key] instanceof File)) {
            // Рекурсивно обрабатываем вложенные объекты
            objectToFormData(obj[key], form, formKey);
         } else {
            // Добавляем значение в FormData
            form.append(formKey, obj[key]);
         }
      }
   }
   return form;
}
