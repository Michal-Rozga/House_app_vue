<template>
    <div class="mobile__view" v-show="mobile">
        <router-link class="link" :to="{ name: 'Home' }"><HomeIcon class="home__icon"  /></router-link>
        <router-link class="link" :to="{ name: 'About' }"><InfoIcon class="info__icon" /></router-link>
    </div>       
</template>

<script>
import HomeIcon from '../FooterBar/HomeIcon.vue';
import InfoIcon from '../FooterBar/InfoIcon.vue';

export default {
    name: 'Footer',
    components: {
        HomeIcon,
        InfoIcon,
    },
    data() {
        return {
            mobile: null,
            mobileNav: null,
            windowWidth: null,
        };
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods: {
        checkScreen(){
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },

        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
    },

}
</script>

<style lang="scss" scoped>
.mobile__view {
    margin-top: auto;
    background-color: white;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .home__icon {
        max-height: 30px;
        max-width: 30px;
    }

    .info__icon {
        max-height: 30px;
        max-width: 30px;
    }
}
</style>