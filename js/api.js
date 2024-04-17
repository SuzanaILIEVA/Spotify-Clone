import { renderSongs } from "./ui.js";

const url ="https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR"

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fc7ad7f54emsh1fe9f36c8af42e6p10c4e3jsn6f81a600f0a5',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
};

// API Isteklerini yonettigimiz class yapisi
 export class API {
    constructor(){                  // constructor : kurucu method'tur. api'nin calistigi yerde direk constuctor yapisi  gelir.
        this.songs =[]             // apiden aldigimiz sarkilari icine atacagimiz dizi.baslangicta bos apiye istek atinca doldurucaz
    }

    // popular muziklere istek atacagimiz method
    async getPopular(){
       const res = await fetch(url, options)     // istek atildi 
       const data = await res.json()            // istek (res) json verisine cevrildi data degiskenine atandi 
    //    console.log(data)


    //  API 'den aldigimiz sarkilari songs dizisine aktardik
       this.songs = data.tracks              
    //    console.log(this.songs)


    // ekrana populer muzikleri aktaracak fonksiyona songs dizisini parametre olrak gonderdik
     renderSongs(this.songs)
   
    }
    // Arama methodu
    async searchMusic(query){
      const res = await fetch(`https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
   options)
   
      const data = await res.json()

      // veriyi istedigimiz hale cevirme 
      // song.track yerine song'a erisme
      const newData = data.tracks.hits.map((song) => ({...song.track}))  // dizinin icinde obje olarak geliyor bunu yaymak icin  map. icinde ki '...' split yontemini kullandik
      console.log(newData)
      
      // ARATILAN SARKILARI EKRAN BASMA 
      renderSongs(newData)
   }
   
}




