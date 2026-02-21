import{a as v,S,i as a}from"./assets/vendor-B5nsgUv9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function f(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const q="54645920-7a588b5965485e203aa072a25",P="https://pixabay.com/api/";async function m(r,o){try{return(await v.get(P,{params:{key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch(t){throw t}}const p=document.querySelector(".gallery"),n=document.querySelector(".loader"),h=document.querySelector(".btn-load");function y(){h.classList.remove("is-hidden")}function l(){h.classList.add("is-hidden")}function M(){p.innerHTML=""}function g(){n==null||n.classList.remove("is-hidden")}const E=new S(".gallery a",{captionsData:"alt",captionDelay:250});function b(r){const o=r.map(t=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${t.largeImageURL}">
        <div class="photo-card">
          <img class="photo-card-img"
               src="${t.webformatURL}"
               alt="${t.tags}"
               loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b><span>${t.likes}</span></p>
            <p class="info-item"><b>Views</b><span>${t.views}</span></p>
            <p class="info-item"><b>Comments</b><span>${t.comments}</span></p>
            <p class="info-item"><b>Downloads</b><span>${t.downloads}</span></p>
          </div>
        </div>
      </a>
    </li>
  `).join("");p.insertAdjacentHTML("beforeend",o),E.refresh()}function L(){n==null||n.classList.add("is-hidden")}const w=document.querySelector(".form"),B=document.querySelector('input[name="search-text"]'),R=document.querySelector(".btn-load");w.addEventListener("submit",O);R.addEventListener("click",x);let i=1,c="",u=0;const $=15;async function O(r){if(r.preventDefault(),c=B.value.trim(),i=1,!c){a.warning({message:"Please enter a search query 🙂"});return}M(),l(),g();try{const o=await m(c,i);if(!o.hits.length){a.info({message:"Sorry, there are no images matching your search query. Please try again!"});return}u=Math.ceil(o.totalHits/$),b(o.hits),i<u?y():(l(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"})),w.reset()}catch{a.error({message:"Something went wrong 😢"})}finally{L()}}async function x(){i++,l(),g();try{const r=await m(c,i);b(r.hits),i<u?y():(l(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"}));const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:t*2,behavior:"smooth"}),console.log(),console.log(r)}catch(r){a.error({message:r.message})}finally{L()}}
//# sourceMappingURL=index.js.map
