<template>
    <div class="wrapper">
        <div class="listing__holder">
            <div class="backButton__holder">
                <svg class="back__arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="$router.go(-1)">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <h4>Back to overview</h4>
            </div>
            <div class="details__holder">
                <img :src="house.image" />
                <div class="street__btn__holder">
                    <h1>{{ house.location.street }}</h1>
                    <div class="buttons__holder">
                        <svg class="edit" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="house.madeByMe">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        <svg class="delete" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="house.madeByMe" @click="alertDisplay(house.id)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </div>
                </div>
                <div class="location__holder">
                    <svg class="location__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {{ house.location.zip}}
                    {{ house.location.city }}
                </div>
                <div class="price__holder">
                    <svg class="price__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ house.price }}
                    <div class="icon__container">
                        <unicon class="size__icon" name="vector-square" fill="#7f7d7d" />
                        <p>{{ house.size }}</p>
                        <div class="icon__container">
                            <unicon class="construction__icon" name="wall" fill="#7f7d7d" />
                            <p>Built in {{ house.constructionYear }}</p>
                        </div>
                    </div>
                </div>
                <div class="additional__info">
                    <unicon class="bedroom__icon" name="bed-double" fill="#7f7d7d" />
                    <p>{{ house.rooms.bedrooms }}</p>
                    <unicon class="Bathroom__icon" name="bath" fill="#7f7d7d" />
                    <p>{{ house.rooms.bathrooms }}</p>
                    <unicon class="garage__icon" name="estate" fill="#7f7d7d" />
                    <p>{{ house.hasGarage ? 'Yes' : 'No'}}</p>
                </div>
                <div class="description__holder">
                    <p>{{ house.description }}</p>
                </div>
            </div>
        </div>
        <div class="recommend__holder">

        </div>
    </div>
   
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import CreateHouse from '../../components/CreateHouse.vue'

export default {
    name: 'HouseDetails',
    components: { CreateHouse },
    props: ['id'],
    

    data(){
        return {
            house: [],
        }
    },

    created() {
        const id = this.id;
        const headers = this.$store.state.headers;
        axios.get('https://intern-api.docker-dev.d-tt.nl/api/houses/', { headers })
        //axios.get('http://localhost:3000/houses')
        .then(response => response.data)
        .then(houses => houses.find(house => house.id === parseInt(id)))
        .then(house => {this.house = house})
        .catch(err => console.log(err.message));
    },

    methods: {
       
        // confirm message to deleteHouse (message, title, type, reverseButton) / then delete
        alertDisplay(id){
            const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your listing has been deleted.',
                    'success'
                )
                const headers = this.$store.state.headers;
                axios.delete('https://intern-api.docker-dev.d-tt.nl/api/houses/' + id, { headers })
                    .then(response => {
                        this.$router.push({name: 'Home'});
                     })
                .catch(function (error) {
                    console.log(error.response);
                });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your listing is safe :)',
                    'error'
                )
            }
            })
        },
    },

}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    padding-top: 45px;

    .listing__holder {
        max-width: 850px;
        padding-bottom: 50px;

        .backButton__holder {
            display: flex;
            align-items: center;
            padding-bottom: 35px;

            .back__arrow {
                width: 30px;
                padding-right: 15px;
                color: #4a4b4c;
            }
        }

        .details__holder {
            background-color: white;

            img {
                width: 850px;
            }

            .street__btn__holder {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 20px;
                padding-left: 20px;

                .buttons__holder {
                    padding-right: 25px;
                    
        
                    .delete {
                        width: 25px;
                        color: #4a4a4a;

                        :hover{
                            color: #e65540;
                        }
                    }

                    .edit {
                        width: 25px;
                        color: #4a4a4a;
                        padding-right: 20px;

                        :hover{
                            color: #e65540;
                        }
                    }
                }
                    
            }

            .location__holder {
                padding-left: 20px;
                padding-top: 20px;
                color: #4a4a4a;
                display: flex;
                align-items: center;

                .location__icon {
                    width: 30px;
                    padding-right: 5px;
                }
            }

            .price__holder {
                padding-left: 20px;
                padding-top: 20px;
                display: flex;
                align-items: center;

                .price__icon {
                    width: 30px;
                    color: #4a4a4a;
                    padding-right: 5px;
                }

                .icon__container{
                    display: flex;
                    align-items: center;
                    padding-left: 30px;
                }

            }

            .additional__info {
                padding-left: 20px;
                padding-top: 20px;
                display: flex;
                align-items: center;

                p {
                    padding-left: 5px;
                    padding-right: 25px;
                }

            }

            .description__holder {
                padding-left: 20px;
                padding-top: 30px;
                padding-right: 20px;
                padding-bottom: 40px;

                p {
                    font-size: 22px;
                }
            }
        }
    }

    .recommend__holder {
        width: 450px;      
    }
}
</style>