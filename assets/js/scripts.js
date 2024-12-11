const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement


const linkApiGitHub = "https://api.github.com/users/PedrusVictor";

const aboutMe = document.querySelector("#infoUser");
const formacao = document.querySelector("#formacao");
const curso = document.querySelector("#curso");

const avatar = document.querySelector("#avatar");

//carregando informações do perfil
var height=document.documentElement.offsetHeight;
function loadInfo() {

    fetch(linkApiGitHub)
        .then(info => info.json())
        .then(dados => {
            const biosInfo = dados.bio.split("\r\n\r\n");

            aboutMe.textContent = `${dados.name}, ${(biosInfo[0]).toLowerCase()}`;
            formacao.textContent = biosInfo[1];
            curso.textContent = biosInfo[2].split(":")[1];

            avatar.src = dados.avatar_url;
        })
        .catch(error => {
            console.error(error)
        })


}

function changeTheme() {
    const currentTheme = rootHtml.getAttribute("data-theme")
    toggleTheme.classList.toggle("bi-sun");
    toggleTheme.classList.toggle("bi-moon-stars");
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    rootHtml.setAttribute("data-theme", newTheme);

    localStorage.setItem("data-theme", newTheme)

}
function ActiveLinks(activeLink) {
   
    if (activeLink) {
        menuLinks.forEach(item => {
            item.classList.remove("active");
            if (item.classList[0] === activeLink) {
                item.classList.add("active");
            }

        })
    }
}

toggleTheme.addEventListener("click", changeTheme);



const menuLinks = document.querySelectorAll(".menu__link");


menuLinks.forEach(item => {
    item.addEventListener("click", () => {
        menuLinks.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        localStorage.setItem("link-active", item.classList[0])
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("data-theme")
    rootHtml.setAttribute("data-theme", theme);
    const activeLink = localStorage.getItem("link-active");

    ActiveLinks(activeLink);
    loadInfo()

})
window.addEventListener("resize", () => {
    height=document.documentElement.offsetHeight;
    const activeLink = localStorage.getItem("link-active");
    ActiveLinks(activeLink);
})


window.addEventListener("scroll",()=>{

    const scrollY=window.scrollY||document.documentElement.scrollTop;
    var link="h";

    console.log();
    if(scrollY/height<0.15){

        localStorage.setItem("link-active", "h")
    }
    else if(scrollY/height<0.59){

        localStorage.setItem("link-active", "p")
        link="p"
    }
    else if(scrollY/height<0.83){
        localStorage.setItem("link-active", "a")
        link="a"
    }
    else{

        localStorage.setItem("link-active", "c")
        link="c"
    }
    ActiveLinks(link)
    
})