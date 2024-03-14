import { errorTextEl, errorEl, DEFAULT_DISPLAY_TIME } from "../common.js";

const renderError = (msg = "Something went wrong..") => {
  errorTextEl.textContent = msg;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};

export default renderError;
