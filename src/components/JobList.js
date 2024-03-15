import {
  jobDetailsContentEl,
  jobListSearchEl,
  spinnerJobDetailsEl,
  BASE_URL_API,
  getData,
  state,
} from "../common.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";

const renderJobList = () => {
  jobListSearchEl.innerHTML = "";
  state.searchJobItems.slice(0, 7).forEach((jobItem) => {
    const newJobItemHTML = `<li class="job-item">
        <a class="job-item__link" href="${jobItem.id}">
            <div class="job-item__badge">${jobItem.badgeLetters}</div>
            <div class="job-item__middle">
                <h3 class="third-heading">${jobItem.title}</h3>
                <p class="job-item__company">${jobItem.company}</p>
                <div class="job-item__extras">
                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                </div>
            </div>
            <div class="job-item__right">
                <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                <time class="job-item__time">${jobItem.daysAgo}d.</time>
            </div>
        </a>
    </li>`;
    jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
  });
};

const clickHandler = async (e) => {
  e.preventDefault();
  const clickedEl = e.target;
  const jobItemEl = clickedEl.closest(".job-item");

  // document.querySelector(".job-item--active") &&
  //   document
  //     .querySelector(".job-item--active") // SECOND VERSION
  //     .classList.remove("job-item--active");

  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  jobItemEl.classList.add("job-item--active");
  jobDetailsContentEl.innerHTML = "";

  renderSpinner("joblist");

  const id = jobItemEl.children[0].getAttribute("href");

  try {
    const data = await getData(`${BASE_URL_API}/jobs/${id}`);
    spinnerJobDetailsEl.classList.remove("spinner--visible");
    const { jobItem } = data;
    renderJobDetails(jobItem);
  } catch (err) {
    spinnerJobDetailsEl.classList.remove("spinner--visible");
    renderError(err.message);
  }

  //   fetch(`${BASE_URL_API}/jobs/${id}`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(
  //           "Resource issue (e.g. resource doesn't exist) or server issue"
  //         );
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       spinnerJobDetailsEl.classList.remove("spinner--visible");
  //       const { jobItem } = data;
  //       renderJobDetails(jobItem);
  //     })
  //     .catch((err) => {
  //       spinnerJobDetailsEl.classList.remove("spinner--visible");
  //       renderError(err.message);
  //     });
};
jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;
