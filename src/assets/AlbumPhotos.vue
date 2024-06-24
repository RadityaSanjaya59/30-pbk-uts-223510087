<template>
  <button @click="goBack" class="back-button">Back</button>
  <div class="photo-detail">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!error && photo">
      <img :src="photo.url" :alt="photo.title" class="photo" />
      <p>{{ photo.title }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const photo = ref(null);
    const error = ref(null);

    const goBack = () => {
      router.push('/albums');
    };

    onMounted(async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${route.params.id}`);
        if (!response.ok) throw new Error('Failed to fetch photo');
        photo.value = await response.json();
      } catch (err) {
        error.value = err.message;
      }
    });

    return { photo, error, goBack };
  },
};
</script>

<style scoped>
.photo-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
}

.error {
  color: red;
  font-size: 18px;
  margin-bottom: 20px;
}

.back-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.back-button:hover {
  background-color: #555;
}

.photo {
  width: 600px;
  height: 600px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #333;
  margin: 0;
}
</style>
