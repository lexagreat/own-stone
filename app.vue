<template>
  <div class="wrapper lock-padding">
    <NuxtLayout>
      <!-- <transition name="page"> -->
      <NuxtPage />
      <BannersCookie />
      <ModalGetCatalog v-if="isLeadMagnit" :is-open="isOpenCatalogModal" @close-popup="isOpenCatalogModal = false" />
      <!-- </transition> -->
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useFavorites } from './store/favorites';
import { useContacts } from './store/contacts';
import { useRecently } from './store/recently';
const route = useRoute();
const contacts = useContacts();
const recentlyStore = useRecently();
const favorites = useFavorites();
const isOpenCatalogModal = ref(false);

contacts.getLeadMagnit();

const isLeadMagnit = computed(() => {
  return !route.path.includes('/form/') && !route.path.includes('/broker/');
});

onMounted(() => {
  if (!document.referrer.includes('ownstone')) {
    setTimeout(() => {
      if (route.name !== 'broker-slug') {
        isOpenCatalogModal.value = true;
      }
    }, contacts.leadMagnit?.when_to_show * 1000);
  }
  favorites.getFromLS();
  recentlyStore.getFromLS();
  // Проверяем, является ли браузер Safari
  let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isSafari) {
    // Если Safari, добавляем класс к body или другому элементу
    document.body.classList.add('safari-browser');
  }
});
contacts.getInfo();
contacts.getConsultIcon();
</script>

<style lang="scss">
@import 'swiper/swiper-bundle.css';
@import '@/assets/scss/style';

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  // &::before {
  //    content: "";
  //    display: block;
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100vw;
  // height: 100vh;
  // z-index: 101;
  // backdrop-filter: white;
  // }
  //    &::after {
  //       content: "";
  //       display: block;
  //       position: fixed;
  //       top: 50%;
  //       left: 50%;
  //       translate: -50% -50%;
  //       background: url(@/assets/img/icons/logo.svg) center / contain no-repeat;
  //       width: 200px;
  //       height: 200px;
  // z-index: 102;
  //    }
}
</style>
