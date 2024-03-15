import {
  jobDetailsContentEl,
  getData,
  spinnerJobDetailsEl,
  BASE_URL_API,
} from "../common.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";
import renderError from "./Error.js";

const loadHandler = async () => {
  const id = window.location.hash.substring(1);
  if (id) {
    renderSpinner("job-details");
    jobDetailsContentEl.innerHTML = "";
    try {
      const data = await getData(`${BASE_URL_API}/jobs/${id}`);
      spinnerJobDetailsEl.classList.remove("spinner--visible");
      const { jobItem } = data;
      renderJobDetails(jobItem);
    } catch (err) {
      spinnerJobDetailsEl.classList.remove("spinner--visible");
      renderError(err.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);
