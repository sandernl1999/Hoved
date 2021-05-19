import React, { useState, useEffect, useRef } from "react";
import Mapbox from "mapbox-gl";
import HomeContent from "../../components/HomeContent";
import PageTitle from "../../components/PageTitle";
import Container from "../../components/Container";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "react-rater/lib/react-rater.css";
import Destination from "../../components/destination";
import fire from "../../config/firebase-config";
import Menu from "../../components/Menu";
import Logout from "../../components/Auth/logout";
import Information from "../../components/Information";
import WelcomeBanner from "../../components/Welcome/WelcomeBanner";
import { useHistory } from "react-router";

/**
 * Denne komponenten render en Home page som render et kart, dropwdown-menu,
   spørsmåls-boksen, logg ut & destinasjon søk, legge til, endre, slette & dele.
 */

let map = null;
function HomeContainer() {
  const mapElement = useRef(null);
  Mapbox.accessToken =
    "pk.eyJ1Ijoic2FuZGVybmwiLCJhIjoiY2trZWdsZXh6MDgxODJ1bjd2eHhrZHBpNiJ9.CfglP1yR5fWs8mOyh8k46w";

  const [style, setStyle] = useState(
    "mapbox://styles/sandernl/ckkxyzmis0jua17qidgsr1fu7"
  );
  const [showPopup, setShowPopup] = useState(false);
  const [editDestination, setEditDestination] = useState(true);

  const [selectedDest, setSelectedDest] = useState("");
  const [destBoundaries, setDestBoundaries] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [currentDestination, setCurrentDestination] = useState({});
  const history = useHistory();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      history.push("/");      
    }    
    getDestinations();
  }, []);

  useEffect(() => {
    renderInitialState();
    setTimeout(() => {
      setMarkers();
    }, 100);
  }, [destinations]);

  function refreshMarkersOnSave() {
    getDestinations();
  }

  function renderInitialState() {
    map = new Mapbox.Map({
      container: mapElement.current,
      center: [10.381198, 28.748947],
      zoom: 1.5,
      style: style,
    });
    const geocoder = new MapboxGeocoder({
      accessToken:
        "pk.eyJ1Ijoic2FuZGVybmwiLCJhIjoiY2trZWdsZXh6MDgxODJ1bjd2eHhrZHBpNiJ9.CfglP1yR5fWs8mOyh8k46w",
      mapboxgl: Mapbox,
    });
    map.addControl(new Mapbox.NavigationControl(), "bottom-right");
    map.addControl(geocoder);
    geocoder.on("result", (e) => {
      setSelectedDest(e.result.text);
      setTimeout(() => setShowPopup(true), 4000);
      setEditDestination(true);
      setCurrentDestination({});
      const [longitude, latitude] = e.result.center;
      setDestBoundaries({ lat: latitude, lng: longitude });
    });
  }

  function setMarkers() {
    if (!destinations || destinations.length === 0 || !map) {
      return;
    } else {
      destinations.map((item) => {
        let el = document.createElement("div");
        el.className = "min-destinasjon";
        el.setAttribute("data-name", `${item.title}`);
        el.style.display = "block";
        el.style.height = "50px";
        el.style.width = "50px";
        el.style.pointer = "clicker";
        el.style.borderRadius = "50%";
        el.style.backgroundImage = `url('${item.downloadURL}')`;
        el.style.backgroundSize = "50px 50px";

        el.addEventListener("keydown", function (event) {
          if (event.key !== "Enter") return;

          const selectedDestName = el.getAttribute("data-name");
          const selectedDestArray = destinations.filter(
            (dest) => selectedDestName === dest.title
          );
          map.flyTo({
            center: [item.lng, item.lat],
            zoom: 9,
          });
          setShowPopup(true);
          setEditDestination(false);
          setCurrentDestination(selectedDestArray[0]);
          setSelectedDest(selectedDestArray[0].title);
        });

        el.addEventListener("click", function () {
          const selectedDestName = el.getAttribute("data-name");
          const selectedDestArray = destinations.filter(
            (dest) => selectedDestName === dest.title
          );
          setCurrentDestination(selectedDestArray[0]);
          setSelectedDest(selectedDestArray[0].title);
          map.flyTo({
            center: [item.lng, item.lat],
            zoom: 9,
          });
          setShowPopup(true);
          setEditDestination(false);
        });

        new Mapbox.Marker(el, {
          anchor: "top",
        })
          .setLngLat([item.lng, item.lat])
          .addTo(map);
      });
    }
  }

  function deleteDestination() {
    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
    const userObj = JSON.parse(userString);
    fire
      .firestore()
      .collection("user-destinations")
      .doc(userObj.email)
      .collection("destinations")
      .doc(currentDestination.id)
      .delete()
      .then(() => {
        console.log("Destination deleted successfully");
        setShowPopup(false);
        getDestinations();
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  function getDestinations() {
    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }
    const userObj = JSON.parse(userString);
    const destinations = [];
    const colRef = fire
      .firestore()
      .collection("user-destinations")
      .doc(userObj.email)
      .collection("destinations");
    colRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          destinations.push({ ...doc.data(), id: doc.id });
        });
        setDestinations(destinations);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  function renderPage() {
    return (
      <Container as="main">
        {showPopup && (
          <Destination
            selectedDest={selectedDest}
            setShowPopup={setShowPopup}
            editDestination={editDestination}
            destBoundaries={destBoundaries}
            setEditDestination={setEditDestination}
            refreshMarkersOnSave={refreshMarkersOnSave}
            currentDestination={currentDestination}
            deleteDestination={deleteDestination}
          />
        )}
        <Menu destinations={destinations} map={map} />
        <Information />
        <WelcomeBanner />
        <Logout />
        <PageTitle></PageTitle>
        <HomeContent dangerouslySetInnerHTML={{ __html: "" }} />
        <div
          className="mapContainer"
          style={{ height: "100vh", width: "100vw" }}
          ref={mapElement}
        ></div>
      </Container>
    );
  }

  return <>{renderPage()}</>;
}

export default HomeContainer;
