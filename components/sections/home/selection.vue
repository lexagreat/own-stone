<template>
   <section class="selection-section" id='home-selection'>
      <div class="container">
         <div class="selection-section__wrapper">
            <div class="selection-section__header h1">
               <h2 class="selection-section__title">подобрать недвижимость </h2>
               <span class="selection-section__count">3 100 объектов </span>
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
                  @closeModal="isOpenModal = false" @search="onSearch" />
            </div>
            <div class="catalog-filters__controls">
               <UiButton class="black" @click="isOpenModal = true">
                  <FilterIcon />
                  Параметры
               </UiButton>
               <UiButton class="white map">
                  <img src="@/assets/img/icons/btn-map.png" alt="">
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

const onSearch = (url) => {
   router.push(`/catalog/${type.value}${url}`)
   console.log('SEARCH ON HOME PAGE', url, type.value);
}
</script>