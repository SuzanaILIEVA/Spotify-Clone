import { elements } from "./helpers.js"

 export const renderSongs = (songs) => {
 elements.list.innerHTML = ""           // basta ici bos olacak
    songs.forEach((song) => {           // forEach ile sarkilar dizisini aldik herbirini don dedik
        // console.log(song)

        //card datasuna card elemanina bazi verileri ekleme
         const div = document.createElement("div")   // her yapi icin bir card yapisi kapsayici olusturduk
         div.dataset.url = song.hub?.actions?.pop().uri  // div'e data-url ekledik
         div.dataset.title = song.title                     // dive data-title ekledik (? : varsa al yoksa devam et )
        div.dataset.img = song.images?.coverart            // div'e data-img ekledik
        
        div.className = "card"
        div.innerHTML = `
        <figure>
              <img
                src="${song.images.coverart}"
                alt=""
              />
              <div class="play">
                <i class="bi bi-play-fill" id="play-btn"></i>
              </div>
            </figure>
            <h4>${song.subtitle}</h4>
            <h4>${song.title}</h4>`



            elements.list.appendChild(div)   // divi list'e ekledik
        // console.log(div)
    })


};

export const renderPlayingInfo =(song) => {
  console.log(song)
elements.playingInfo.innerHTML = `
<img src="${song.img}" 
id="info-img" alt="" class="" >
<div>
  <p>Şu an oynatılıyor...</p>
  <h3>${song.title}</h3>
</div>
`

}

// basligi gunceller
export const updateTitle = (message) => {
  elements.title.innerText = message
}