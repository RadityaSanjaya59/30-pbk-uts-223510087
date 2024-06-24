import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../assets/Todos.vue';
import Posts from '../assets/Posts.vue';
import Albums from '../assets/Albums.vue';
import AlbumPhotos from '../assets/AlbumPhotos.vue';

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/photos/:id', component: AlbumPhotos}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
