import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery } from "./js/render-functions";    
import { showLoader, hideLoader } from "./js/render-functions";
import { clearGallery } from "./js/render-functions";


const form = document.querySelector(".form");
const inputEl = document.querySelector('input[name="search-text"]');
const loadMore = document.querySelector(".btn-load");

form.addEventListener("submit", handleSubmit);
loadMore.addEventListener("click", onLoadMore);

let page = 1;
let query = "";

function handleSubmit(event) {
    event.preventDefault();
     query = inputEl.value.trim();
    page = 1;

     if (!query) {
    iziToast.warning({ message: "Please enter a search query 🙂" });
    return;
  }
 clearGallery();
    showLoader();

    getImagesByQuery(query, page)
        .then(data => {
            if (!data.hits.length) {
                iziToast.info({
                    message: `Sorry, there are no images matching your search query. Please try again!
    `
                });
                return;
            }
            createGallery(data.hits);
            loadMore.classList.replace("load-hidden", "btn-load");

           form.reset();
        })
        .catch(error => {
            iziToast.error({
                message: `Something went wrong 😢`
            });
        })
         .finally(() => {
            hideLoader();
         });
    
}
async function onLoadMore() {
    page++;

    try {
        const data = await
            getImagesByQuery(query, page);
            createGallery(data.hits);
        console.log(data);
        // gallery.insertAdjacentHTML("beforeend", createGallery(data.hits))
        
    } catch(error) {
        iziToast.error({
            message: error.message
        });
}
}