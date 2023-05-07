import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowsRotate,
  faBars,
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faEye,
  faEyeSlash,
  faGear,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { App } from "vue";

library.add(
  faArrowsRotate,
  faGear,
  faArrowRightFromBracket,
  faBars,
  faXmark,
  faSun,
  faMoon,
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faEye,
  faEyeSlash
);

export default function setupFontAwesome(app: App) {
  app.component("font-awesome-icon", FontAwesomeIcon);
}
