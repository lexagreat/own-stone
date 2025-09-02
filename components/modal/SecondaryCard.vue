<template>
  <UiModal :isOpen="isOpen" @close-popup="emit('close')">
    <div class="modal__content scrollbar-none">
      <UiModalCloseBtn @click="emit('close')" />
      <div class="secondary-modal">
        <div class="secondary-modal__main">
          <div class="secondary-modal__image">
            <Swiper
              @swiper="onSwiper"
              :mousewheel="{ enabled: true, forceToAxis: true }"
              :space-between="10"
              :slides-per-view="1"
              :loop="true"
              :modules="[Mousewheel]"
            >
              <template v-for="item in info?.photos" :key="item?.url">
                <SwiperSlide v-if="item?.url">
                  <img :src="item?.url" alt="" />
                </SwiperSlide>
              </template>
            </Swiper>
            <button @click="slidePrev" class="prev">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M9 13L4 8L9 3"
                  stroke="#181818"
                  stroke-width="1.33333"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button @click="slideNext" class="next">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M7 3L12 8L7 13"
                  stroke="#181818"
                  stroke-width="1.33333"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div class="secondary-modal__info">
            <ul class="catalog-card__banners">
              <li v-if="info?.count_rooms > 0">
                {{ info?.count_rooms }} {{ morph(+info?.count_rooms, ['комната', 'комнаты', 'комнат']) }}
              </li>
              <li v-else>студия</li>
              <li>{{ info?.square_apartament }} м2</li>
            </ul>
            <span class="secondary-modal__price h2">{{ formatPrice(info?.cost_total) }}</span>
            <div class="secondary-modal__description" v-html="descriptionParts.first"></div>

            <div class="secondary-modal__btns">
              <NuxtLink class="btn black" :to="'tel:' + contactsStore?.info?.contacts_info?.phonenumber">
                <PhoneIcon />
                <span>{{ contactsStore?.info?.contacts_info?.phonenumber }}</span>
              </NuxtLink>
              <NuxtLink v-if="info?.cian_url" class="btn white" :to="info?.cian_url" target="_blank">
                Посмотреть на Циан
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="secondary-modal__chars">
          <h3 class="h3 secondary-modal__subtitle">характеристики</h3>

          <ul class="body-text">
            <li v-for="item in parsePropertyInfoGrouped(descriptionParts.second).properties">
              <span>{{ item.key }}</span>
              <span>{{ item.value }}</span>
            </li>
            <li>
              <span>Станции метро</span>
              <p>
                <span v-for="item in parsePropertyInfoGrouped(descriptionParts.second).metroStations">
                  {{ item.station }}
                  {{ item.time }}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useContacts } from '~/store/contacts';
import type { IApartCard } from '~/types/catalog';
import PhoneIcon from '~/assets/img/icons/phone.svg';

const props = defineProps<{
  isOpen: boolean;
  info: IApartCard | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const contactsStore = useContacts();

const swiperInstance = ref<SwiperType | null>(null);
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
  setTimeout(() => {
    if (swiper) {
      swiper.update();
    }
  }, 50);
};

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev();
  }
};

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};

const descriptionParts = computed(() => {
  if (!props.info?.description) return { first: '', second: '' };

  const description = props.info.description;
  const splitPoint = description.indexOf('Тип жилья:');

  if (splitPoint === -1) {
    return { first: description, second: '' };
  }

  return {
    first: description.substring(0, splitPoint).trim(),
    second: description.substring(splitPoint).trim(),
  };
});

function parsePropertyInfoGrouped(text: string) {
  const lines = text.split('<br>').filter((line) => line.trim() !== '');

  const properties = [];
  const metroStations = [];
  let isMetroSection = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === 'Станции метро') {
      isMetroSection = true;
      continue;
    }

    if (trimmedLine.includes(':')) {
      const [key, value] = trimmedLine.split(':').map((str) => str.trim());

      if (isMetroSection) {
        metroStations.push({ station: key, time: value });
      } else {
        properties.push({ key, value });
      }
    }
  }

  return { properties, metroStations };
}
watch(
  () => props.isOpen,
  async (value) => {
    if (value) {
      await nextTick();
      setTimeout(() => {
        if (swiperInstance.value) {
          swiperInstance.value.update();
          swiperInstance.value.slideTo(0, 0);
        }
      }, 100);
    }
  },
);
</script>

<style lang="scss" scoped>
.modal__content {
  max-width: 100vw;
  top: 0;
  left: 0;
  transform: unset !important;
  height: 100vh;
  overflow-y: auto;
  padding: 60px 40px !important;
  @media (max-width: 1024px) {
    padding: 64px 12px !important;
  }
}
.secondary-modal {
  display: flex;
  flex-direction: column;
  // .secondary-modal__main

  &__main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
    @media (max-width: 1024px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 32px;
    }
  }

  // .secondary-modal__image

  &__image {
    border-radius: 8px;
    overflow: hidden;
    max-height: 360px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .swiper {
      height: 100%;
    }
    button {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background: var(--white-50, rgba(255, 255, 255, 0.5));
      /* blur */
      backdrop-filter: blur(10px);
      z-index: 300;
    }
    .prev {
      left: 8px;
    }
    .next {
      right: 8px;
    }
  }

  // .secondary-modal__info

  &__info {
  }

  // .secondary-modal__price

  &__price {
    margin-top: 20px;
    display: block;
  }

  // .secondary-modal__description

  &__description {
    margin: 30px 0;
    font-family: 'Arial';
    font-weight: 400;
    font-size: 15px;
    line-height: 140%;
    letter-spacing: 0%;
  }
  &__btns {
    display: flex;
    gap: 16px;

    @media (max-width: 1024px) {
      gap: 8px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  // .secondary-modal__chars

  &__chars {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 80px;
    @media (max-width: 1024px) {
      margin-top: 64px;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 60px;
      row-gap: 8px;
      @media (max-width: 1024px) {
        grid-template-columns: repeat(1, 1fr);
      }
      li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--black-15, #18181826);
        padding-bottom: 4px;
        & > span {
          &:nth-child(1) {
            color: rgba(24, 24, 24, 0.5);
          }
          &:nth-child(2) {
            color: #181818;
          }
        }
      }
    }
  }
}
</style>
