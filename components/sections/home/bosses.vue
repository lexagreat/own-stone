<template>
   <section class="bosses-section">
      <div class="container">
         <div class="bosses-section__wrapper">
            <div class="bosses-section__card">
               <div class="bosses-section__main">
                  <div class="bosses-section__image">
                     <img src="/img/home/boss1.png" alt="">
                  </div>
                  <div class="bosses-section__info">
                     <span class="bosses-section__rang body-text">Основатель</span>
                     <h3 class="bosses-section__name h2">СЕРГЕЙ АНТОНЕНКО</h3>
                     <p class="bosses-section__text">Наша цель — предоставить клиентам не просто качественную услугу, а
                        создать для них комфортные условия для принятия решений. Мы уверены, что каждая сделка — это не
                        просто цифры, а важный и ответственный шаг в жизни наших клиентов, поэтому наш подход всегда
                        строится на взаимном доверии и высоких стандартах работы.</p>
                  </div>
               </div>
               <div class="bosses-section__footer">
                  <p class="body-text">Будьте в курсе новостей, интересных кейсов от OWNSTONE и следите за яркими
                     событиями из жизни основателя компании</p>
                  <ul>
                     <li>
                        <NuxtLink to="/" target="_blank" class="circle">
                           <TgIcon />
                        </NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/" target="_blank" class="circle">
                           <WhatsappIcon />
                        </NuxtLink>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="bosses-section__card">
               <div class="bosses-section__main">
                  <div class="bosses-section__image">
                     <img src="/img/home/boss2.png" alt="">
                  </div>
                  <div class="bosses-section__info">
                     <span class="bosses-section__rang body-text">Основатель</span>
                     <h3 class="bosses-section__name h2">ГЕОРГИЙ НЕТУКОВ</h3>
                     <p class="bosses-section__text">Благодаря нашему опыту и глубокому знанию рынка, мы гарантируем,
                        что каждая сделка будет соответствовать самым высоким стандартам работы. Для нас важно не только
                        предложить клиенту лучшее на рынке, но и сделать процесс сотрудничества максимально прозрачным.
                        Мы ставим потребности клиента на первое место, предоставляя премиальный сервис для каждого, кто
                        обратился к нам за помощью.</p>
                  </div>
               </div>
               <div class="bosses-section__footer">
                  <p class="body-text">Будьте в курсе новостей, интересных кейсов от OWNSTONE и следите за яркими
                     событиями из жизни основателя компании</p>
                  <ul>
                     <li>
                        <NuxtLink to="/" target="_blank" class="circle">
                           <TgIcon />
                        </NuxtLink>
                     </li>
                     <li>
                        <NuxtLink to="/" target="_blank" class="circle">
                           <WhatsappIcon />
                        </NuxtLink>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import TgIcon from '@/assets/img/icons/tg-24.svg'
import WhatsappIcon from '@/assets/img/icons/whatsapp-24.svg'
</script>