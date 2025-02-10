<template>
   <section class="account-profile">
      <AccountHeader>
         <h1 class="account-page__title">Профиль</h1>
         <button class="account-profile__exit" @click="exit">Выйти</button>
      </AccountHeader>
      <div class="account-profile__main">
         <div class="account-profile__image">
            <input type="file" style="display: none;" id="account-profile__image" @change="onChangeFile">
            <label for="account-profile__image">
               <div class="circle">
                  <img v-if="store.user?.avatar?.url || preview" :src="store.user?.avatar?.url || preview" alt="">
                  <span v-else-if="store.user?.firstname?.length">{{ store.user?.firstname[0] }}</span>
               </div>
               <PlusImage />
            </label>
         </div>
         <ul class="account-profile__inputs">
            <li>
               <FormInput placeholder="Фамилия" v-model="surname" />
            </li>
            <li>
               <FormInput placeholder="Имя" v-model="name" />
            </li>
            <li>
               <FormInput placeholder="Отчество" v-model="fatherName" />
            </li>
            <li>
               <FormInput placeholder="Номер телефона" v-model="phone" isPhone disabled />
            </li>
            <li>
               <FormInput placeholder="WhatsApp" v-model="wh" />
            </li>
            <li>
               <FormInput placeholder="Telegram" v-model="tg" />
            </li>
         </ul>
      </div>
      <div class="account-profile__requisites account-requisites">
         <div class="account-requisites__header">
            <h2 class="account-page__title">Реквизиты</h2>
            <ul class="app-tabs">
               <li v-for="req in reqs" :key="req">
                  <input type="radio" name="account-requisites" :id="'account-requisites' + req.name" :value="req.value"
                     v-model="currentReq">
                  <label :for="'account-requisites' + req.name">{{ req.name }}</label>
               </li>
            </ul>
         </div>
         <ul class="account-requisites__inputs account-profile__inputs" v-if="currentReq">
            <li>
               <FormInput placeholder="Название банка" v-model="bankName" />
            </li>
            <li>
               <FormInput placeholder="Номер карты" v-model="cardNumber" />
            </li>
            <li>
               <FormInput placeholder="Имя и Фамилия" v-model="nameForCard" />
            </li>
         </ul>
         <ul class="account-requisites__inputs account-profile__inputs" v-else>
            <li>
               <FormInput placeholder="Название организации" v-model="orgName" />
            </li>
            <li>
               <FormInput placeholder="ИНН" v-model="inn" />
            </li>
            <li>
               <FormInput placeholder="БИК" v-model="bik" />
            </li>
            <li>
               <FormInput placeholder="Расчетный счет" v-model="paymentAcc" />
            </li>
            <li>
               <FormInput placeholder="Корреспондентский счет" v-model="corrAcc" />
            </li>
            <li>
               <UiSelect class="app-select" :settings="formSettings" @selectOption="onSelectFormOption" />
            </li>
            <li>
               <UiSelect class="app-select" :settings="axisSettings" @selectOption="onSelectAxisOption" />
            </li>
         </ul>
      </div>
      <div class="account-profile__footer">
         <UiButton class="black account-requisites__save" @click="save">Сохранить изменения</UiButton>
      </div>
   </section>
</template>
<script setup>
import PlusImage from "@/assets/img/icons/account-plus-image.svg"
import { useAccount } from '~/store/account'
const router = useRouter()
const store = useAccount()
const surname = ref(store?.user?.secondname)
const name = ref(store?.user?.firstname)
const fatherName = ref(store?.user?.lastname)
const phone = ref(store?.user?.phonenumber)
watch(() => store?.user?.phonenumber, (value) => {
   phone.value = value
   console.log('поменялся телефон', value);
}, {
   immediate: true
})
onMounted(() => {

})
const wh = ref(store?.user?.whatsapp)
const tg = ref(store?.user?.telegram)
const bankName = ref(store?.user?.requisits_fiz_bank)
const cardNumber = ref(store?.user?.requisits_fiz_cardnumber)
const nameForCard = ref(store?.user?.requisits_fiz_name)
const reqs = ref([
   {
      name: "Юридическое лицо",
      value: 0
   },
   {
      name: "Физическое лицо",
      value: 1
   },
])
const currentReq = ref(0)


const orgName = ref(store?.user?.requisits_ul_organization)
const inn = ref(store?.user?.requisits_ul_inn)
const bik = ref(store?.user?.requisits_ul_bic)
const paymentAcc = ref(store?.user?.requisits_ul_rbill)
const corrAcc = ref(store?.user?.requisits_ul_corbill)
const avatar = ref(null)


const formSettings = ref({
   options: [
      {
         name: "ООО",
         value: 0,
         selected: true
      },
      {
         name: "ИП",
         value: 1,
      },
   ],
   placeholder: ""
})
const form = ref('')
function onSelectFormOption(option) {
   form.value = option.name
}
const axisSettings = ref({
   options: [
      {
         name: "ОСН",
         value: 0,
         selected: true
      },
      {
         name: "УСН",
         value: 1,
      },
      {
         name: "ПСН",
         value: 2,
      },
   ],
   placeholder: ""
})
const axis = ref('')

function onSelectAxisOption(option) {
   axis.value = option.name
}


const preview = ref('')




function isFileSizeUnder5MB(fileSizeInBytes) {
   const MAX_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5 MB в байтах
   return fileSizeInBytes < MAX_SIZE_IN_BYTES;
}

const onChangeFile = (e) => {
   if (isFileSizeUnder5MB(e.target.files[0].size)) {
      avatar.value = e.target.files[0]
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = function (event) {
            preview.value = event.target.result
         };

         reader.readAsDataURL(file); // Читаем содержимое файла как Data URL
      }
   } else {
      // console.log("Файл больше или равен 5 МБ.");
   }
}
const exit = () => {
   store.exit()
   router.push('/')
}


const save = async () => {
   let object = {
      "firstname": name.value,
      // "email": email.value,
      "secondname": surname.value,
      "lastname": fatherName.value,
      "whatsapp": wh.value,
      "telegram": tg.value,
      "requisits_fiz_bank": bankName.value,
      "requisits_fiz_cardnumber": cardNumber.value,
      "requisits_fiz_name": nameForCard.value,
      "requisits_ul_form": form.value,
      "requisits_ul_system": axis.value,
      "requisits_ul_organization": orgName.value,
      "requisits_ul_inn": inn.value,
      "requisits_ul_bic": bik.value,
      "requisits_ul_rbill": paymentAcc.value,
      "requisits_ul_corbill": corrAcc.value,
   }
   if (avatar.value) {
      object.avatar = avatar.value
   }
   let response = await store.changeData(object)
   // console.log(response);
}



watch(() => store.user?.requisits_ul_form, (value) => {
   formSettings.value.options.forEach(item => {
      if (item.name == value) {
         item.selected = true
         onSelectFormOption(item)
      } else {
         item.selected = false
      }
   })
})
watch(() => store.user?.requisits_ul_system, (value) => {
   axisSettings.value.options.forEach(item => {
      if (item.name == value) {
         item.selected = true
         onSelectAxisOption(item)
      } else {
         item.selected = false
      }
   })
})
onMounted(() => {
   if (store.user?.requisits_ul_system) {
      axisSettings.value.options.forEach(item => {
         if (item.name == store.user?.requisits_ul_system) {
            item.selected = true
            onSelectAxisOption(item)
         } else {
            item.selected = false
         }
      })
   }
   if (store.user?.requisits_ul_form) {
      formSettings.value.options.forEach(item => {
         if (item.name == store.user?.requisits_ul_form) {
            item.selected = true
            onSelectFormOption(item)
         } else {
            item.selected = false
         }
      })
   }
})


useHead({
   title: 'Профиль'
})

</script>



<style lang="scss">
.account-profile__inputs {
   .v-select {
      max-width: 100%;

      &__wrapper {

         background: #f8f8f8;
      }
   }
}
</style>