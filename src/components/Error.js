import { errorTextEl, errorEl } from "../common.js";

const renderError = (msg = "Something went wrong..") => {
  errorTextEl.textContent = msg;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, 3000);
};

export default renderError;
