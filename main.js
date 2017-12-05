/* Fetch & Display New Shows Coming Up */

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
    console.log(json);
}

function deployNews(json) {
    json.forEach(displayNews);
    console.log(json);
}

function deployVideos(json) {
    json.forEach(displayVideos);
    console.log(json);
}

function displayShows(singleShow) {
    let showsContainer = document.querySelector(".shows_container");
    let showTemplate = document.querySelector("#showsTemplate").content;

    let showClone = showTemplate.cloneNode(true);
    showClone.querySelector("#show_date").textContent = singleShow.acf.date;
    showClone.querySelector("#show_location").textContent = singleShow.acf.location;
    showClone.querySelector("#show_ticket_link").href = singleShow.acf.linktoticket;
    showsContainer.appendChild(showClone);

};

function displayNews(singleNews) {
    let newsContainer = document.querySelector(".news_container");
    let newsTemplate = document.querySelector("#newsTemplate").content;

    let newsClone = newsTemplate.cloneNode(true);
    newsClone.querySelector("#id_news_post").href = "?id=" + singleNews.id;
    newsClone.querySelector("#news_date").textContent = singleNews.acf.date;
    newsClone.querySelector("#news_title").textContent = singleNews.title.rendered;
    var fade = "url('')";
    let urlRaw = singleNews.better_featured_image.media_details.sizes.thumbnail.source_url;
    let urlNew = fade.slice(0, 5) + urlRaw + fade.slice(5);
    newsClone.querySelector(".single_news_wrapper").style.backgroundImage = urlNew;
    newsContainer.appendChild(newsClone);

};

function displayVideos(singleVideos) {
    let videoContainer = document.querySelector(".video_container");
    let videoTemplate = document.querySelector("#videoTemplate").content;

    let videoClone = videoTemplate.cloneNode(true);
    videoClone.querySelector("#video_id").href = "?id=" + singleVideos.id;
    var fade = "url('')";
    let urlRaw = singleVideos.better_featured_image.media_details.sizes.thumbnail.source_url;
    let urlNew = fade.slice(0, 5) + urlRaw + fade.slice(5);
    videoClone.querySelector(".video_img").style.backgroundImage = urlNew;
    videoClone.querySelector("#video_title").textContent = singleVideos.title.rendered;

    videoContainer.appendChild(videoClone);

};
getShows();
getNews();
getVideos();

function openNewsModal(uniqueId) {
    console.log(uniqueId);
    document.getElementById('myModal').style.display = "block";
    document.querySelector("#news_date_modal").textContent = uniqueId.acf.date;
    document.querySelector("#news_title_modal").textContent = uniqueId.title.rendered;
    document.querySelector("#news_p").innerHTML = uniqueId.content.rendered;
    document.querySelector("#news_modal_img").src = uniqueId.better_featured_image.media_details.sizes.large.source_url;

}

function openVideosModal(uniqueId) {
    console.log(uniqueId);
    document.getElementById('myModal').style.display = "block";
    let videoElement = uniqueId.content.rendered;
    console.log(videoElement);

    var divVideo = document.createElement('div');
    divVideo.innerHTML = videoElement;
    document.querySelector(".modal-content").appendChild(divVideo);

}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");

if (id) {
    getSingleNewsById(id);
    getSingleVideosById(id);
}

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById('myModal').style.display = "none";
});
