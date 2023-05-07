<script lang="ts" setup>
function enter(e: HTMLElement) {
  e.style.height = "auto";
  e.style.visibility = "hidden";
  const height = getComputedStyle(e).height;
  e.style.visibility = "visible";
  e.style.height = "0";
  getComputedStyle(e).height;
  e.style.height = height;
}

function leave(e: HTMLElement) {
  const height = getComputedStyle(e).height;
  e.style.height = height;
  getComputedStyle(e).height;
  e.style.height = "0";
}

function afterEnter(e: HTMLElement) {
  e.style.height = "auto";
}
</script>

<template>
  <Transition
    name="slide"
    @enter="enter"
    @leave="leave"
    @after-enter="afterEnter"
  >
    <slot />
  </Transition>
</template>
