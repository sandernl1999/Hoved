import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import fire from "../../config/firebase-config";

/**
 * Denne komponenten render et brukerprofil bilde og en "logg ut" funksjonalitet 
 */

export default function Logout() {
    const [profileURL, setProfileURL] = useState("");
    const history = useHistory();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if(!userString){
            return;
        }    
        const userObj = JSON.parse(userString);
        const colRef = fire.firestore().collection('users').where("email", "==", userObj.email);
        colRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {                    
                setProfileURL(doc.data().downloadURL);
            });
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }, []);

    function singoutUser() {
        localStorage.removeItem('user');
        history.push('/')
    }

    return (
        <div class="logout-container">
	        <a class="logout-button" href="">
                <img class="profile-img" src={profileURL}></img>
                <div class="logout" onClick={singoutUser}>Logg ut</div>
	        </a>  
        </div>
    )
}