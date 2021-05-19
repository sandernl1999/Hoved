import React, { useRef, useState } from "react";
import Rater from "react-rater";
import fire from "../../config/firebase-config";
import shareStopImg from "../../../assets/images/share_stop.jpg";
import deleteStopImg from "../../../assets/images/delete_img.png";
import Message from "../StatusMessage/Message";

/**
 * Denne komponenten render lagring, fjerning, oppdatering og deling av ny destinasjon funksjonalitet
 * Bruker-destinasjoner er lagret i en kolleksjon hvor brukerdata er lagret mot email ID'en til en innlogget bruker
 */

export default function Destination({
  selectedDest,
  setShowPopup,
  destBoundaries,
  editDestination,
  setEditDestination,
  refreshMarkersOnSave,
  currentDestination,
  deleteDestination,
}) {
  const [destImage, setDestImage] = useState(null);
  const [destDesc, setDestDesc] = useState(
    currentDestination.desc ? currentDestination.desc : ""
  );
  const [destRating, setDestRating] = useState(
    currentDestination.rating ? currentDestination.rating : 0
  );
  const [isEditDestination, setIsDestination] = useState(false);
  const [enableShareDest, setEnableShareDest] = useState(false);
  const [sharewith, setSharewith] = useState("");
  const [disableShare, setDisableShare] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [disableSave, setDisableSave] = useState(false);

  function shareDestination() {
    if (!sharewith) return;
    setDisableShare(true);
    const db = fire.firestore();
    const colRef = db
      .collection("user-destinations")
      .doc(sharewith)
      .collection("destinations");
    colRef
      .add({
        downloadURL: currentDestination.downloadURL,
        title: selectedDest,
        desc: destDesc,
        rating: destRating,
        lng: currentDestination.lng,
        lat: currentDestination.lat,
        createdDateTime: new Date(),
      })
      .then((resp) => {
        setMessage("Delingen var en suksess");
        setMessageType("Suksess");
      })
      .catch((err) => console.log(err))
      .finally((e) => setDisableShare(false));
  }

  function handleDestFileUpload(event) {
    setDestImage(event.target.files[0]);
  }

  function setRate({ rating }) {
    setDestRating(rating);
  }

  function handleFileUpload() {
    const reader = new FileReader();
    reader.onload = function (e) {
      const element = document.getElementById("destination-pic");
      element.setAttribute("src", e.target.result);
      element.setAttribute("width", 250);
      element.setAttribute("height", 250);
      element.removeAttribute("hidden");
    };
    reader.readAsDataURL(destImage);
  }

  function startAnimation() {
    const modalConatainer = document.getElementsByClassName("modal-content");
    modalConatainer[0].classList.add("animate-close-modal");
  }

  function saveDestination() {
    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
  
    setDisableSave(true);
    const userObj = JSON.parse(userString);
    if (destImage) {      
      const storageRef = fire
        .storage()
        .ref(userObj.email + "/destination/" + destImage.name);
      // Last opp fil
      storageRef.put(destImage).then((snapshot) => {
        setEditDestination(false);
        setIsDestination(false);
        handleFileUpload();
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          const db = fire.firestore();
          const colRef = db
            .collection("user-destinations")
            .doc(userObj.email)
            .collection("destinations");
          colRef
            .add({
              downloadURL,
              title: selectedDest,
              desc: destDesc,
              rating: destRating,
              createdDateTime: new Date(),
              ...destBoundaries,
            })
            .then((resp) => {
              console.log(resp);
              refreshMarkersOnSave();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally((e) => setDisableSave(false));
        });
      });
    } else {
      setEditDestination(false);
      setIsDestination(false);
      const db = fire.firestore();
      const colRef = db
        .collection("user-destinations")
        .doc(userObj.email)
        .collection("destinations");
      colRef
        .add({
          downloadURL,
          title: selectedDest,
          desc: destDesc,
          rating: destRating,
          createdDateTime: new Date(),
          ...destBoundaries,
        })
        .then((resp) => {
          console.log(resp);
          refreshMarkersOnSave();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((e) => setDisableSave(false));
    }
  }

  function addDestination() {
    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
    if (!destImage) {
      setMessage("Vennligst velg et bilde");
      setMessageType("error");
      return;
    }
    setDisableSave(true);    
    const userObj = JSON.parse(userString);
    const storageRef = fire
      .storage()
      .ref(userObj.email + "/destination/" + destImage.name);
    // Last opp fil
    storageRef.put(destImage).then((snapshot) => {
      setEditDestination(false);
      setIsDestination(false);
      handleFileUpload();
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        const db = fire.firestore();
        const colRef = db
          .collection("user-destinations")
          .doc(userObj.email)
          .collection("destinations");
        colRef
          .add({
            downloadURL,
            title: selectedDest,
            desc: destDesc,
            rating: destRating,
            createdDateTime: new Date(),
            ...destBoundaries,
          })
          .then((resp) => {
            console.log(resp);
            refreshMarkersOnSave();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally((e) => setDisableSave(false));
      });
    });
  }

  return (
    <div class="modal" id="destination-popup">
      <div class="modal-dialog animate-modal">
        <div class="modal-content dest-modal">
          <div class="modal-header">
            <h5 class="modal-title" id="destination-popup-label">
              {selectedDest}
            </h5>
            <label
              class="close-popup-icon"
              onClick={() => {
                startAnimation();
                setTimeout(() => setShowPopup(false), 500);
              }}
            >
              {" "}
              x{" "}
            </label>
          </div>
          {editDestination && (
            <div>
              <div class="modal-body">
                <div style={{ marginBottom: 10 }}>
                  <input
                    class="form-control"
                    type="file"
                    id="dest-image"
                    onChange={handleDestFileUpload}
                    placeholder="Destination Image"
                  />
                </div>
                <div>
                  <textarea
                    maxLength="100"
                    class="form-control"
                    id="dest-desc"
                    value={destDesc}
                    onChange={(event) => setDestDesc(event.target.value)}
                    rows="3"
                    placeholder="Skriv litt om stedet"
                  ></textarea>
                  <label style={{ fontSize: 16, paddingTop: 4 }}>
                    {100 - destDesc.length} characters left.
                  </label>
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <label>Rate</label>
                  <br />
                  <Rater total={5} rating={destRating} onRate={setRate} />
                </div>
              </div>
              {message.length > 0 && (
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    marginTop: 10,
                  }}
                >
                  <Message
                    message={message}
                    setMessage={setMessage}
                    type={messageType}
                  />
                </div>
              )}
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={() => {
                    startAnimation();
                    setTimeout(() => setShowPopup(false), 500);
                  }}
                >
                  Steng
                </button>
                <button
                  type="button"
                  disabled={disableSave}
                  class="btn btn-primary"
                  onClick={saveDestination}
                >
                  Lagre
                </button>
              </div>
            </div>
          )}
          {!editDestination && (
            <div>
              <div class="modal-body">
                <div>
                  {!currentDestination.title && (
                    <p> Destinasjon lagret</p>
                  )}
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <img
                    id="destination-pic"
                    src="#"
                    alt="destination-pic"
                    hidden={true}
                  />
                  {currentDestination && currentDestination.downloadURL && (
                    <img
                      id="destination-pic"
                      height="250px"
                      width="250px"
                      src={currentDestination.downloadURL}
                      alt="destination-pic"
                    />
                  )}
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <label style={{ fontSize: 16, paddingTop: 4 }}>
                    {destDesc}
                  </label>
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <label>Ranger</label>
                  <Rater
                    total={5}
                    rating={destRating}
                    onRate={setRate}
                    interactive={false}
                  />
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <div style={enableShareDest ? { width: "100%" } : null}>
                    <img
                      src={deleteStopImg}
                      style={{
                        cursor: "pointer",
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        display: "inline",
                      }}
                      alt="delete destination"
                      onClick={deleteDestination}
                    ></img>
                    <img
                      src={shareStopImg}
                      style={{
                        cursor: "pointer",
                        width: 30,
                        height: 30,
                        display: "inline",
                      }}
                      alt="share destination"
                      onClick={() => setEnableShareDest(true)}
                    ></img>
                    {enableShareDest && (
                      <input
                        type="text"
                        class="form-control"
                        value={sharewith}
                        style={{ display: "inline", width: "65%" }}
                        placeholder="Tast inn email til ønsket bruker"
                        onChange={(event) => setSharewith(event.target.value)}
                      />
                    )}
                    {enableShareDest && (
                      <button
                        class="btn btn-primary"
                        disabled={disableShare}
                        onClick={shareDestination}
                        style={{ display: "inline" }}
                      >
                        Del
                      </button>
                    )}
                  </div>
                </div>
                {message.length > 0 && (
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      marginTop: 10,
                    }}
                  >
                    <Message
                      message={message}
                      setMessage={setMessage}
                      type={messageType}
                    />
                  </div>
                )}
              </div>
              {!isEditDestination && (
                <div class="modal-footer">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDestination(true);
                      setEditDestination(true);
                    }}
                    class="btn btn-primary"
                  >
                    Endre destinasjon
                  </button>
                </div>
              )}
              {isEditDestination && (
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary">
                    Steng
                  </button>
                  <button
                    type="button"
                    disabled={disableSave}
                    class="btn btn-primary"
                    onClick={addDestination}
                  >
                    {" "}
                    Lagre{" "}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
