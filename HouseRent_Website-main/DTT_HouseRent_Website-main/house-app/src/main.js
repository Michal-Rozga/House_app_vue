import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//unicons

import Unicon from 'vue-unicons'
import { uniSearch, uniTimes, uniPen, uniTrashAlt, uniLocationPoint, uniEuroCircle, uniVectorSquare, uniWall, uniBedDouble, uniBath, uniEstate, uniImage } from 'vue-unicons/dist/icons'

Unicon.add([uniSearch, uniTimes, uniPen, uniTrashAlt, uniLocationPoint, uniEuroCircle, uniVectorSquare, uniWall, uniBedDouble, uniBath, uniEstate, uniImage])

// Vue 3 sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';



createApp(App).use(store).use(router, VueSweetalert2).use(Unicon, {height:30, width: 30}).mount('#app')
