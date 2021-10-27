import React, {useEffect, useState} from 'react'
import logo1 from '../background/pic1.PNG';
import {Carousel} from 'react-bootstrap';
import '../cssPages/Map.css';
import {Alert} from 'react-bootstrap';
import Play from './Player'
import ReactAudioPlayer from 'react-audio-player';
import useSound from 'use-sound';
import firebase from './firebase';
import Sound from "../sounds/alertsound.mp3";
import rSound from "../sounds/clickExit.wav";
import { doc, deleteDoc, setDoc} from "firebase/firestore"
import silenceSound from "../sounds/silence.mp3";
import PlayButton from 'react-play-button';
import { db, auth } from "../firebase"
import {Howl, Howler} from 'howler'
import dateFormat, { masks } from "dateformat";
import Slide1 from '../background/back.png';
import Back from '../background/side.PNG';
import Navbar from '../sidebar/Sidebar';


import{
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
}   from "@react-google-maps/api"

import { formatRelative } from "date-fns";
import mapStyles from './mapStyles';
import Player from './Player';



const libraries = ["places"];
const mapContainerStyle = {
    
  width: "60vw",
  height: "70vh",
  float:"right",
  marginRight:"25px",
  marginBottom:"29px",
  marginTop:"5px",
  borderRadius:"10px",
  border:"5px solid white",
  background:"white"
}
const center = {
    lat: 14.649075, 
    lng: 120.961456,
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,

}

const audioClip = [
    {sound: Sound, label: "Sound"}
]

const useItems = () => {
    const [items, setItems] = useState([]); //useState() hook, sets initial state to an empty array
    useEffect(() => {
      const unsubscribe = firebase
        .firestore() //access firestore
        .collection("reports")//access "items" collection
        .onSnapshot(snapshot => {
          //You can "listen" to a document with the onSnapshot() method.
          const listItems = snapshot.docs.map(doc => ({
            //map each document into snapshot
            id: doc.id, //id and data pushed into items array
            ...doc.data() //spread operator merges data to id.
          }));
          setItems(listItems); //items is equal to listItems
        });
      return () => unsubscribe();
    }, []);
    return items;
  };
  const ItemList = ({ editItem }) => {
    const listItem = useItems();
};
 
 function playSound(){
    const sound = new Howl({
        src: [Sound],
         html5: true,
   
     })
       sound.play();
       Howler.volume(1.0);

}

function respondSound(){
  const sound = new Howl({
      src: [rSound],
       html5: true,
 
   })
     sound.play();
     Howler.volume(1.0);

}



function startSound(){
  const sound = new Howl({
    src: [silenceSound],
     html5: true,
     mute: true,
    

 })
   sound.play();
}

    
const onInfoWindowClose = () =>
this.setState({
  showingInfoWindow: false
});


export default function Map(){
    const {Howl, Howler} = require('howler');
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [infoWindow, setInfoWindow] = useState("")
  
  
 
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const listItem = useItems();
    const [selected, setSelected] = React.useState(null);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) =>{
    mapRef.current = map;
    }, []);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";
    
    const today = Date.now();
    
  


    return <div>
<div className="back">
    
        <br/>
        <h1 style={{marginRight:'23%',textAlign:'right',color:'black',letterSpacing:'2px'}}><b>BARANGAY MAP</b></h1>
{/*        
        <h4>{dateFormat(today, "yyyymmddHHMMssTT")}</h4>
        <button onClick={() => {Date.now()}}>click</button> */}

        <GoogleMap
        mapContainerStyle={mapContainerStyle} 
        zoom={16}
        center={center}
        options ={options}
        onLoad ={onMapLoad}
        
        
       >
      
            { listItem.map(item => (
              
               <Marker style={{width:"1vw ", height: "1vh"}} 
               icon={{url: "public/marker2.PNG", scaledSize: new window.google.maps.Size(27,35), 
                      origin: new window.google.maps.Point(0,0)
              }} 
              key={item.id} position={{lat: item.lat, lng: item.lng}}
                    onClick={() => {
                        setSelected(item);
                }} onLoad={() => {playSound()}} 
                    onUnmount = {() => {respondSound()}}
                    />
       
                ) )}

                

        {selected ? (
        <InfoWindow position={{lat: selected.lat, lng: selected.lng}} 
        onCloseClick={() =>
        setSelected(null)} >
            <div>
              <p><button onClick={()=> {
              

              setDoc(doc(db, "report_history", dateFormat(today,"yyyymmddhMMssTT")+selected.id), {

                residentname: selected.residentname,
                address:  selected.address,
                timeofreport: selected.startTime+' - '+dateFormat(today, "hh:MM TT"),
                contact:  selected.contact,
                incident: selected.typeofreport,
                timestamp: dateFormat(today, "mmmm dd, yyyy 'at' hh:MM:ss TT Z"),
                email: selected.email,
                });  


              deleteDoc(doc(db, "reports", selected.id));
              setSelected(null)
              }}>Report Responded</button></p>
              <h4> {selected.typeofreport}</h4>
              {/* <p><b>Type of Incident: </b>{selected.typeofreport}</p> */}
               <p><b>Description: </b>{selected.description}</p>
                <p><b>Email: </b>{selected.email}</p>
                <p><b>Resident Name: </b>{selected.residentname}</p>
                <p><b>Address: </b>{selected.address}</p>
                <p><b>Contact Number: </b>{selected.contact}</p>
                <p><b>Attachments
                  <br/><br/>
                        Image: </b>
                        {/* <a href={selected.imageURL} target ="_blank">Image URL</a>  */}
                       <a href={selected.imageURL} target="_blank">
                        <img src = {selected.imageURL} alt="No Image" 
                        style={{width:"5vw ", height: "8vh"}}/></a>
                        <br/><br/>
                        <b>Audio: </b><br/>
                      <ReactAudioPlayer src={selected.audioURL} 
                                        style={{width:"15vw ", height: "3vh"}}
                                        controls
                                        html5={true}/></p>             
            </div>
        </InfoWindow>) : null}  
        </GoogleMap>
        <div className="Photangina">
                            <img src={Back} className="image-side-map" alt="nbbs"/>
                </div>
   
     </div>
    </div>;
    
}

