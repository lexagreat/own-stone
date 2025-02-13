<template>
   <section class="selection-section" id='home-selection'>
      <div class="container">
         <div class="selection-section__wrapper">
            <div class="selection-section__header h1">
               <h2 class="selection-section__title">подобрать недвижимость </h2>
               <span class="selection-section__count">{{ formatNumber(count) }} {{ morph(count, ['объект', 'объекта',
                  'объектов']) }} </span>
            </div>
            <div class="selection-section__main">
               <ul class="selection-section__radios">
                  <li v-for="(item, index) in types" :key="index">
                     <input v-model="type" type="radio" :value="item.value" :id="'selectionRadio' + item.value"
                        name="selectionRadio">
                     <label :for="'selectionRadio' + item.value">
                        <span>{{ item.name }}</span>
                     </label>
                  </li>
               </ul>
               <CatalogFilters fromHome :type="type" :isOpenModal="isOpenModal" @changeType="onChangeType"
                  @closeModal="isOpenModal = false" v-model:loading="loading" @search="onSearch"
                  :isSearchingMap="isSearchingMap" />
            </div>
            <div class="catalog-filters__controls">
               <UiButton class="black" @click="isOpenModal = true">
                  <FilterIcon />
                  Параметры
               </UiButton>
               <UiButton class="white map" @click="isSearchingMap = true">
                  <img src="/img/btn-map.png" alt="" class="circle">
                  <span>На карте</span>
               </UiButton>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import FilterIcon from '@/assets/img/icons/filter.svg'
const isOpenModal = ref(false)
const router = useRouter()

const types = ref([
   {
      name: 'Новостройки',
      value: "build",
   },
   {
      name: 'Вторичная',
      value: "secondary",
   },
   {
      name: 'Коммерция ',
      value: "commerce",
   },
])
const type = ref("build")

const onChangeType = (value) => {
   type.value = value
}
let { result: count } = await useBaseFetch('/typescounter?type=apartament')
const onSearch = (url) => {
   router.push(`/catalog/${type.value}${url}`)
   // console.log('SEARCH ON HOME PAGE', url, type.value);
}


const isSearchingMap = ref(false)
const loading = ref(true)
</script>


<style lang="scss" scoped>
.map {
   overflow: hidden;

   .circle {
      --size: 32px;
   }
}
</style>