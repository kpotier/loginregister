<script lang="ts" setup>
import { visible } from "@/stores/progressBar";

import { ref, watch, type Ref } from "vue";

const progressBar: Ref<HTMLElement | null> = ref(null);
let animate: Animation;
let timeOut: number;
let oldQueueCount = 0;

watch(visible, (queue) => {
  const p = progressBar.value;
  if (!p) return;
  const count = queue.count;
  // Add or reset the progress bar.
  if (count > 0 && count > oldQueueCount) {
    // The progress bar is only shown if the page is not loaded in less than
    // 60ms.
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      if (animate) animate.cancel();
      animate = p.animate(
        {
          width: ["0%", "10%", "80%", "90%"],
          offset: [0, 0.01, 0.4, 1],
          easing: "ease-out",
        },
        {
          fill: "forwards",
          duration: 15000,
        }
      );
      p.classList.add("is-visible");
    }, 60);
  } else if (count == 0) {
    clearTimeout(timeOut);
    // Start a new animation based on the current width of the progress bar.
    if (animate) animate.pause();
    const w = getComputedStyle(p).width;
    const wNbr = p.offsetWidth;
    if (animate) animate.cancel();
    // If the page has loaded before showing the progress bar (tolerance of
    // 10px), we immediately hide the bar.
    if (wNbr < 10) {
      p.classList.remove("is-visible");
    } else {
      animate = p.animate(
        { width: [w, "100%"] },
        {
          fill: "forwards",
          duration: 300,
          easing: "ease-in",
        }
      );
      animate.onfinish = () => {
        p.classList.remove("is-visible");
      };
    }
  }
  oldQueueCount = queue.count;
});
</script>

<template>
  <div id="progress-bar" ref="progressBar"></div>
</template>

<style lang="scss">
@import "@/assets/base/theme";
@import "@/assets/base/functions";

#progress-bar {
  background-color: get-color("primary", 1);
  border-bottom-right-radius: 1.5px;
  box-shadow: 0 0 10px get-color("primary", 2);
  height: 3px;
  opacity: 0;
  position: fixed;
  top: 0;
  transition-duration: $transition;
  transition-property: opacity, visibility;
  visibility: hidden;
  z-index: 2;

  &.is-visible {
    opacity: 1;
    visibility: visible;
    width: 0%;
  }
}
</style>
