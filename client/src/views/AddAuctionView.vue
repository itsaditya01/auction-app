<template>
  <v-form class="add-form" @submit.prevent="addAuction">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <label for="Name">* Name :</label>
          <v-text-field v-model="auctionData.name"></v-text-field>
          <label for="">* Starting Price :</label>
          <v-text-field
            type="number"
            v-model="auctionData.startingPrice"
          ></v-text-field>
          <!-- <label for="">Tags :</label>
          <v-text-field v-model="auctionData.tags"></v-text-field> -->
          <label for="">* Description :</label>
          <v-textarea
            rows="11"
            v-model="auctionData.description"
            counter
            :rules="rules"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="img-preview-wrapper">
            <div class="img-preview d-flex justify-center align-center">
              <div v-if="!image" class="img-preview-text">
                Failed to load image
              </div>
              <v-img
                :width="259"
                aspect-ratio="4/3"
                cover
                :src="image"
                alt="Failed to upload image"
              ></v-img>
            </div>
          </div>
          <div for="">* Image :</div>
          <input
            type="file"
            label="File input"
            class="mb-2"
            @change="handleFileInput"
          />
          <v-row>
            <v-col cols="12" sm="8">
              <div for="">* Starting Date :</div>
              <input type="date" v-model="auctionData.startingDate" />
            </v-col>
            <v-col cols="12" sm="4">
              <label for="">* Starting Time :</label>
              <input
                type="time"
                name=""
                id=""
                v-model="auctionData.startingTime"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="8">
              <div for="">* Ending Date :</div>
              <input type="date" v-model="auctionData.endingDate" />
            </v-col>
            <v-col cols="12" sm="4">
              <label for="">* Ending Time :</label>
              <input
                type="time"
                name=""
                id=""
                v-model="auctionData.endingTime"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mb-4">
        <v-col cols="12">
          <v-btn
            type="submit"
            block
            rounded="xs"
            size="x-large"
            variant="tonal"
            color="light-blue-lighten-4"
            >Add Auction</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import auctionApi from "@/services/auctionApi";

export default {
  data() {
    return {
      image: undefined,
      auctionData: {
        name: "",
        startingPrice: null,
        tags: "",
        description: "",
        startingDate: "",
        startingTime: "",
        endingDate: "",
        endingTime: "",
        profilePhoto: null,
      },
    };
  },
  methods: {
    async addAuction() {
      const formData = new FormData();
      formData.append("itemName", this.auctionData.name);
      formData.append("startingPrice", this.auctionData.startingPrice);
      formData.append("tags", this.auctionData.tags);
      formData.append("itemDescription", this.auctionData.description);
      formData.append("startingDate", this.auctionData.startingDate);
      formData.append("endingDate", this.auctionData.endingDate);
      formData.append("startingTime", this.auctionData.startingTime);
      formData.append("endingTime", this.auctionData.endingTime);
      formData.append("profilePhoto", this.auctionData.profilePhoto);

      auctionApi
        .addAuction(formData)
        .then((result) => {
          if (result.data.success) {
            this.$toast.success(result.data.msg);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.msg);
        });
    },
    handleFileInput(event) {
      this.auctionData.profilePhoto = event.target.files[0];
      console.log(this.auctionData.profilePhoto);
      if (this.auctionData.profilePhoto) {
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result;
        };
        reader.readAsDataURL(this.auctionData.profilePhoto);
      }
      console.log(this.image);
    },
  },
};
</script>

<style scope>
.img-preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.img-preview-text {
  position: absolute;
}
.img-preview {
  height: 256px;
  width: 256px;
  background: rgba(133, 132, 132, 0.26);
  position: relative;
}

.add-form {
  color: rgba(255, 255, 255, 0.808);
}

input {
  backdrop-filter: blur(5px);
  background: rgba(180, 180, 180, 0.322);
}

input[type="date"],
input[type="time"] {
  border-bottom: 1px solid #7d8590;
  color: white;
  background: #495363;
  padding: 15px 16px;
  height: 54px;
  width: 250px;
}
input[type="file"] {
  border-bottom: 1px solid #7d8590;
  color: white;
  background: #495363;
  padding: 15px 16px;
  height: 54px;
}
</style>