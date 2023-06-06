const navicon = document.getElementById("toggleLink");

navicon.addEventListener("click", ()=>{
    document.getElementById("navtog").classList.toggle("fa-xmark");
    const linksShow = document.querySelector(".links__container");

    if(document.getElementById("navtog").classList.contains("fa-xmark")){
        linksShow.style.left = "50%";
    }else{
        linksShow.style.left = "500%";
    }
});