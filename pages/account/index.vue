<template>
   <section class="account-profile">
      <AccountHeader>
         <h1 class="account-page__title">Профиль</h1>
         <button class="account-profile__exit">Выйти</button>
      </AccountHeader>
      <div class="account-profile__main">
         <div class="account-profile__image">
            <input type="file" style="display: none;" id="account-profile__image">
            <label for="account-profile__image">
               <div class="circle">
                  <span>А</span>
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
               <FormInput placeholder="Номер телефона" v-model="phone" isPhone />
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
         <ul class="account-requisites__inputs account-profile__inputs">
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
         </ul>
      </div>
      <div class="account-profile__footer">
         <UiButton class="black account-requisites__save">Сохранить изменения</UiButton>
      </div>
   </section>
</template>
<script setup>
import PlusImage from "@/assets/img/icons/account-plus-image.svg"
import { useAccount } from '~/store/account'
const router = useRouter()
const store = useAccount()
const surname = ref("")
const name = ref("")
const fatherName = ref("")
const phone = ref(store?.user?.phonenumber)
const wh = ref("")
const tg = ref("")
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


const orgName = ref("")
const inn = ref("")
const bik = ref("")
const paymentAcc = ref("")
const corrAcc = ref("")
watch(() => store.user, () => {
   console.log("store.user", store.user);
})
</script>