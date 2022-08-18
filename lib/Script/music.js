'use strict'
//predeclaration

var i,j,k,playlistNo;

// const fs = require('fs');

//json
const songList= require('./songList.json');

///////////// infos that wont change ////////////////

const noOfSongs = songList.length;
const noOfPlayElements = 12;

const kpopSongList=[];


///////////////////////////////////////////////////

// test here

window.logItTest = () => console.log("logged it and tested");

//////////////////////////////////////////////////////////

/////////////////// Pre Declaration (DOM) ////////////////


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

/////////////////////////////////////////////////////////////////

////////// Audio atributes change function when on load /////////



const songChange = function(port,songNo,imgClass,songNameClass){
        let nameElement = document.getElementsByClassName(songNameClass)[port];
        document.getElementsByClassName(imgClass)[port].src = songList[songNo].icon;
        nameElement.innerHTML = songList[songNo].name;
        return songList[songNo].src;

}

//////////////////////////////////////////////////////////////////////////

/////////////// Song Selection from  post load function /////////////////


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

///////////////////////////////////////////////

///////////// post load function //////////////

document.addEventListener("DOMContentLoaded",function(){
    for(i=0;i<13-1;i++){
    songLoaded_feed[i]=songSelection(i,songLoaded_feed);
    feedSongArr[i]=songChange(i,songLoaded_feed[i],'feed_song_image','feed_song_name');
    }
    console.log(songLoaded_feed);

});
/////////////////////////////////////////////////////////////////////






////////////////   Play Song and Click function /////////////////////

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
///////////////////////////////////////////////////////////////

/////////////////// Ended song Function //////////////////////

window.endedSong = function(){
    document.getElementsByClassName('feed_play')[feedCurrentSongPort].style.display = "block";
    document.getElementsByClassName('feed_pause')[feedCurrentSongPort].style.display = "none";
    feedCurrentSongPort++;
    let num=feedCurrentSongPort;
    playSong(num%noOfPlayElements,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
}


play.addEventListener('ended', function(){
    endedSong();
})

//////////////////////////////////////////////////


/////////////////// Global feed listeners //////////////

window.click = function(no){
    songNo_click=no;
    clickSong(no,'feed_play','feed_pause',feedCurrentSongPort,feedSongArr);
    feedCurrentSongPort = port;
}
