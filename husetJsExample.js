/* GALLERY */
document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'interactive') {
       document.querySelector('.section_gallery').style.visibility="hidden";
  } else if (state == 'complete') {
      setTimeout(function(){
         document.getElementById('interactive');
         document.getElementById('load').style.visibility="hidden";
         document.querySelector('.section_gallery').style.visibility="visible";
      },1000);
  }
}


function getMedia() {
    console.log("fzfz");
    fetch("https://digitartpzm.dk/wordpress/wp-json/wp/v2/media")
        .then(function (response) {
            return response.json()
        })
        .then(deployImage);
}

function getSingleEventById(myId) {
    console.log(myId);
    fetch("https://digitartpzm.dk/wordpress/wp-json/wp/v2/media/" + myId + "?_embed")
        .then(function (response) {
            return response.json()
        })
        .then(openGalleryModal);
}


function deployImage (json) {
    json.forEach(showImage);
}

function showImage (singleImage) {
     let section_gallery = document.querySelector(".section_gallery");
    let template = document.querySelector("#gallery_template").content;
     if (singleImage.title.rendered == "gallery") {
         let clone = template.cloneNode(true);
         clone.querySelector("#img_gallery").src = singleImage.source_url;
         clone.querySelector("#link_modal").href = "?id=" + singleImage.id;
         section_gallery.appendChild(clone);
    }
};

getMedia() ;

function openGalleryModal (json) {
    console.log(json);
    document.getElementById('myModal').style.display = "block";
    document.querySelector(".modal-content #big_img").src = json.media_details.sizes.full.source_url;
     document.querySelector(".modal-content #caption").innerHTML = json.caption.rendered;
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");

if (id) {
    getSingleEventById(id);
}

document.getElementById("close").addEventListener("click",function() {
    document.getElementById('myModal').style.display = "none";
});
