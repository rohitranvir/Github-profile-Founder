let url = " https://api.github.com/users";
let serachinputEl = document.getElementById("searchinpput");
let searchButtonEl = document.getElementById("search-btn");
let profilecontainer = document.getElementById("profilecontainer");
let loadingEl = document.getElementById("loading");
let generateprofile = (profile) => {
  return `
    <div class="profole-box">
      <div class="top-section">
        <div class="left-section">
          <div class="avatar">
            <img src="${profile.avatar_url}" alt="avatar" />
          </div>
          <div class="self">
            <h1>${profile.name || "No available"}</h1>
            <h1>@${profile.login}</h1>
          </div>
        </div>
        <div class="right-section">
        <a href=${profile.html_url}>
          <button class="primary-btn">Check profile</button>
          </a>
        </div>
      </div>
      <div class="about">
        <h1>About</h1>
        <p>${profile.bio}</p>
      </div>
      <div class="status">
        <div class="status-item">
          <h3>followers</h3>
          <p>${profile.followers}</p>
        </div>
        <div class="status-item">
          <h3>Following</h3>
          <p>${profile.following}</p>
        </div>
        <div class="status-item">
          <h3>repos</h3>
          <p>${profile.public_repos}</p>
        </div>
      </div>
    </div>`;
};
let fetchprofile = async () => {
  let username = serachinputEl.value;
  loadingEl.innerHTML = "Loading.....";
  loadingEl.style.color = "black";
  try {
    let res = await fetch(`${url}/${username}`);
    let data = await res.json();
    if (data.login) {
      loadingEl.innerText = "";
      profilecontainer.innerHTML = generateprofile(data);
    } else {
      loadingEl.innerHTML = data.message;
      loadingEl.style.color = "red";
    }
    console.log("data", data);
  } catch (error) {
    console.log("error");
  }
};
searchButtonEl.addEventListener("click", fetchprofile);
