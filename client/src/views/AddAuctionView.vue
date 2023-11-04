<template>
  <v-form class="add-form" @submit.prevent="addAuction" ref="auctionForm">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <label for="Name">* Name :</label>
          <v-text-field
            :rules="[rules.required]"
            v-model="auctionData.name"
          ></v-text-field>
          <label for="">* Starting Price :</label>
          <v-text-field
            :rules="[rules.required]"
            type="number"
            v-model="auctionData.startingPrice"
          ></v-text-field>
          <!-- <label for="">Tags :</label>
          <v-text-field v-model="auctionData.tags"></v-text-field> -->
          <label for="">* Description :</label>
          <v-textarea
            :rules="[rules.required]"
            rows="12"
            v-model="auctionData.description"
            counter="words"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="img-preview-wrapper">
            <div class="img-preview d-flex justify-center align-center">
              <div v-if="!filePreview" class="img-preview-text">
                Failed to load file
              </div>
              <v-img
                v-if="fileType === 'image'"
                :width="259"
                aspect-ratio="4/3"
                cover
                :src="filePreview"
                alt="Failed to upload File"
              ></v-img>
              <video
                v-else
                :src="filePreview"
                aspect-ratio="4/3"
                width="259"
              ></video>
            </div>
          </div>
          <div for="">* File :</div>
          <v-text-field
            :rules="[rules.required]"
            type="file"
            class="mb-2"
            persistent-hint
            hint="Allowed file types: jpg, jgeg, png, gif, mp4 | image should be <= 2MB | video should be <= 30MB"
            @change="handleFileInput"
          />
          <v-row class="mt-2">
            <v-col cols="12" sm="8">
              <div for="">* Starting Date :</div>
              <v-text-field
                :rules="[rules.required]"
                type="date"
                :min="minDate"
                v-model="auctionData.startingDate"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <label for="">* Starting Time :</label>
              <v-text-field
                type="time"
                :rules="[rules.required]"
                name=""
                id=""
                v-model="auctionData.startingTime"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="8">
              <div for="">* Ending Date :</div>
              <v-text-field
                :rules="[rules.required]"
                :min="auctionData.startingDate"
                type="date"
                v-model="auctionData.endingDate"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <label for="">* Ending Time :</label>
              <v-text-field
                type="time"
                :rules="[rules.required]"
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
      filePreview: undefined,
      auctionData: {
        name: "testgq",
        startingPrice: 54,
        tags: "qw",
        description: "qweqweqw",
        startingDate: "",
        startingTime: "",
        endingDate: "",
        endingTime: "",
        file: null,
        fileError: true,
      },
      rules: {
        required: (value) => !!value || "Field is required",
        isValid: (value) => value > 0 || "Bid should be positive number",
      },
      fileType: "",
    };
  },
  computed: {
    minDate() {
      const today = new Date().toISOString().split("T")[0];
      return today;
    },
  },
  methods: {
    async addAuction() {
      const startTime = new Date(
        this.auctionData.startingDate + "T" + this.auctionData.startingTime
      );
      const endTime = new Date(
        this.auctionData.endingDate + "T" + this.auctionData.endingTime
      );

      const currentDate = new Date();

      if (startTime.getTime() < currentDate.getTime()) {
        this.$toast.error("Start time should be less than current time.");
        return;
      } else if (startTime.getTime() >= endTime.getTime()) {
        this.$toast.error("End time should be greater than start time.");
        return;
      }
      this.validateFile(this.auctionData.file);

      const formData = new FormData();
      formData.append("itemName", this.auctionData.name);
      formData.append("startingPrice", this.auctionData.startingPrice);
      formData.append("tags", this.auctionData.tags);
      formData.append("itemDescription", this.auctionData.description);
      formData.append("startingDate", this.auctionData.startingDate);
      formData.append("endingDate", this.auctionData.endingDate);
      formData.append("startingTime", this.auctionData.startingTime);
      formData.append("endingTime", this.auctionData.endingTime);
      formData.append("file", this.auctionData.file);

      this.$refs["auctionForm"].validate().then((result) => {
        console.log(result);
        if (result.valid && !this.fileError) {
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
        }
      });
    },
    handleFileInput(event) {
      this.fileType = event.target.files[0].type.split("/")[0];
      this.validateFile(event.target.files[0]);
      this.auctionData.file = event.target.files[0];
      if (this.auctionData.file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview = reader.result;
        };
        reader.readAsDataURL(this.auctionData.file);
      }
      console.log(this.filePreview);
    },
    validateFile(file) {
      const allowedFiles = ["png", "jpeg", "jpg", "gif", "mp4"];
      const allowedFileTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "video/mp4",
      ];
      // Allowed file size in mb
      const allowedImageSize = 2;
      const allowedVideoSize = 30;

      // Get the extension of the uploaded file
      const fileExtension = file.name.slice(
        ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
      );
      console.log(fileExtension);
      // Check if the uploaded file is allowed
      if (
        !allowedFiles.includes(fileExtension) ||
        !allowedFileTypes.includes(file.type)
      ) {
        this.$toast.error("Invalid file type.");
        this.fileError = false;
      }

      if (
        (fileExtension === "mp4" || file.type === "video/mp4") &&
        file.size / (1024 * 1024) > allowedVideoSize
      ) {
        this.$toast.error("Video should be less than 30 MB in size");
        this.fileError = false;
      } else if (
        (allowedFiles.slice(5).includes(fileExtension) ||
          allowedFileTypes.slice(5).includes(file.type)) &&
        file.size / (1024 * 1024) > allowedImageSize
      ) {
        this.$toast.error("Image should be less than 2 MB in size");
        this.fileError = false;
      }
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