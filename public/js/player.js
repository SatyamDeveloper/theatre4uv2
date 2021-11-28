const fetchCurrMovieData = async () => {
  const bg = await fetch("/database/movie");
  const a = await bg.json();
  const b = await a.filter(function (value, index, arr) {
    return value.slug === currVidId;
  });
  return b;
};
let currVidData;

window.addEventListener("load", async () => {
  const abdf = await fetchCurrMovieData();

  currVidData = await abdf[0];

  const movieData = document.getElementById("movieData");
  movieData.style.backgroundImage = ` 
  linear-gradient(
        to left,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      url(${currVidData.image})
  `;
  movieData.innerHTML = `
  <div class="left">
    <h1>${currVidData.title}</h1>
    <p>
      <span>${currVidData.genre[0]}</span> | <span>${currVidData.language}</span> | <span>${currVidData.year}</span>
    </p>
    <div class="action flex">
      <button id="playBtn">Play Movie</button>
      <button data-video="${currVidData._id}" id="watchBtn">
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
        <p>Add to Watchlist</p>
      </button>
    </div>
    <p>Language: <span>${currVidData.language}</span></p>
    <p id="genre"></p>
    <p>Year: <span>${currVidData.year}</span></p>
    <p id="director"></p>
    <p id="actor"></p>
    <p class="desc">
      ${currVidData.description}
    </p>
  </div>
  <div class="right" id="movieTrailer">
    <iframe src=${currVidData.trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  `;
  const genres = document.getElementById("genre");
  const directors = document.getElementById("director");
  const actors = document.getElementById("actor");
  let allGenre = "Genre:",
    allDirector = "Director:",
    allActor = "Actor:";

  currVidData.genre.forEach((data) => {
    const currGenre = `<a href="/${data}">${data}</a>`;
    if (data === currVidData.genre[currVidData.genre.length - 1]) {
      allGenre = `${allGenre} ${currGenre}`;
    } else {
      allGenre = `${allGenre} ${currGenre},`;
    }
  });

  currVidData.director.forEach((data) => {
    if (data === currVidData.director[currVidData.director.length - 1]) {
      allDirector = `${allDirector} ${data}`;
    } else {
      allDirector = `${allDirector} ${data},`;
    }
  });

  currVidData.actor.forEach((data) => {
    if (data === currVidData.actor[currVidData.actor.length - 1]) {
      allActor = `${allActor} ${data}`;
    } else {
      allActor = `${allActor} ${data},`;
    }
  });

  genres.innerHTML = allGenre;
  directors.innerHTML = allDirector;
  actors.innerHTML = allActor;

  const playBtn = document.getElementById("playBtn");
  const playerList = document.getElementById("playerList");
  const movieTrailer = document.getElementById('movieTrailer')
  let n = 1;

  playBtn.addEventListener("click", () => {
    movieData.classList.add("start");
    vidPlayer.style.display = "flex";
    movieTrailer.style.display = 'none'

    if (!currVidData.src) {
      playerList.classList.add("act");
      playerList.querySelector(".con #playListTitle").innerText =
        currVidData.title;

      currVidData.playlist.forEach((data) => {
        const an = document.createElement("a");
        an.setAttribute("href", `/${currVidData.slug}/${data.slug}`);
        an.innerHTML = `
        <div class="btn" data-slug="/${currVidData.slug}/${data.slug}">
          ${n}
        </div>
        <div class="name_data">
          <h3>Episode ${n}</h3>
          <p>
            ${data.views} views • ${currVidData.rate}/10
            <svg viewBox="0 0 24 24">
              <path
                d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
              ></path>
            </svg>
          </p>
        </div>
        <p class="dur">${data.duration}</p>
        `;
        playerList.querySelector(".con #playListCon").appendChild(an);
        n++;
      });

      const statusBtn = playerList.querySelectorAll(".con #playListCon .btn");
      const currentUrl = new window.URL(document.URL).pathname;
      let x = 0;
      statusBtn.forEach((data) => {
        const vidUrl = `/movie${data.getAttribute("data-slug")}`;
        if (vidUrl === currentUrl) {
          document.getElementById("myFrame").setAttribute("src", currVidData.playlist[x].src);
          data.parentElement.classList.add("active");
          data.innerHTML = `
          <svg viewBox="0 0 36 36">
            <path
              d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
            ></path>
          </svg> 
          `;
        }
        x++;
      });
    } else {
      document.getElementById("myFrame").setAttribute("src", currVidData.src);
      document.getElementById("myFrame").style.width = "100%";
    }
  });

  const watchBtn = document.getElementById("watchBtn");
  let currVidLocalData = JSON.parse(localStorage.getItem("videos")) || [];
  const videoId = watchBtn.getAttribute("data-video");

  currVidLocalData.forEach((data) => {
    if (videoId === data) {
      watchBtn.classList.add("remove");
      watchBtn.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z"></path></g></svg><p>Remove from Watchlist</p>`;
    }
  });

  watchBtn.addEventListener("click", () => {
    currVidLocalData = JSON.parse(localStorage.getItem("videos")) || [];

    if (watchBtn.classList.contains("remove")) {
      filtered = currVidLocalData.filter(function (value, index, arr) {
        return value != videoId;
      });
      localStorage.setItem("videos", JSON.stringify(filtered));
      watchBtn.classList.remove("remove");
      watchBtn.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M21,16h-7v-1h7V16z M21,11H9v1h12V11z M21,7H3v1h18V7z M10,15l-7-4v8L10,15z"></path></g></svg><p>Add to Watchlist</p>`;
    } else {
      const videoArr = currVidLocalData;
      videoArr.push(videoId);
      localStorage.setItem("videos", JSON.stringify(videoArr));
      watchBtn.classList.add("remove");
      watchBtn.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z"></path></g></svg><p>Remove from Watchlist</p>`;
    }
  });
});
