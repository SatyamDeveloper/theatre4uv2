const fetchMovieData = async () => {
  const bg = await fetch("/database/movie");
  const a = await bg.json();
  return a;
};

window.addEventListener('load',async()=>{


const videoData = await fetchMovieData()

const videoCon = document.getElementById("videoCon");

videoData.forEach((video) => {
  let link;
  if(video.src){
    link = video.slug
  }else{
    link = `${video.slug}/e1`
  }
  if (video.slug != currVidId) {
    const videoDiv = document.createElement("div");
    videoDiv.classList.add("video");
    videoDiv.innerHTML = `
    <a href="/movie/${link}">
    <div class="top">
    <img src=${video.image} />
          <p>${video.duration}</p>
      </div>
      <div class="bottom">
          <h3>${video.title}</h3>
          <p>${video.genre} • ${video.language} • ${video.year}</p>
          <p class="flex">
          ${video.views} views • ${video.rate}/10
          <svg viewBox="0 0 24 24">
              <path
              d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
              ></path>
          </svg>
          </p>
      </div>
      </a>
      <div class="btn flex" data-video=${video._id}>
          <p>ADD TO WATCHLIST</p>
          <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
          >
              <g>
              <path
                  d="M21,16h-7v-1h7V16z M21,11H9v1h12V11z M21,7H3v1h18V7z M10,15l-7-4v8L10,15z"
              ></path>
              </g>
          </svg>
      </div>
    `;
    videoCon.appendChild(videoDiv);
  }
});

const addtoWatchBtns = document.querySelectorAll("#videoCon > div > div");
let localData = JSON.parse(localStorage.getItem("videos")) || [];

addtoWatchBtns.forEach((addtoWatchBtn) => {
  const videoId = addtoWatchBtn.getAttribute("data-video");

  localData.forEach((data) => {
    if (videoId === data) {
      addtoWatchBtn.classList.add("remove");
      addtoWatchBtn.innerHTML = `<p>REMOVE FROM WATCHLIST</p><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z"></path></g></svg>`;
    }
  });

  addtoWatchBtn.addEventListener("click", () => {
    localData = JSON.parse(localStorage.getItem("videos")) || [];
    const videoId = addtoWatchBtn.getAttribute("data-video");

    if (addtoWatchBtn.classList.contains("remove")) {
      filtered = localData.filter(function (value, index, arr) {
        return value != videoId;
      });
      localStorage.setItem("videos", JSON.stringify(filtered));
      addtoWatchBtn.classList.remove("remove");
      addtoWatchBtn.innerHTML = `<p>ADD TO WATCHLIST</p><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M21,16h-7v-1h7V16z M21,11H9v1h12V11z M21,7H3v1h18V7z M10,15l-7-4v8L10,15z"></path></g></svg>`;
    } else {
      const videoArr = localData;
      videoArr.push(videoId);
      localStorage.setItem("videos", JSON.stringify(videoArr));
      addtoWatchBtn.classList.add("remove");
      addtoWatchBtn.innerHTML = `<p>REMOVE FROM WATCHLIST</p><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z"></path></g></svg>`;
    }
  });
});
})
