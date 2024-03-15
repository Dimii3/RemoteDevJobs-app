import {
  jobDetailsContentEl,
  getData,
  spinnerJobDetailsEl,
  BASE_URL_API,
  state,
} from "../common.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";
const loadHandler = async () => {
  const id = window.location.hash.substring(1);
  if (id) {
    renderSpinner("job-details");
    jobDetailsContentEl.innerHTML = "";
    document
      .querySelectorAll(".job-item--active")
      .forEach((itemWithActiveClass) => {
        itemWithActiveClass.classList.remove("job-item--active");
      });
    try {
      const data = await getData(`${BASE_URL_API}/jobs/${id}`);
      spinnerJobDetailsEl.classList.remove("spinner--visible");
      const { jobItem } = data;
      state.activeJobItem = jobItem;
      renderJobList();
      renderJobDetails(jobItem);
    } catch (err) {
      spinnerJobDetailsEl.classList.remove("spinner--visible");
      renderError(err.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);
