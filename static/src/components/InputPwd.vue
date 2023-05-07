<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { ref } from "vue";

defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);

const reveal = ref(false);
function toggle(e: Event) {
  e.preventDefault();
  reveal.value = !reveal.value;
}
</script>

<template>
  <div class="control has-icon-right">
    <input
      :type="reveal ? 'text' : 'password'"
      class="input"
      spellcheck="false"
      autocorrect="off"
      autocapitalize="off"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      v-bind="$attrs"
    />
    <button
      type="button"
      class="icon"
      @click="toggle"
      :title="reveal ? $t('inputPwd.hide') : $t('inputPwd.reveal')"
    >
      <font-awesome-icon
        :icon="['fa-solid', reveal ? 'fa-eye-slash' : 'fa-eye']"
      />
    </button>
  </div>
</template>
