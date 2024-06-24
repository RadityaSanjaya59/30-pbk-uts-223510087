<template>
  <div>
    <header class="header">
      <nav>
        <ul class="menu">
          <li><router-link to="/todos">Todos</router-link></li>
          <li><router-link to="/posts">Posts</router-link></li>
          <li><router-link to="/albums">Albums</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
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
