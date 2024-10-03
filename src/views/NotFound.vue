<template>
  <div class="not-found">
    <div class="not-found-background"></div>
    <div class="not-found-content">
      <h1 class="not-found-title">{{ t('notFound.title') }}</h1>
      <p class="not-found-message">
        {{ t('notFound.message') }}
      </p>
      <router-link to="/" class="not-found-link">{{
        t('notFound.linkText')
      }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
