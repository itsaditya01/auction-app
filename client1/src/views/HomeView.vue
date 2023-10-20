<template>
  <div class="home">
        <div class="home-title">
          <div
        :class="{'title': true, 'fadeLeft': fadeAnimation === 'left', 'fadeRight': fadeAnimation === 'right'}"
      >
        <h1>Ipl</h1>
      </div>
       <div
        :class="{'title': true, 'fadeLeft': fadeAnimation === 'left', 'fadeRight': fadeAnimation === 'right'}"

      >
        <h1>Auction</h1>
      </div>
          
        </div>
         <input type="datetime" id="dateTime" v-model="dateTime" :change="dek()" required>
      </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      dateTime: null
    }
  },
  methods: {
    dek(){
      console.log(this.dateTime);
    }
  }
}
</script>

<style lang="scss">
.home {
  @include glassmorphism;
  min-height: 100vh;

  &-title {
    padding: 0 2rem;
  }
  .title {
  display: inline-block;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.5rem;
  padding: 0 2rem;
  letter-spacing: 0.3rem;
  margin: auto;
}

.fadeLeft {
  animation: dashFromLeft 2s ease-in-out 0s;
}

.fadeRight {
  animation: dashFromRight 2s ease-in-out 0s;
}

}


</style>