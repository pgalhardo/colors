<template>
  <div class="not-found">
    <div class="not-found-background"></div>
    <div class="not-found-content">
      <h1 class="not-found-title">{{ $t('notFound.title') }}</h1>
      <p class="not-found-message">
        {{ $t('notFound.message') }}
      </p>
      <router-link
        to="/"
        class="not-found-link"
        >{{ $t('notFound.linkText') }}</router-link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  position: relative;
  text-align: center;
  background-color: rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-on-background));
}

.not-found-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    opacity: 0.15;
  }

  &::before {
    width: 300px;
    height: 300px;
    background: rgba(0, 0, 0, 0.2);
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    width: 400px;
    height: 400px;
    background: rgba(0, 0, 0, 0.2);
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
  }
}

.not-found-content {
  position: relative;
  z-index: 2;
  background-color: rgb(var(--v-theme-surface));
  border-radius: 0.75rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;

  @media (prefers-color-scheme: dark) {
    background-color: rgb(var(--v-theme-surface));
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  }
}

.not-found-title {
  font-size: 5rem;
  margin-bottom: 1rem;
  font-family: 'Space Mono', monospace;
  color: rgb(var(--v-theme-primary));
}

.not-found-message {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: rgb(var(--v-theme-on-surface));
}

.not-found-link {
  font-size: 1rem;
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  transition: color 0.3s;

  &:hover {
    color: rgb(var(--v-theme-secondary));
  }
}
</style>
