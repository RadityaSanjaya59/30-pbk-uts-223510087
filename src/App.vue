<template>
  <div>
    <header class="header">
      <nav>
        <ul class="menu">
          <li><a href="#" @click.prevent="currentPage = 'todos'" class="nav-button">Todos</a></li>
          <li><a href="#" @click.prevent="currentPage = 'posts'" class="nav-button">Post</a></li>
        </ul>
      </nav>
    </header>
    <div v-show="currentPage === 'todos'" class="container">
      <h1 class="title">Daftar Kegiatan</h1>
      <div class="input-container">
        <input v-model="newActivity" @keyup.enter="addActivity" placeholder="Nama Kegiatan" />
        <button @click="addActivity">Tambah Kegiatan</button>
      </div>
      <ul class="activities-list">
        <li v-for="(activity, index) in filteredActivities" :key="index" class="activity-item">
          <span v-if="activity.completed">✅</span>
          <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
          <div class="buttons">
            <button @click="toggleActivity(index)" class="action-button">
              {{ activity.completed ? 'Uncheck' : 'Checklist' }}
            </button>
            <button @click="removeActivity(index)" class="action-button">Hapus</button>
          </div>
        </li>
      </ul>
      <button @click="filterCompleted" class="filter-button">
        {{ showOnlyIncomplete ? 'Tampilkan Semua Kegiatan' : 'Tampilkan Kegiatan Yang Belum Selesai' }}
      </button>
    </div>
    <div v-show="currentPage === 'posts'" class="container">
      <h1 class="title">Post</h1>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="!error">
        <label for="userFilter">memilih User:</label>
        <select id="userFilter" v-model="selectedUser" @change="fetchPostsByUser">
          <option value="">Pilih User</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="selectedUser">
          <h2>Posts by {{ getUserById(selectedUser).name }}</h2>
          <ul class="posts-list">
            <li v-for="post in filteredPosts" :key="post.id">
              <h3>{{ post.title }}</h3>
              <p>{{ post.body }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 'todos',
      newActivity: '',
      activities: [],
      showOnlyIncomplete: false,
      users: [],
      posts: [],
      selectedUser: '',
      error: null,
    };
  },
  computed: {
    filteredActivities() {
      if (this.showOnlyIncomplete) {
        return this.activities.filter((activity) => !activity.completed);
      }
      return this.activities;
    },
    filteredPosts() {
      if (!this.selectedUser) return [];
      return this.posts.filter(post => post.userId === parseInt(this.selectedUser));
    },
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() !== '') {
        this.activities.push({ name: this.newActivity, completed: false });
        this.newActivity = '';
      }
    },
    toggleActivity(index) {
      this.activities[index].completed = !this.activities[index].completed;
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    filterCompleted() {
      this.showOnlyIncomplete = !this.showOnlyIncomplete;
    },
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
      try {
        if (this.selectedUser) {
          const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
          if (!postsResponse.ok) {
            throw new Error('Failed to fetch posts');
          }
          this.posts = await postsResponse.json();
        } else {
          this.posts = [];
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    getUserById(id) {
      return this.users.find(user => user.id === parseInt(id)) || {};
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #5F6F52;
  padding: 10px 0;
}

.menu {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.menu li {
  margin: 0 15px;
}

.nav-button {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  border: 2px solid white;
  background-color: white;
  border-radius: 5px;
}

.nav-button:hover {
  background-color: #ddd;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-image: url('https://img.freepik.com/free-vector/wrinkled-paper-texture_1100-12.jpg?t=st=1714240462~exp=1714244062~hmac=151af54a2977d4cc1f47ca8217b5e448cc256dd00aaa69fb6d7b09f7ba78c524&w=740');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 800px;
}
.container h1 {
  color: black; 
}
.container label {
  color: black; 
}
.container option {
  color: black;
  background-color: white;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  margin-bottom: 20px;
}

.input-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 5px;
  color: grey;
}

.input-container button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #5F6F52;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}

.activities-list, .users-list, .posts-list {
  list-style: none;
  padding: 0;
  color: black;
}
.posts-list h3{
  color: black;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: white;
  margin-bottom: 5px;
  color: black;
}

.activity-item span {
  flex: 1;
  font-size: 16px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.action-button {
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #A9B388;
  color: black;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.filter-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #5F6F52;
  color: white;
  cursor: pointer;
  margin-top: 20px;
}

.error {
  color: red;
}

.posts-list li {
  margin-bottom: 20px;
}
</style>
