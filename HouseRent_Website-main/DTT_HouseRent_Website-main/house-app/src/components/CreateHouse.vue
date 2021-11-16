<template>
    <div class="wrapper">
        <div class="inner__wrapper">
            <div class="backButton__holder">
                <svg class="back__arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="$router.go(-1)">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <h4>Back to overview</h4>
            </div>
            <h1>Create new listing</h1>
            <div>
                <form @submit.prevent="createHouse">
                    <div class="row">
                        <label for="streetname">Street name*</label>
                        <input class="text__field" type="text" id="streetName" v-model="formData.streetName" placeholder="Enter the street name" required>
                    </div>
                    <div class="row2">
                        <div class="inner__row">
                            <label for="houseNumber">House number*</label>
                            <input class="text__field2" type="text" id="houseNumber" v-model="formData.houseNumber" placeholder="Enter house number" required>
                        </div>
                        <div class="inner__row">
                            <label for="numberAddition">Addition (optional)</label>
                            <input class="text__field2" type="text" id="numberAddition" v-model="formData.numberAddition" placeholder="e.g. A">
                        </div>
                    </div>
                    <div class="row">
                        <label for="zip">Postal code*</label>
                        <input class="text__field" type="text" id="zip" v-model="formData.zip" placeholder="e.g. 1000AA" required>
                    </div>
                    <div class="row">
                        <label for="city">City*</label>
                        <input class="text__field" type="text" id="city" v-model="formData.city" placeholder="e.g. Utrecht" required>
                    </div>
                    <div class="upload__picture">
                        <label>Upload Picture (PNG or JPEG)*</label> 
                        <input type="file" accept="image/*" @change="uploadImage($event)" id="image" required>
                        <unicon class="image__icon" name="image" fill="#7f7d7d" />
                    </div>
                    <div class="row">
                        <label for="price">Price*</label>
                        <input class="text__field" type="text" id="price" v-model="formData.price" placeholder="e.g. €150.000" required>
                    </div>
                    <div class="row2">
                        <div class="inner__row">
                            <label for="size">Size*</label>
                            <input class="text__field2" type="text" id="size" v-model="formData.size" placeholder="e.g. 60m2" required>
                        </div>
                        <div class="inner__row">
                            <div id="hasGarage">
                                <label for="hasGarage">Garage*</label>
                                <select v-model="formData.hasGarage" required>
                                    <option disabled value="">Please select one</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row2">
                        <div class="inner__row">
                            <label for="bedrooms">Bedrooms*</label>
                            <input class="text__field2" type="text" id="bedrooms" v-model="formData.bedrooms" placeholder="Enter amount" required>
                        </div>
                        <div class="inner__row">
                            <label for="bathrooms">Bathrooms*</label>
                            <input class="text__field2" type="text" id="bathrooms" v-model="formData.bathrooms" placeholder="Enter amount" required>
                        </div>
                    </div>
                    <div class="row">
                        <label for="constructionYear">Construction date*</label>
                        <input class="text__field" type="text" id="constructionYear" v-model="formData.constructionYear" placeholder="e.g. 1990" required>
                    </div>
                    
                    <div class="row">
                        <label for='description'>Description*</label>
                        <textarea class="description" v-model="formData.description" placeholder="Enter description" required></textarea>
                    </div>
                    <div class="form__submit">
                        <button class="submit__form"> POST </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CreateHouse',
    props: ['id'],
    data() {
        return {
            formData :{
                selectedFile: null,
                price: '',
                bedrooms: '',
                bathrooms: '',
                size: '',
                streetName: '',
                houseNumber: '',
                numberAddition: '',
                zip: '',
                city: '',
                constructionYear: '',
                hasGarage: '',
                description: '',
            },
        }
    },
    methods: {
        createHouse() {
            const headers = this.$store.state.headers;
            axios.post('https://intern-api.docker-dev.d-tt.nl/api/houses', this.formData, { headers })
            //axios.post('http://localhost:3000/houses')
                .then(response => response.data)
                .then(this.onUpload)
                .catch(function (error) {
                    console.log(error.response);
            });
        },

        uploadImage(event) {
            this.selectedFile = event.target.files[0]
        },

        onUpload(house) {
            const fd = new FormData();
            const headers = this.$store.state.headers;
            console.log(house);
            fd.append('image', this.selectedFile, this.selectedFile.name)
            axios.post('https://intern-api.docker-dev.d-tt.nl/api/houses/'+ house.id + '/upload', fd, { headers } )
                .then(response => {

                    //redirect logic

                    this.$router.push('/houses/' + house.id)
            })
            .catch(function (error) {
                console.log(error.response);
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding-top: 45px;

    .inner__wrapper{
        width: 100%;
        max-width: 450px;

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

        h1 {
            padding-bottom: 25px;
        }

        .row {
            display: flex;
            flex-direction: column;
            min-width: 100px;
            width: fit-content;
            width: 100%;
            max-width: 450px;
            padding-bottom: 10px;

            label {
                padding-bottom: 10px;
            }

            .text__field {
                border: none;
                border-radius: 10px;
                height: 50px;
                width: 100%;
                padding: 2px 27px 2px 40px;
                outline: 0;
                background-color: white;
            }

            .description {
                border: none;
                border-radius: 10px;
                height: 200px;
                width: 100%;
                padding: 2px 27px 2px 40px;
                outline: 0;
                background-color: white;
                resize: none;
            }            
        }

        .row2 {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: 10px;

            .text__field2 {
                border: none;
                border-radius: 10px;
                height: 50px;
                width: 175px;
                padding: 2px 27px 2px 40px;
                outline: 0;
                background-color: white;
            }

            label {
                padding-bottom: 10px;
            }

            .inner__row + .inner__row { 
                margin-left: 2rem;
            } 
        }

        .submit__form {
            position: relative;
            background-color: #e65540;
            border-radius: 10px;
            font-size: 22px;
            color: #FFFFFF;
            padding: 8px;
            width: 200px;
            text-align: center;
            transition-duration: 0.4s;
            text-decoration: none;
            cursor: pointer;
        }

        .form__submit {
            padding-top: 45px;
            display: flex;
            padding-bottom: 45px;
            
        }
    }
}

</style>