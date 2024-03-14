import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";

const renderSpinner = (whichSpinner) => {
  const spinnerEl =
    whichSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  spinnerEl.classList.add("spinner--visible");
};

export default renderSpinner;
