const divPage = document.querySelector(".explanation");
const divPage2 = document.querySelector(".explanation2");
const divPage3 = document.querySelector(".explanation3");

divPage.addEventListener("mouseover", (e)=>{
    if(e.target.classList.contains("uil")){
        e.target.classList.remove("uil-angle-right");
        e.target.classList.add("uil-angle-double-right");
    }
})

divPage.addEventListener("mouseout", (e)=>{
    if(e.target.classList.contains("uil")){
        e.target.classList.remove("uil-angle-double-right");
        e.target.classList.add("uil-angle-right");
    }
})

divPage2.addEventListener("mouseover", (e)=>{
    if(e.target.classList.contains("uil")){
        e.target.classList.remove("uil-angle-right");
        e.target.classList.add("uil-angle-double-right");
    }
})

divPage2.addEventListener("mouseout", (e)=>{
    if(e.target.classList.contains("uil")){
        e.target.classList.remove("uil-angle-double-right");
        e.target.classList.add("uil-angle-right");
    }
})

divPage3.addEventListener("mouseover", (e)=>{
    if(e.target.classList.contains("uil")){
        e.target.classList.remove("uil-angle-right");
        e.target.classList.add("uil-angle-double-right");
    }
})

divPage3.addEventListener("mouseout", (e)=>{
    if(e.target.classList.contains("uil")){
        e.target.classList.remove("uil-angle-double-right");
        e.target.classList.add("uil-angle-right");
    }
})