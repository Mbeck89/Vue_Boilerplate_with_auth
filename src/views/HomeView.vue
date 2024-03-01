<script setup>
import { marked } from 'marked'
import { ref, computed } from 'vue';

// Fetch and read the .md file
fetch('../../README.md')
  .then(response => response.text())
  .then(data => {
    markdownContent.value = data;
  });

// Reactive state
let markdownContent = ref('');

// Computed property
let parsedMarkdown = computed(() => marked(markdownContent.value));
</script>

<template>
  <main class="p-3">
    <div v-html="parsedMarkdown"></div>
  </main>
</template>
