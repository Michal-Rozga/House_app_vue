<template>
    <div class="navigation__wrapper">
        <nav v-show="!mobile" class="navigation__container">
            <div class="branding">
                <Logo class="dtt__logo"/>
            </div>
            <div class="navigation__links">
                <ul>
                    <router-link class="link" :to="{ name: 'Home' }">Houses</router-link>
                    <router-link class="link" :to="{ name: 'About' }">About</router-link>
                </ul>
            </div>
        </nav>       
    </div>
</template>

<script>
import Logo from '../NavBar/Logo.vue';




export default {
    name: "Navigation",
    components: {
        Logo,
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

};
</script>

<style lang="scss" scoped>
.navigation__wrapper {
    border-color: #000000;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 9;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: .3s color ease;
        font-size: 20px;
        
        &:hover{
            color: #f79424;
        }
    }

    .navigation__container {
        display: flex;
        flex-direction: row;
        padding: 25 px;
        height: 80px;

        .branding {
            display: flex;
            align-items: center;
            padding-left: 290px;
        }

        .navigation__links {
            position: relative;
            display: flex;
            flex: 1;
            margin-left: 55px;
            align-items: center;
            justify-content: space-between;

            ul {

                a.router-link-exact-active {
                    color: #000000;
                }


                a {
                    color: hsl(0, 0%, 77%);
                    text-decoration: none;
                    border-bottom: 1px solid transparent;
                    transition: color ease-out 250ms, border ease-out 250ms;
                }
                
                a:hover {
                    color: #f78a31;
                    border-bottom-color: currentColor;
                }

                .link:last-child {
                    margin-left: 55px;
                    margin-right: 0%;
                }

            }
        }
    }
}
</style>