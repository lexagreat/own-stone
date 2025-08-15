<template>
  <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form get-catalog">
    <div class="modal__content object-form__content" v-if="success">
      <UiModalCloseBtn @click="emit('closePopup')" />
      <ModalSucess
        title="Заявка <span>отправлена</span>"
        subtitle="Теперь Вы будете в курсе всех уникальных предложений"
      />
    </div>
    <div class="modal__content object-form__content row" ref="wrapper" v-else>
      <UiModalCloseBtn @click="emit('closePopup')" />
      <div class="object-form__image">
        <img v-if="contactsStore.leadMagnit?.image?.url?.length" :src="contactsStore.leadMagnit?.image?.url" alt="" />
      </div>
      <div class="object-form__wrapper">
        <div class="object-form__header">
          <h3
            class="object-form__title h1 dark-title"
            v-if="contactsStore.leadMagnit?.title?.length"
            v-html="contactsStore.leadMagnit?.title"
          ></h3>
          <p
            class="body-text"
            v-if="contactsStore.leadMagnit?.description?.length"
            v-html="contactsStore.leadMagnit?.description"
          ></p>
        </div>
        <div class="object-form__main">
          <div class="object-form__inputs">
            <FormInput placeholder="Ваше имя" v-model="name" />
            <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
            <div class="form-section__check" style="margin-top: 12px">
              <FormCheckbox v-model="checked" id="object-form__check" />
              <label for="object-form__check" style="cursor: pointer">
                <span>
                  Я согласен с 
                  <NuxtLink to="/consent" target="_blank">Согласием на обработку персональных данных</NuxtLink>
                </span>
              </label>
            </div>
            <div class="form-section__check" style="margin: 0">
              <FormCheckbox v-model="checkedSec" id="form-section__check" />
              <label for="form-section__check" style="cursor: pointer">
                <span>
                  Я согласен с 
                  <NuxtLink to="/oferta" target="_blank">Соглашением на оферту о сотрудничестве</NuxtLink>
                </span>
              </label>
            </div>
            <div class="form-section__check" style="margin: 0">
              <FormCheckbox v-model="advertising" id="form-section__check3" />
              <label for="form-section__check3" style="cursor: pointer">
                <span>
                  Я согласен на
                  <NuxtLink to="/advertising" target="_blank">Получение информационных и рекламных сообщений</NuxtLink>
                </span>
              </label>
            </div>
          </div>
          <UiButton class="black" style="width: 100%" :class="{ disabled: !isDisabledBtn }" @click="send">
            Отправить заявку
          </UiButton>
        </div>
      </div>
    </div>
  </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account';
import { useContacts } from '~/store/contacts';
const contactsStore = useContacts();
const store = useAccount();
const props = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(['closePopup']);

const name = ref(store.user?.firstname);
const phone = ref(store.user?.phonenumber);

const wrapper = ref(null);

const isDisabledBtn = computed(() => {
  return checked.value && checkedSec.value && name.value.length && phone.value.length >= 15;
});

const checked = ref(false);
const checkedSec = ref(false);
const advertising = ref(false);
const success = ref(false);

const send = async () => {
  let object = {
    subject: 'Получить каталог лид-магнит с сайта own stone',
    advertisingcheckmark: advertising.value,
    text: `
         Имя: ${name.value}
         Телефон: ${wrapper.value.querySelector('.phone p span').innerHTML} ${phone.value}
      `,
  };
  let response = await store.sendForm(object);
  // console.log(response);
  if (response.status) {
    const fileUrl = contactsStore.leadMagnit.file.url;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = 'catalog'; // Можно указать имя файла, например: 'presentation.pdf'
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    name.value = store.user?.firstname;
    phone.value = store.user?.phonenumber;
    checked.value = false;
    checkedSec.value = false;
    advertising.value = false;
    success.value = true;
    setTimeout(() => {
      emit('closePopup');
      success.value = false;
    }, 2000);
  }
};
</script>

<style lang="scss">
.get-catalog {
  .v-select {
    max-width: 100%;
  }

  .modal-success {
    padding: 40px;
  }

  .object-form {
    &__content {
      &.row {
        width: 907px;
        display: flex;
        flex-direction: row;

        @media (max-width: 1024px) {
          width: 100%;
          flex-direction: column !important;
        }
      }
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 40px;

      @media (max-width: 1024px) {
        width: 100%;
      }
    }

    &__image {
      @media (max-width: 1024px) {
        display: none;
      }
    }
  }

  .modal__close {
    @media (max-width: 1024px) {
      border-radius: 34px;
      background: rgba(255, 255, 255, 0.05);

      /* blur */
      backdrop-filter: blur(10px);

      svg path {
        fill: white !important;
      }
    }
  }

  .modal__content {
    padding: 0 !important;
    gap: 0;
    overflow: hidden;
    border-radius: 8px;
  }

  .object-form__image {
    flex: 0 0 444px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 1024px) {
      display: block;
      flex: 0 0 200px;
      height: 200px;
    }
  }

  .object-form__wrapper {
    padding: 40px;

    @media (max-width: 1024px) {
      padding: 24px 12px;
    }
  }
}
</style>
