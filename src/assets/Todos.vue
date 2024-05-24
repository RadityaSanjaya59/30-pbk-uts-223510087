<template>
  <div class="container">
    <h1 class="title">Daftar Kegiatan</h1>
    <div class="input-container">
      <input
        v-model="newActivity"
        @keyup.enter="addActivity"
        placeholder="Nama Kegiatan"
      />
      <button @click="addActivity">Tambah Kegiatan</button>
    </div>
    <ul class="activities-list">
      <li
        v-for="(activity, index) in filteredActivities"
        :key="index"
        class="activity-item"
      >
        <span v-if="activity.completed">✅</span>
        <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
        <div class="buttons">
          <button @click="toggleActivity(index)" class="action-button">
            {{ activity.completed ? 'Uncheck' : 'Checklist' }}
          </button>
          <button @click="removeActivity(index)" class="action-button">
            Hapus
          </button>
        </div>
      </li>
    </ul>
    <button @click="filterCompleted" class="filter-button">
      {{ showOnlyIncomplete ? 'Tampilkan Semua Kegiatan' : 'Tampilkan Kegiatan Yang Belum Selesai' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newActivity: '',
      activities: [],
      showOnlyIncomplete: false,
    };
  },
  computed: {
    filteredActivities() {
      return this.showOnlyIncomplete
        ? this.activities.filter((activity) => !activity.completed)
        : this.activities;
    },
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim()) {
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
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  font-family: Arial, sans-serif;
  background-image: url('https://img.freepik.com/free-vector/wrinkled-paper-texture_1100-12.jpg?t=st=1714240462~exp=1714244062~hmac=151af54a2977d4cc1f47ca8217b5e448cc256dd00aaa69fb6d7b09f7ba78c524&w=740');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 800px;
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
  border-radius: 5px;
}

.input-container button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #5F6F52;
  color: white;
  cursor: pointer;
}

.activities-list {
  list-style: none;
  padding: 0;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
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
</style>
