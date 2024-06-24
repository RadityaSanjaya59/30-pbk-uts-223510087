<template>
  <div class="container">
    <h1 class="title">Posts</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!error">
      <label for="userFilter">Memilih User:</label>
      <select
        id="userFilter"
        v-model="selectedUser"
        @change="fetchPostsByUser"
        v-if="users.length"
      >
        <option value="">Pilih User</option>
        <option
          v-for="user in users"
          :key="user.id"
          :value="user.id"
        >{{ user.name }}</option>
      </select>
      <div v-if="selectedUser" class="posts-container">
        <h2>Posts by {{ getUserById(selectedUser).name }}</h2>
        <ul class="posts-list">
          <li v-for="post in filteredPosts" :key="post.id" class="post-item">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      posts: [],
      selectedUser: '',
      error: null,
    };
  },
  computed: {
    filteredPosts() {
      return this.selectedUser
        ? this.posts.filter((post) => post.userId === parseInt(this.selectedUser))
        : [];
    },
  },
  methods: {
    async fetchData() {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        this.users = await usersResponse.json();
      } catch (error) {
        this.error = error.message;
      }
    },
    async fetchPostsByUser() {
      if (!this.selectedUser) {
        this.posts = [];
        return;
      }
      try {
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch posts');
        }
        this.posts = await postsResponse.json();
      } catch (error) {
        this.error = error.message;
      }
    },
    getUserById(id) {
      return this.users.find((user) => user.id === parseInt(id)) || {};
    },
  },
  created() {
    this.fetchData();
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
  width: 100vw;
  font-family: Arial, sans-serif;
  background-image: url('https://img.freepik.com/free-vector/wrinkled-paper-texture_1100-12.jpg?t=st=1714240462~exp=1714244062~hmac=151af54a2977d4cc1f47ca8217b5e448cc256dd00aaa69fb6d7b09f7ba78c524&w=740');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.error {
  color: red;
}

label {
  margin-bottom: 10px;
  font-size: 18px;
}

select {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}

.posts-container {
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.posts-list {
  list-style: none;
  padding: 0;
}

.post-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.post-item h3 {
  margin-bottom: 5px;
  font-size: 20px;
  color: #333;
}

.post-item p {
  font-size: 16px;
  color: #555;
}
</style>
