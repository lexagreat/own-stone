<template>
  <UiModal :isOpen="isOpen" @close-popup="emit('close')">
    <div class="modal__content">
      <UiModalCloseBtn @click="emit('close')" />
      <div class="secondary-modal">
        <div class="secondary-modal__main">
          <div class="secondary-modal__image">
            <img src="/img/secondary-modal.png" alt="" />
          </div>
          <div class="secondary-modal__info">
            <ul class="catalog-card__banners">
              <li>1 Комната</li>
              <li>40.4 м2</li>
            </ul>
            <span class="secondary-modal__price">26 500 000 ₽</span>
            <div class="secondary-modal__description">
              Продаются 1 комнатные апартаменты в жилом комплексе бизнес класса Voxhall Добро пожаловать в Voxhall
              современный жилой комплекс, который сочетает в себе комфорт, стиль и высокие технологии. Идеальное место
              для жизни, работы и отдыха. Современная архитектура: Эстетика Voxhall поражает с первого взгляда.
              Уникальный дизайн зданий и благоустроенные территории создают атмосферу уюта и гармонии. Удобное
              расположение: Комплекс находится в сердце города, что обеспечивает лёгкий доступ к основным транспортным
              артериям, магазинам, ресторанам, историческим и культурным достопримечательностям. 1 собственник, договор
              уступки. Звоните, отвечу на все вопросы!
            </div>

            <div class="secodnary-modal__btns">
              <UiButton class="black">Посмотреть на карте</UiButton>
              <UiButton class="white">Посмотреть на карте</UiButton>
            </div>
          </div>
        </div>
        <div class="secondary-modal__chars"></div>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import type { IApartCard } from '~/types/catalog';

const props = defineProps<{
  isOpen: boolean;
  info: IApartCard;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<style lang="scss">
.secondary-modal {
  display: flex;
  flex-direction: column;
  // .secondary-modal__main

  &__main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
  }

  // .secondary-modal__image

  &__image {
  }

  // .secondary-modal__info

  &__info {
  }

  // .secondary-modal__price

  &__price {
  }

  // .secondary-modal__description

  &__description {
  }

  // .secondary-modal__chars

  &__chars {
  }
}
.catalog-card {
  // .catalog-card__banners

  &__banners {
  }
}
.secodnary-modal {
  // .secodnary-modal__btns

  &__btns {
  }
}
.black {
}
.white {
}
</style>
