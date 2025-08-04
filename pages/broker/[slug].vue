<script setup lang="ts">
import PhoneIcon from '@/assets/img/icons/broker-phone.svg';
import MailIcon from '@/assets/img/icons/broker-mail.svg';
import PinIcon from '@/assets/img/icons/broker-pin.svg';
import type { IBrokerPage } from '~/types/broker';
const route = useRoute();
const isModalOpen = ref(false);

const { data } = await useBaseFetch(`/stranicza-brokeras?page_url=${route.params?.slug}&populate=*`);

const info = data as IBrokerPage;
if (!info?.id) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  });
}

useHead({
  title: `Брокер ${info.name}`,
});
</script>
<template>
  <main class="main">
    <ModalMakeReview
      :brokerName="info.name + ' (Брокер)'"
      :isOpen="isModalOpen"
      @close-popup="isModalOpen = false"
      :hiddenRating="!!!info.show_rating"
    />
    <section class="broker-page">
      <div class="container">
        <div class="broker-page__wrapper">
          <div class="broker-page__main">
            <div class="broker-page__image" style="background-color: #f1f1f1">
              <img :src="info.photo.url" alt="" />
            </div>
            <div class="broker-page__form">
              <div class="contacts-hero__item">
                <h3 class="h3 dark-title">
                  Оцените качество
                  <br />
                  работы брокера
                </h3>
                <UiButton class="black" @click="isModalOpen = true">Оставить отзыв</UiButton>
              </div>
            </div>
          </div>
          <div class="broker-page__info">
            <div class="broker-page__content">
              <div class="broker-page__image" style="background-color: #f1f1f1">
                <img :src="info.photo.url" alt="" />
              </div>
              <div class="broker-page__subheader">
                <div class="broker-page__header">
                  <span class="body-text">{{ info.rank }}</span>
                  <h1 class="h1">{{ info.name }}</h1>
                </div>
                <p class="broker-page__text body-text" v-html="info?.description"></p>
              </div>
              <p class="broker-page__text body-text" v-html="info?.description"></p>
            </div>
            <div class="broker-page__footer">
              <ul class="broker-page__list">
                <li>
                  <div>
                    <PhoneIcon width="16" />
                  </div>
                  <p>
                    <a :href="'tel:' + info.phone_number">{{ info.phone_number }}</a>
                  </p>
                </li>
                <li>
                  <div>
                    <MailIcon width="16" />
                  </div>
                  <p>
                    <a :href="'mailto:' + info.email">{{ info.email }}</a>
                  </p>
                </li>
                <li>
                  <div>
                    <PinIcon width="16" />
                  </div>

                  <p>
                    <span>{{ info.address }}</span>
                    <span class="body-text" style="color: #00000080">{{ info.schedule }}</span>
                  </p>
                </li>
              </ul>
              <div class="broker-page__qr">
                <p>Сканируйте этот QR-код, чтобы связаться со мной</p>
                <div>
                  <img :src="info.qr.url" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
