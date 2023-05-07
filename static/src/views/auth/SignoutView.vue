<script lang="ts" setup>
import router from "@/router";
import { authStore } from "@/stores/auth";
const as = authStore();
as.logout();
router.push({ name: "home" });
</script>
