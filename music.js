
let hiddenmenu=document.querySelector(".hidden-menu");

let openbtn=document.querySelector(".more i");

let closebtn=document.querySelector(".close i");

let slide=document.querySelector(".others input")

let playBar=document.getElementById("play");

let pausebar=document.getElementById("pause");

let some=document.querySelectorAll(".controls i")

let volumeBar=document.querySelector(".slidecontainer input")

openbtn.addEventListener('click',()=>{
    hiddenmenu.style.left="0";
    openbtn.style.display="none";
    closebtn.style.display="block";
})

closebtn.addEventListener('click',()=>{
    hiddenmenu.style.left="-205px";
    openbtn.style.display="block";
    closebtn.style.display="none";
})

slide.addEventListener('change',()=>{
    console.log(slide.value);
})

let songList=document.querySelector(".songs-list");

for(let song in songsList){
    songList.innerHTML=songList.innerHTML+`<div class="song-card">
        <div class="song-album"><img src="${songsList[song].cover}" alt=""></div>
        <div class="song-card-name">
            <p class="song-card-song-name">${songsList[song].name}</p>
            <p class="singer">${songsList[song].by}</p>
        </div>
        <audio src="${songsList[song].track}"></audio>
    </div>`
}

let songs=document.querySelectorAll(".song-card");
let audios=document.querySelectorAll("audio")

let sources=[]

for(i of audios){
    sources.push(i.src)
}


console.log(songs.length)

let playingNow=new Audio();


let prevSong=document.getElementById("previous");
let nextSong=document.getElementById("next");




const playMusic = (item)=>{
    playingNow.src=item;
    

    playBar.style.display="none";
    pausebar.style.display="block"

    let index=sources.indexOf(playingNow.src)
    console.log(index);

    playingNow.addEventListener("timeupdate",()=>{
        songDur(playingNow.currentTime,playingNow.duration);
        let perc=((playingNow.currentTime/playingNow.duration)*100)
        moveProgress(perc);
    })


    prevSong.addEventListener("click",()=>{
        if(index>0){
            playMusic(sources[index-1]);
        }
        
    })
    
    nextSong.addEventListener("click",()=>{
        console.log("next")
        if(index<sources.length-1){
            playMusic(sources[index+1]);
        }
    })

    volumeBar.addEventListener("change",()=>{
        playingNow.volume=parseInt(volumeBar.value)/100;
    })
    songName(item)
    playingNow.play();
}

const songDur=(a,b)=>{
    let time=document.querySelector(".details p")
    let total=`${Math.floor(b/60)}:${Math.floor(b%60)}`
    let comp=`${Math.floor(a/60)}:${Math.floor(a%60)}`
    if (b%60<10){
         total=`${Math.floor(b/60)}:0${Math.floor(b%60)}`
    }else{
         total=`${Math.floor(b/60)}:${Math.floor(b%60)}`
    }
    if (a%60<10){
        comp=`${Math.floor(a/60)}:0${Math.floor(a%60)}`
    }else{
        comp=`${Math.floor(a/60)}:${Math.floor(a%60)}`
    }
    time.innerText=`${comp}/${total}`;
}

const songName=(song)=>{
    let sName=document.querySelector(".details h4");
    let playBarName=song.replace("http://127.0.0.1:5500/","")
    playBarName=playBarName.replaceAll("%20"," ")
    playBarName=playBarName.replaceAll(".mp3","")
    let list=playBarName.split("-")
    sName.innerText=playBarName;
    let imgSrc="https://udayreddy2608.github.io/YT-MUSIC-CLONE/King Canyon"+".jpeg"
    changeCover(imgSrc)
}

const changeCover=(img)=>{
    let cover=document.querySelector(".cover img");
    cover.style.display="block";
    cover.src=img;
}


for (i=0;i<songs.length;i++){
    let item=audios[i].src.trim();
    songs[i].addEventListener('click',()=>{
        console.log(item);
        playMusic(item)
        console.log("clicked!!")
    })
}

const moveProgress=(percentage)=>{
    let bar=document.querySelector(".prog-circ");
    bar.style.left=percentage+"%";
}

play.addEventListener('click',()=>{
    playingNow.play()
    playBar.style.display="none";
    pausebar.style.display="block";
});

pausebar.addEventListener('click',()=>{
    playingNow.pause()
    playBar.style.display="block";
    pausebar.style.display="none";
});










/* let playBar=document.getElementById("play");
        let pausebar=document.getElementById("pause");
        playBar.addEventListener('click',()=>{
                audio.play();
                pausebar.style.display="block";
        
                
        })
        pausebar.addEventListener('click',()=>{
                audio.pause();
                pausebar.style.display="none";
        playBar.style.display="block";
                
         */


