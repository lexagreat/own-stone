<template>
   <div class="map" id="map"></div>
</template>
<script setup>
onMounted(() => {
   const script = document.createElement('script');
   script.src = 'https://mapgl.2gis.com/api/js/v1';
   script.onload = () => {
      // Initialize the map after the script is loaded
      const map = new mapgl.Map('map', {
         key: '7ef79e81-8c8c-4998-99a6-50ed14dac08f',
         center: [55.31878, 25.23584],
         zoom: 13,
         style: '83b6c50a-39d7-46e5-88c1-f439f736dc57', // Указываем стиль карты (темная тема)
      });
      const marker = new mapgl.Marker(map, {
         coordinates: [55.31878, 25.23584],
         icon: '/fav.svg', // Укажите URL вашей иконки
         size: [40, 40], // Размер иконки (ширина и высота в пикселях)
         anchor: [15, 15], // Точка привязки (по умолчанию центр)
      });
   };
   document.head.appendChild(script);
})

</script>


<style lang="scss" scoped>
#map {
   width: 100%;
   height: 600px;

   @media(max-width: 1024px) {
      height: 100%;
   }

   // @media(max-width: 568px) {
   //    height: 340px;
   //    flex: 0 0 340px;

   // }
}
</style>