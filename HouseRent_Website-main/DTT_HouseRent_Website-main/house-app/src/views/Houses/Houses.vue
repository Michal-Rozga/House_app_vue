<template>
    <div class="wrapper">
        <div class="search__sort">
            <div class="search__bar">
                <svg class="search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input class="search" v-model="search" placeholder="Search for a house">
                <svg class="clear__icon" @click="resetInput()" v-if="search != ''" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="sort__holder">
                <button class="price__button" :class="[sortBy === 'price' ? sortDirection : '']" @click="sort('price')">Price</button>
                <button class="size__button" :class="[sortBy === 'size' ? sortDirection : '']" @click="sort('size')">Size</button>
            </div>
        </div>    
        <h3 v-if="filteredHouses.length >= 0 && search != ''">Found {{ filteredHouses.length }} matching houses</h3>
        <div  class="house" v-for="house in filteredHouses" :key="house.id" :class="{ fav: house.isFav}">
            <div class="image__holder">
                <img :src="house.image" :alt="house.image" />
            </div>
            <div class="info__holder">
                <div class="street__holder">
                    <router-link :to="{ name: 'HouseDetails', params: { id: house.id}}" >
                        <h4> {{ house.location.street}}</h4>                    
                    </router-link>
                    <div class="buttons__holder">
                        <svg class="edit" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="house.madeByMe">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        <svg class="delete" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="house.madeByMe" @click="alertDisplay(house.id)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <svg class="fav__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  @click="toggleFav(house)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                    </div>
                </div>
                <h5> &euro; {{ house.price }} </h5>
                <div class="location__holder">
                    <p>{{ house.location.zip }}</p>
                    <p>{{ house.location.city }}</p>
                </div>
                <div class="additional__info">
                    <unicon class="bedroom__icon" name="bed-double" fill="#7f7d7d" />
                    <p>{{house.rooms.bedrooms}}</p>
                    <unicon class="bathroom__icon" name="bath" fill="#7f7d7d" />
                    <p>{{house.rooms.bathrooms}}</p>
                    <unicon class="size__icon" name="vector-square" fill="#7f7d7d" />
                    <p> {{ house.size }} m2</p>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'



export default {
    name: 'Houses',
 

    data(){
        return {
            search: '',
            houses: [],
            sortBy: 'price',
            sortDirection: 'asc',
            isFav: 'false',
            isActive: 'false'
        }
    },
    
    created() {
        this.getHouses();
    },

    methods: {
        // input reset on X in search bar

        resetInput() {
        this.search = "";    
        },

        //Get request using axios and set header to get the data from API

        getHouses(){
            // Since the API server was full at some point and non of the request were comming through 
            // I was forced to use the json-server to "finish" the project as far as I could go

            const headers = this.$store.state.headers;
            axios.get('https://intern-api.docker-dev.d-tt.nl/api/houses', { headers })
            // axios.get('http://localhost:3000/houses')
            .then(response => this.houses = response.data)
            .catch(function (error) {
                console.log(error.response);
            });
        },

        // Delete house with axios using id of a house

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
                        this.getHouses();
                    })
                    .catch(function (error) {
                        console.log(error.response);
                    });
                } else if (
                    /* Read more about handling dismissals below */
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

        //sort (changing the sort direction)

        sort(s){
            if(s === this.sortBy){
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            }
            this.sortBy = s;
            
        },

        // Adding to favourites on click

        toggleFav(house){
            house.isFav = !house.isFav
        },

    },

    computed:
    {   
        // Filtering houses by users input ( City ). ( toLowerCase() so it will not be char sensitive )
        // Sorting array per price and size

        filteredHouses(){
           return this.houses.filter(house => 
                house.location.city.toLowerCase().includes(this.search.toLowerCase()) 
                || house.location.street.toLowerCase().includes(this.search.toLowerCase()))
           .sort((p1,p2) => {
                let modifier = 1;
                if(this.sortDirection === 'desc') modifier = -1;
                if(p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
                if(p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
                return 0;
            });
        }, 
    },
   


}
</script>

<style lang="scss" scoped>
.wrapper{
    max-width: 1335px;
    margin-right: auto;
    margin-left: auto;

    h3{ 
        padding-bottom: 30px;
    }
    
    .search__sort {
        padding-bottom: 30px;
        display: flex;
        justify-content: space-between;

        .search__bar{
            position: relative;
            display: flex;
            min-width: 100px;
            width: fit-content;
            width: 100%;
            max-width: 375px;

            .search__icon{
                position: absolute;
                top: 6px;
                left: 8px;
                width: 25px;
                color: #7f7d7d;
            }

            .clear__icon{
                position: absolute;
                top: 8px;
                right: 8px;
                width: 25px;
                cursor: pointer;
                color: #4a4b4c;
            }

            .search {
                border: none;
                border-radius: 5px;
                height: 32px;
                width: 100%;
                padding: 2px 27px 2px 40px;
                outline: 0;
                background-color: #ded9d9;
            }

            .search:hover, .search:focus {
                border: 1.5px solid #009688;
                background-color: white;
            }
        }
        .sort__holder {
            display: flex;
            .price__button {
                position: relative;
                background-color: #c3c3c3;
                border-radius: 10px 0px 0px 10px;
                font-size: 18px;
                color: #FFFFFF;
                padding: 6px;
                width: 120px;
                text-align: center;
                text-decoration: none;
                cursor: pointer;
               
                &:target, &:focus, &:active {
                    background-color: #e65540;
                }
            }

            .size__button{
                position: relative;
                background-color: #c3c3c3;
                border-radius: 0px 10px 10px 0px;
                font-size: 18px;
                color: #FFFFFF;
                padding: 6px;
                width: 120px;
                text-align: center;
                text-decoration: none;
                cursor: pointer;

                &:target, &:focus, &:active {
                    background-color: #e65540;
                }
            }
        }
    }

    .house {
        border-color: #000000;
        border-radius: 15px 15px 15px 15px;
        background-color: #fff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 9;
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        flex-direction: row;
        
        &.fav {
            background-color: rgb(242, 245, 87);
        }


        .image__holder{
            padding-left: 20px;
                     
            img {
                width: 150px;
                height: 150px;
                border-radius: 15px 15px 15px 15px;  
            }
        }    

        .info__holder {
            padding-left: 25px;
            width: 1000px;
            height: 200px;  
            display: flex;
            flex-direction: column;
            justify-content: center;
            
            .street__holder {  
                display: flex;
                justify-content: space-between;
                padding-bottom: 20px;

                h4{
                    font-size: 20px;
                }
                
                .buttons__holder {  
                    .delete {
                        width: 30px;
                        color: #4a4a4a;
                    }

                    .edit {
                        width: 30px;
                        color: #e65540;
                        padding-right: 20px;
                    }

                    .fav__icon{
                        width: 30px;
                        color: #4a4a4a;
                    }
                }
            }

            h5{
                padding-bottom: 10px;
                color: #4a4a4a;
                font-size: 18px;
            }

            .location__holder { 
                display: flex;
                color: #9c9b9b;
                padding-bottom: 10px;
            }
            

           .additional__info { 
               display: flex;
               align-items: center;
               
               p {
                   padding-right: 20px;
                   padding-left: 10px;
               }
           }
        }
    }
}

</style>