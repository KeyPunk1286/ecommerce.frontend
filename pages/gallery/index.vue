<template>
  <div class="gallery">
    <div class="options-panel">
      <input type="file" ref="imageInput" @change="handleFileChange" />
      <button class="upload-button" @click="uploadImage">Upload</button>
    </div>
    <div class="images-wrapper">
      <div class="image-wrapper" v-for="image in imagesData" :key="image.id">
        <img :src="image.url" :alt="image.title" />
        <button class="image-option-remove" @click="removeImage(image.id)">X</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const imagesData = reactive([
  // {
  //   id: 1,
  //   url: "https://via.assets.so/img.jpg?w=250&h=250&tc=white&bg=#cecece",
  //   title: "Title 1",
  // },
  // {
  //   id: 2,
  //   url: "https://via.assets.so/img.jpg?w=250&h=250&tc=white&bg=#cecece",
  //   title: "Title 2",
  // },
]);

const selectedFile = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

const uploadImage = async () => {
  if (!selectedFile.value) {
    alert("Будь ласка, оберіть зображення");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile.value);

  try {
    const response = await axios.post("http://localhost:8888/gallery/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data && response.data.filePath) {
      imagesData.push({
        id: Date.now(), // Тимчасовий ID
        url: response.data.filePath,
        title: selectedFile.value.name,
      });
      selectedFile.value = null; // Очистити обраний файл
      alert("Зображення успішно завантажено");
    }
  } catch (error) {
    console.error("Помилка при завантаженні зображення:", error);
    alert("Помилка при завантаженні зображення");
  }
};

const removeImage = (id) => {
  const index = imagesData.findIndex((image) => image.id === id);
  if (index !== -1) {
    imagesData.splice(index, 1);
  }
};
</script>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  min-height: calc(100vh - 200px);

  .options-panel {
    background-color: #132a2a;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    input[type="file"] {
      margin-right: 10px;
    }

    .upload-button {
      height: 40px;
      border: none;
      padding: 0 20px;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  .images-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
  }

  .image-wrapper {
    position: relative;
    max-width: 250px;
    max-height: 250px;

    img {
      width: 100%;
      height: auto;
    }
  }

  .image-option-remove {
    top: 0;
    right: 0;
    padding: 5px;
    position: absolute;
    background-color: red;
    border: none;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    cursor: pointer;
  }
}
</style>