<template>
  <div>
    <header class="header">
      <nav>
        <ul class="menu">
          <li><a href="#" @click.prevent="currentPage = 'todos'">Todos</a></li>
          <li><a href="#" @click.prevent="currentPage = 'posts'">Posts</a></li>
        </ul>
      </nav>
    </header>
    <div v-show="currentPage === 'todos'">
      <Todos />
    </div>
    <div v-show="currentPage === 'posts'">
      <Posts>
        <template #default="{ post }">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </template>
      </Posts>
    </div>
  </div>
</template>

<script>
import Todos from './assets/Todos.vue';
import Posts from './assets/Posts.vue';

export default {
  components: {
    Todos,
    Posts,
  },
  data() {
    return {
      currentPage: 'todos',
    };
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
  background-color: white;
  padding: 5px 5px 5px 5px;
  border-radius: 5px;
  
}

.menu a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-size: 18px;
}

.menu a:hover {
  text-decoration: underline;
}
</style>