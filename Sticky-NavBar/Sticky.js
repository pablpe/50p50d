let nav = document.querySelector("nav");

window.addEventListener("scroll", ()=>{
    if (window.scrollY >= 100) {
        nav.classList.add("navActive");
    }else{
        nav.classList.remove("navActive");
    }
})