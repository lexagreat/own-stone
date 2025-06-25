<template>
   <section class="about-partners" v-if="partners.length">
      <div class="container">
         <div class="about-partners__wrapper">
            <h2 class="h1 about-partners__title light-title">партнеры</h2>
            <ul class="about-partners__list">
               <li class="about-partners__item" @click="clickHandler(item)" v-for="item in partners" :key="item.id">
                  <div class="about-partners__icon">
                     <img :src="item.logo?.url" alt="">
                  </div>
                  <p class="about-partners__text body-text" v-html="item?.small_description">
                  </p>
                  <button class="about-partners__btn" @click.stop="clickHandler(item, 'form')">Запросить
                     контакты</button>
               </li>
            </ul>
            <UiButton class="white" style="width: 152px;" v-if="isNextPage">Показать еще</UiButton>
         </div>
      </div>
      <ModalAboutPartnerInfo :isOpen="isOpenInfoModal" :info="currentPartner" @closePopup="isOpenInfoModal = false"
         @openForm="isOpenInfoModal = false, isOpenFormModal = true" />
      <ModalAboutPartnerForm :isOpen="isOpenFormModal" :partner="currentPartner?.title"
         @closePopup="isOpenFormModal = false" />
   </section>
</template>
<script setup>
const isOpenInfoModal = ref(false)
const isOpenFormModal = ref(false)
const currentPartner = ref(null)

const clickHandler = (item, type) => {
   currentPartner.value = item;
   if (type == 'form') {
      isOpenFormModal.value = true
   } else {
      isOpenInfoModal.value = true

   }
}
const partners = ref([])
const page = ref(1)
const isNextPage = ref(false)
const getPartners = async () => {
   let { data, meta } = await useBaseFetch(`/partneries?populate=*&pagination[page]=${page.value}`)
   if (page.value == 1) {
      partners.value = data;
   } else {
      partners.value = partners.value.concat(data);
   }
   isNextPage.value = Boolean(meta.pagination.pageCount > page.value)

}
watch(page, async () => {
   await getPartners()
}, {
   immediate: true
})
</script>