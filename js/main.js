import { API } from "./api.js"
import { elements } from "./helpers.js"
import { renderPlayingInfo, updateTitle } from "./ui.js"


const api = new API
api.getPopular()

//* Sayfa Yuklendigi anda calisir, API'ye istek atip popular muzikleri getirir.
document.addEventListener("DOMContentLoaded", async ()=>  await api.getPopular())


const playMusic = (url) => {
//    console.log(url)
elements.audioSource.src = url   // Muzigin url'ini html'e aktarma 
console.log(elements.audio)
elements.audio.load()         //  audio elementinin muzigi yuklemesini sagladik

}


// listede ki tiklamalarda calisir 
const handleClick = (e) => {
    if(e.target.id === "play-btn"){
//   console.log("play butonuna tiklanildi ")
//   console.log(e.target.parentElement.parentElement.parentElement) // card yapisina eristik 
     const parent = e.target.closest(".card")  // closest("") parentElemana ulasmanin daha kisa yolu icine girdigin elemana goturur en yakin parent
    // console.log(parent.dataset)

    // calinacak muzigin bilgilerini ekrana basar 
    renderPlayingInfo(parent.dataset)
  
    //  Muzigi calar 
    playMusic(parent.dataset.url)

    // audio elementinin muzigi oynatmasini saglar
    elements.audio.play()
}}

document.addEventListener("click", handleClick) // liste alanindaki tiklamalari izler

// fotoyu dondurur
const animatePhoto = () => {
     const img = document.querySelector(".info img")
    img.className ="animate"
}
 
// img etiketine ekledigimiz animate classini kaldirir
const stopAnimation =() => {
    const img = document.querySelector(".info img")
    img.classList.remove("animate")
}


//muzigi calma ve durdurma olaylarini izler.
elements.audio.addEventListener("play", animatePhoto)
elements.audio.addEventListener("pause", stopAnimation)



elements.form.addEventListener("submit", (e) =>{
    e.preventDefault()

   const query = e.target[0].value   // inputa girilen degeri aldik degiskene aktardik
   if(!query){
    alert("Lütfen bütün alanları doldurunuz!")
    return 

   }

   //aratilan kelime ile basligi gunceller
   updateTitle(`${query} İçin Sonuçlar`)
   api.searchMusic(query)

})

// menu tiklandiginda gozukup kayboluyor
elements.menu.addEventListener("click" , () => {
    elements.ulList.classList.toggle("toggle")
})

