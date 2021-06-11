const cards = document.querySelectorAll(".card");
const modal = document.querySelector(".modalOverlay");
const iframe = modal.querySelector("iframe");
const modal2 = modal.querySelector(".modal");
const buttonMaximize = modal.querySelector(".maximizeModal");

for (const card of cards) {
    card.addEventListener("click", function(){
        modal.classList.add("active");
        let title = card.querySelector(".cardTitle p").textContent.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").replace("  ", " ").replace(/ /g, "-")
        iframe.src = `https://blog.rocketseat.com.br/${title}`;
    })
}

modal.querySelector(".closeModal").addEventListener("click", function(){
    modal.classList.remove("active");
    modal2.classList.remove("maximize");
    buttonMaximize.querySelector("span").textContent = "open_in_full";
});



buttonMaximize.addEventListener("click", function(){
    if(modal2.classList.contains("maximize")){
        modal2.classList.remove("maximize");
        buttonMaximize.querySelector("span").textContent = "open_in_full";
    }else{
        modal2.classList.add("maximize");
        buttonMaximize.querySelector("span").textContent = "close_fullscreen";
    }
});