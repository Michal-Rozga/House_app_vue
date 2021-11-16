<template>
  <div class="wrapper">
    <div class="container">
      <h2>About DTT Real Estate</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque earum doloribus, voluptas odio harum ipsum. Omnis, eos quibusdam delectus ullam natus perspiciatis, suscipit exercitationem aspernatur repellendus reprehenderit molestias fugit quasi. Consequuntur earum reprehenderit maiores non explicabo aliquam molestias commodi ad, obcaecati odit quibusdam voluptate odio autem voluptatibus nam! Eos quo odit consequuntur assumenda nobis quas vero reprehenderit accusantium voluptas explicabo.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum animi illo dolorem facere nesciunt, consequuntur asperiores odio aperiam perferendis suscipit?</p>

        <div class="logo__wrapper">
          <h2>Design and Development</h2>

            <div class="logo__inner">
              <img src="../assets/Icons/img_DTT_logo_black.svg" alt="DTT apps web games" />
              <div class="logo__details">
                <div>By DTT</div>
                  <a href="http://www.d-tt.nl">www.d-tt.nl</a>
                </div>
              </div>
          </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.wrapper{
  max-width: 1335px;
  margin-right: auto;
  margin-left: auto;
  
  .container {
    margin-top: 75px;
    height: 100%;

    h2 {
      font-size: 32px;
      padding-bottom: 30px;
    }

    p {
      font-size: 20px;
      color: rgb(109, 109, 109);
      padding-bottom: 40px;
    }

    .logo__wrapper {
      margin-top: 20px;

      .logo__inner {
        display: flex;

        img {
          width: 255px;
          padding-right: 40px ;
        }

        .logo__details {
          font-size: 25px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: rgb(109, 109, 109);
        }
      }
    }
  }
 }

</style>