<script setup>
import { computed, ref, onMounted } from 'vue'
import EventService from '@/services/EventService.js'
const props = defineProps(['id'])

const event = ref('')

const id = computed(() => props.id)

onMounted(() => {
  EventService.getEvent(id.value)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'Details' }"> Details </router-link>
      <router-link :to="{ name: 'Register' }"> Register </router-link>
      <router-link :to="{ name: 'Edit' }"> Edit </router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>
