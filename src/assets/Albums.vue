<template>
  <div class="container">
    <h1 class="title">Albums</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!error">
      <ul class="albums-list">
        <li v-for="album in albums" :key="album.id" class="album-item">
          <router-link :to="`/photos/${album.id}`">
            <img :src="album.thumbnailUrl" :alt="album.title" />
            <p>{{ album.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const albums = ref([]);
    const error = ref(null);

    onMounted(async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!response.ok) throw new Error('Failed to fetch albums');
        albums.value = await response.json();
      } catch (err) {
        error.value = err.message;
      }
    });

    return { albums, error };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
}

.title {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.error {
  color: red;
  font-size: 18px;
  margin-bottom: 20px;
}

.albums-list {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.album-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  padding: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
}

.album-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.album-item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.album-item p {
  font-size: 16px;
  color: #333;
  margin: 0;
}
</style>
