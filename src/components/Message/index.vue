<template>
  <div>
    <NMessageProvider>
      <ContentCpt></ContentCpt>
    </NMessageProvider>
  </div>
</template>

<script lang="ts" setup>
import { NMessageProvider } from 'naive-ui';

import ContentCpt from './content/index.vue';
</script>

<style lang="scss" scoped></style>
