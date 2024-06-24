import { defineStore } from 'pinia';

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    activities: [],
    showOnlyIncomplete: false,
  }),
  getters: {
    filteredActivities: (state) => {
      return state.showOnlyIncomplete
        ? state.activities.filter(activity => !activity.completed)
        : state.activities;
    },
  },
  actions: {
    addActivity(activityName) {
      if (activityName.trim()) {
        this.activities.push({ name: activityName, completed: false });
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
});
