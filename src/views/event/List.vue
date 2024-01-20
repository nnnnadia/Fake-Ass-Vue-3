<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import router from '../../router'

const props = defineProps(['page'])

const events = ref('')
const totalEvents = ref(0)

const page = computed(() => props.page)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})
const pagesInBetween = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  const arrayInBetween = []
  for (let i = 2; i < totalPages; i++) {
    if (page.value != i) arrayInBetween.push(i)
  }
  return arrayInBetween
})

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch(() => {
        router.push({ name: 'NetworkError' })
      })
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        &lt; Previous
      </router-link>
      <router-link
        class="between-page"
        :to="{ name: 'EventList', query: { page: pageInBetween } }"
        rel="pageInBetween"
        v-for="pageInBetween in pagesInBetween"
        :key="pageInBetween"
      >
        {{ pageInBetween }}
      </router-link>
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next &gt;
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
