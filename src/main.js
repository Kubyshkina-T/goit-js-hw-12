import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery } from "./js/render-functions";
import { showLoader, hideLoader } from "./js/render-functions";
import { clearGallery } from "./js/render-functions";
import { showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";


const form = document.querySelector(".form");
const inputEl = document.querySelector('input[name="search-text"]');
const loadMore = document.querySelector(".btn-load");

form.addEventListener("submit", handleSubmit);
loadMore.addEventListener("click", onLoadMore);

let page = 1;
let query = "";
let totalPages = 0;
const PER_PAGE = 15;


async function handleSubmit(event) {
    event.preventDefault();

     query = inputEl.value.trim();
    page = 1;

     if (!query) {
    iziToast.warning({ message: "Please enter a search query 🙂" });
    return;
  }
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);

            if (!data.hits.length) {
                iziToast.info({
                    message: `Sorry, there are no images matching your search query. Please try again!`
                });
                return;
        }
        
            totalPages = Math.ceil(data.totalHits / PER_PAGE);
        createGallery(data.hits);
        
             if (page < totalPages) {
     showLoadMoreButton();
             }
             else {
      hideLoadMoreButton();
      iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
           position: "bottomRight"
      });
    }

           form.reset();
        }
    catch(error) {
            iziToast.error({
                message: `Something went wrong 😢`
            });
        }
         finally{
            hideLoader();
         };
    
}
async function onLoadMore() {
    page++;

    hideLoadMoreButton();
    showLoader();

    try {
        const data = await
            getImagesByQuery(query, page);
        
        createGallery(data.hits);
         if (page < totalPages) {
              showLoadMoreButton();
        }
        else {
 hideLoadMoreButton();
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: "bottomRight"
  });
        }
        
        const card = document.querySelector(".gallery-item");
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth"
        })
console.log();

        console.log(data);
    } catch(error) {
        iziToast.error({
            message: error.message
        });
    }
    finally {
         hideLoader();
    }
}

