import {
  jobDetailsContentEl,
  jobListSearchEl,
  spinnerJobDetailsEl,
  BASE_URL_API,
  getData,
  state,
  paginationBtnBackEl,
  RESULTS_PER_PAGE,
  jobListBookmarksEl,
} from "../common.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";

const renderJobList = (whichJobList = "search") => {
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;
  let jobItems;
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE
    );
  } else if (whichJobList === "bookmarks") {
    jobItems = state.bookmarkJobItems;
  }
  jobListEl.innerHTML = "";
  jobItems.forEach((jobItem) => {
    const newJobItemHTML = `<li class="job-item ${
      state.activeJobItem.id === jobItem.id ? "job-item--active" : ""
    }">
        <a class="job-item__link" href="${jobItem.id}">
            <div class="job-item__badge">${jobItem.badgeLetters}</div>
            <div class="job-item__middle">
                <h3 class="third-heading">${jobItem.title}</h3>
                <p class="job-item__company">${jobItem.company}</p>
                <div class="job-item__extras">
                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${
                      jobItem.duration
                    }</p>
                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${
                      jobItem.salary
                    }</p>
                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${
                      jobItem.location
                    }</p>
                </div>
            </div>
            <div class="job-item__right">
                <i class="fa-solid fa-bookmark job-item__bookmark-icon ${
                  state.bookmarkJobItems.some((item) => item.id === jobItem.id)
                    ? "job-item__bookmark-icon--bookmarked"
                    : ""
                }"></i>
                <time class="job-item__time">${jobItem.daysAgo}d.</time>
            </div>
        </a>
    </li>`;
    jobListEl.insertAdjacentHTML("beforeend", newJobItemHTML);
  });

  console.log("Job list rendered");
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
    .querySelectorAll(".job-item--active")
    .forEach((itemWithActiveClass) => {
      itemWithActiveClass.classList.remove("job-item--active");
    });

  jobItemEl.classList.add("job-item--active");
  jobDetailsContentEl.innerHTML = "";

  renderSpinner("joblist");
  const id = jobItemEl.children[0].getAttribute("href");
  const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +id);
  renderJobList();

  history.pushState(null, "", `/#${id}`);

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
jobListBookmarksEl.addEventListener("click", clickHandler);
export default renderJobList;
