<script setup>
import { computed, ref, onMounted } from 'vue'
import EventService from '@/services/EventService.js'
import router from '../../router'
const props = defineProps(['id'])

const event = ref('')

const id = computed(() => props.id)

onMounted(() => {
  EventService.getEvent(id.value)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      if (error.response && error.response.status == 404) {
        router.push({
          name: '404Resource',
          params: { resource: 'event' },
        })
      } else {
        router.push({ name: 'NetworkError' })
      }
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }"> Details </router-link>
      <router-link :to="{ name: 'EventRegister' }"> Register </router-link>
      <router-link :to="{ name: 'EventEdit' }"> Edit </router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>
