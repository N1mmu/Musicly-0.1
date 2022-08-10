'use strict'
//predeclaration

var i,j,k,playlistNo;

// const fs = require('fs');

//json
const songList= require('./songList.json');

//infos that wont change

const noOfSongs = songList.length;
const noOfPlayElements = 12;


// test here




// playlist


const song_name_1 = document.getElementById("song_name_1")
const playlist_img_1 = document.getElementById("playlist_img_1")
const play = document.getElementById("song");
const playlist1_playButton = document.getElementById("playButton_p1");
const playlist1_pauseButton = document.getElementById("pauseButton_p1");


var playlistSongArr=[];
var feedSongArr=[];
var playlistCurrentSongPort=1;
var feedCurrentSongPort=-1;
var currentSong = 0;
var port;
var songNo_click;
var songLoaded_feed=[];
var songAlreadyLoaded=false;



const songChange = function(port,songNo,imgClass,songNameClass){
        let nameElement = document.getElementsByClassName(songNameClass)[port];
        document.getElementsByClassName(imgClass)[port].src = songList[songNo].icon;
        nameElement.innerHTML = songList[songNo].name;
        return songList[songNo].src;

}



const songSelection = function(i,songLoadedList){
        let songNo=Math.floor(Math.random()*noOfSongs);
        while(true){
            for(j=0;j<i;j++){
            if(songLoadedList[j]==songNo){
            songNo=(songNo+1)%noOfSongs;
            break;
            }
        }
        if(j==i) break
    }
    return songNo;

}

// post load function

document.addEventListener("DOMContentLoaded",function(){
    for(i=0;i<13-1;i++){
    songLoaded_feed[i]=songSelection(i,songLoaded_feed);
    feedSongArr[i]=songChange(i,songLoaded_feed[i],'feed_song_image','feed_song_name');
    }
    console.log(songLoaded_feed);

});



const playSong = function(num, playClass,pauseClass,currentSongPort,songListArr){
        document.getElementById('song').src= songListArr[num];
        play.play()
        port = num;
        document.getElementsByClassName(playClass)[num].style.display = "none";
        document.getElementsByClassName(pauseClass)[num].style.display = "block";
}


const clickSong = function(num, playClass,pauseClass,currentSongPort,songListArr){
    if(currentSongPort>=-1 && currentSongPort!=num){
        console.log("played");
        play.pause()
        if(currentSongPort!=-1)
        {
            document.getElementsByClassName(playClass)[currentSongPort].style.display = "block";
        document.getElementsByClassName(pauseClass)[currentSongPort].style.display = "none";
    }
        playSong(num, playClass,pauseClass,currentSongPort,songListArr);
}
else  if (currentSongPort==num){
    console.log("paused");
        play.pause()
        document.getElementsByClassName(playClass)[num].style.display = "block";
        document.getElementsByClassName(pauseClass)[num].style.display = "none";
        currentSong = currentSongPort;
        port=-2;

}else if(currentSongPort==-2){
    console.log("replayed");
    if(currentSong==num){
    play.play()
    document.getElementsByClassName(playClass)[num].style.display = "none";
    document.getElementsByClassName(pauseClass)[num].style.display = "block";
    port=num;
}else{
    playSong(num, playClass,pauseClass,currentSongPort,songListArr);
}
}
}

const endedSong = function(){
    document.getElementsByClassName('feed_play')[feedCurrentSongPort].style.display = "block";
    document.getElementsByClassName('feed_pause')[feedCurrentSongPort].style.display = "none";
    feedCurrentSongPort++;
    let num=feedCurrentSongPort;
    // currentSong = 0;
    playSong(num%noOfPlayElements,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
}


// document.getElementById("song_name_1").addEventListener("click", function(){
//     songNo_click=0;
//     clickSong(0,'play','pause',playlistCurrentSongPort,playlistSongArr);
//     playlistCurrentSongPort = port;
// });
// document.getElementById("song_name_2").addEventListener("click", function(){
//     songNo_click=1;
//     clickSong(1,'play','pause',playlistCurrentSongPort,playlistSongArr);
//     playlistCurrentSongPort = port;
// });
// document.getElementById("song_name_3").addEventListener("click", function(){
//     songNo_click=2;
//     clickSong(2,'play','pause',playlistCurrentSongPort,playlistSongArr);
//     playlistCurrentSongPort = port;
// });
// document.getElementById("song_name_4").addEventListener("click", function(){
//     songNo_click=3;
//     clickSong(3,'play','pause',playlistCurrentSongPort,playlistSongArr);
//     playlistCurrentSongPort = port;
// });
// document.getElementById("song_name_5").addEventListener("click", function(){
//     songNo_click=4;
//     clickSong(4,'play','pause',playlistCurrentSongPort,playlistSongArr);
//     playlistCurrentSongPort = port;
// });
// document.getElementById("song_name_6").addEventListener("click", function(){
//     songNo_click=5;
//     clickSong(5,'play','pause',playlistCurrentSongPort,playlistSongArr);
//     playlistCurrentSongPort = port;
// });
// document.getElementById("song_name_7").addEventListener("click", function(){
//     songNo_click=6;
//     clickSong(6,'play','pause',playlistCurrentSongPort,playlistSongArr);
//     playlistCurrentSongPort = port;
// });

play.addEventListener('ended', function(){
    endedSong();
})


document.getElementsByClassName("feed_song")[0].addEventListener("click", function(){
    songNo_click=0;
    clickSong(0,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[1].addEventListener("click", function(){
    songNo_click=1;
    clickSong(1,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[2].addEventListener("click", function(){
    songNo_click=2;
    clickSong(2,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[3].addEventListener("click", function(){
    songNo_click=3;
    clickSong(3,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[4].addEventListener("click", function(){
    songNo_click=4;
    clickSong(4,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[5].addEventListener("click", function(){
    songNo_click=5;
    clickSong(5,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[6].addEventListener("click", function(){
    songNo_click=6;
    clickSong(6,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[7].addEventListener("click", function(){
    songNo_click=7;
    clickSong(7,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[8].addEventListener("click", function(){
    songNo_click=8;
    clickSong(8,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[9].addEventListener("click", function(){
    songNo_click=9;
    clickSong(9,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[10].addEventListener("click", function(){
    songNo_click=10;
    clickSong(10,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});
document.getElementsByClassName("feed_song")[11].addEventListener("click", function(){
    songNo_click=11;
    clickSong(11,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
});

