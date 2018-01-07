/* Fetch & Display Shows,News, Videos Coming Up */
function getShows() {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/shows?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(deployShows);
}

function getNews() {
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_news?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(deployNews);
}

function getVideos() {

    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/videos?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(deployVideos);
}

function getSingleNewsById(myId) {
    console.log(myId);
        fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/create_news/" + myId + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(openNewsModal);


}

function getSingleVideosById(myId) {
    console.log(myId);
    fetch("http://digitartpzm.dk/wordpress/wp-json/wp/v2/videos/" + myId + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(openVideosModal);
}


function deployShows(json) {
    json.forEach(displayShows);
}

function deployNews(json) {
    json.forEach(displayNews);
}

function deployVideos(json) {
    json.forEach(displayVideos);
}

function displayShows(singleShow) {

    let showsContainer = document.querySelector(".shows_container");
    let showTemplate = document.querySelector("#showsTemplate").content;

    let showClone = showTemplate.cloneNode(true);
    let dateRaw = singleShow.acf.date;
    let dateChar = dateRaw.slice(0, 4)+ "/"+ dateRaw.slice(4, 6)+"/"+dateRaw.slice(6, 8);
    showClone.querySelector("#show_date").textContent = dateChar;
    showClone.querySelector("#show_location").textContent = singleShow.acf.location;
    showClone.querySelector("#show_ticket_link").href = singleShow.acf.linktoticket;
    showsContainer.appendChild(showClone);

};

function displayNews(singleNews) {
    let newsContainer = document.querySelector(".news_container");
    let newsTemplate = document.querySelector("#newsTemplate").content;

    let newsClone = newsTemplate.cloneNode(true);
    newsClone.querySelector("#id_news_post").href = "?id=" + singleNews.id+ "/news";
    newsClone.querySelector("#news_title").innerHTML = singleNews.title.rendered;
    var fade = "url('')";
    let urlRaw = singleNews.better_featured_image.media_details.sizes.thumbnail.source_url;
    let urlNew = fade.slice(0, 5) + urlRaw + fade.slice(5);
  newsClone.querySelector(".single_news_wrapper").style.backgroundImage = urlNew;
    newsContainer.appendChild(newsClone);

};

function displayVideos(singleVideos) {
    console.log(singleVideos);
    let videoContainer = document.querySelector(".video_container");
    let videoTemplate = document.querySelector("#videoTemplate").content;
    let videoClone = videoTemplate.cloneNode(true);
    videoClone.querySelector("#video_id").href = "?id=" + singleVideos.id+ "/videos";
    var fade = "url('')";
    let urlRaw = singleVideos.better_featured_image.media_details.sizes.thumbnail.source_url;
    let urlNew = fade.slice(0, 5) + urlRaw + fade.slice(5);
    videoClone.querySelector(".video_img").style.backgroundImage = urlNew;
    videoClone.querySelector("#video_title").innerHTML = singleVideos.title.rendered;

    videoContainer.appendChild(videoClone);

};
getShows();
getNews();
getVideos();

function openNewsModal(uniqueId) {
    console.log(uniqueId);
    document.getElementById('myModal').style.display = "block";
    let dateRaw = uniqueId.acf.date;
    let dateChar = dateRaw.slice(0, 4)+ "/"+ dateRaw.slice(4, 6)+"/"+dateRaw.slice(6, 8);
    document.querySelector("#news_date_modal").textContent = dateChar;
    document.querySelector("#news_title_modal").textContent = uniqueId.title.rendered;
    document.querySelector("#news_p").innerHTML = uniqueId.content.rendered;
    document.querySelector("#news_modal_img").src = uniqueId.better_featured_image.media_details.sizes.medium.source_url;

}

function openVideosModal(uniqueId) {
    document.onreadystatechange = function () {
  var state = document.readyState;
  if (state == 'interactive') {
      document.querySelector('#load').style.display = "block"; document.querySelector('#video_id').style.visibility="hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
         document.getElementById('interactive');
         document.getElementById('load').style.visibility="hidden";
         document.querySelector('video_id').style.visibility="visible";
      },1000);
  }
}
    console.log(uniqueId);
    document.getElementById('myModal').style.display = "block";
    document.querySelector(".news_trigger").style.display = "none";
    let videoElement = uniqueId.content.rendered;
    console.log(videoElement);
    var divVideo = document.createElement('div');
    divVideo.innerHTML = videoElement;
    document.querySelector(".modal-content").appendChild(divVideo);

}

let searchParams = new URLSearchParams(window.location.search);
let line = searchParams.toString("id");
let id = line.slice(3,6);
console.log(id);

if(window.location.href.indexOf("videos") > -1 && id) {
       getSingleVideosById(id);
}

if(window.location.href.indexOf("news") > -1 && id) {
       getSingleNewsById(id);

}

/* TRIGGER MODAL */

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById('myModal').style.display = "none";
});
