import { shallowRef, type ShallowRef } from "vue";
import type { RouteLocationNormalized } from "vue-router";

export const visible: ShallowRef<{
  to: RouteLocationNormalized;
  count: number;
}> = shallowRef({ to: {} as RouteLocationNormalized, count: 0 });
