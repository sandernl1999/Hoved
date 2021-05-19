import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');
  
   img{
    max-width: 18em; 
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
    
   html {
    font-size: 20px; 
    line-height: 1.5; 
    } 

   *{
        box-sizing: border-box;
    }


    html, body {
        margin: 0 auto;
        padding: 0;
        background-color: white; 
    }

    body {
      font-family: 'Fira Sans', sans-serif;
    }

    .bar-chart {
        width: 500px;
        height: 210px !important;
    }
    .bar-chart-container {
        width: 500px;
        height: 210px;
    }
    .mapboxgl-ctrl-geocoder {
        width: 50% !important;
    }
    .mapboxgl-ctrl-top-right {
      right 36% !important;
      width: 60%;
    }
    .mapboxgl-popup-content{
        height: 500px;
        width: 520px;
        position: absolute;
        top: -140px;
    }
    .mapboxgl-popup-close-button {
        font-size: 22px;
    }
    @media screen and (max-width: 1080px) {        
        .mapboxgl-popup-content{
            left: -140px;
        }
    }
    @media screen and (max-width: 775px) {        
        .mapboxgl-popup-content{
            left: -200px;
        }
    }
    @media screen and (max-width: 743px) {
        .item-img {
            height: 70px;
        }
        .mapboxgl-popup-content{
            left: -250px;
        }
        .bar-chart {
            height: 180px !important;
        }
    }
    @media screen and (max-width: 643px) {
        .item-img {
            height: 60px;
        }        
    }
    @media screen and (max-width: 560px) {        
        .mapboxgl-popup-content{
            left: -200px;
        }
    }
    @media screen and (max-width: 500px) {
        .bar-chart {
            width: 400px !important;
            height: 170px !important;
        }
        .bar-chart-container {
            width: 400px;
            height: 170px;
        }
        .mapboxgl-popup-content{
            height: 400px;
            width: 420px;     
        }
        .popup-destinasjon{
            height: 400px;
            width: 400px;     
        }
        .mapboxgl-ctrl-top-right {
            right: 15% !important;
            width: 42%;
        }
    }
    @media screen and (max-width: 700px) {
      .mapboxgl-ctrl-top-right {
        right: 25% !important;
        width: 42%;
      }
    }
    @media screen and (max-width: 600px) {
      .mapboxgl-ctrl-top-right {
        right: 20% !important;
        width: 42%;
      }
    }
    @media screen and (max-width: 490px) {
      .mapboxgl-ctrl-top-right {
          right: 0px !important;
          width: 95% !important;
          top: 50px;
      }
      .mapboxgl-ctrl-geocoder {
          width: 100% !important;
      }
      .modal-content {
        top: 100px !important;
      }
    }
    @media screen and (max-width: 400px) {
        .bar-chart {
            width: 300px !important;
            height: 170px !important;
        }
        .bar-chart-container {
            width: 300px;
            height: 170px;
        }
        .mapboxgl-popup-content{
            height: 400px;
            width: 370px;     
            left: -175px;
        }
  
    }


    /*mao root*/
    #root {
      z-index: -99;
    }

    /*fill the map*/
    .mapContainer {
      margin-top: -10px;
    }


    /*css question box*/
    .modal {
      display: block;
      position: fixed;
      z-index: 1;
      padding-top: 12em;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
    }

    /* Modal Content */
    .modal-content {
      font-family: sans-serif;
      background-color: #fefefe;
      margin: auto;
      padding: 30px;
      border: 1px solid black;
      width: 40%;
      letter-spacing: 1px;
    }

    /* Close button */
    .close {
      color: #727579;
      float: right;
      font-size: 28px;
      font-weight: bold;
      position: absolute;
      right: 5px;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    p {
      text-align: center;
    }

    @media screen and (max-width: 900px) {
      p {
        font-size: 14px !important;
      }
    }

    @media screen and (max-width: 574px) {
      p {
        font-size: 12px !important;
      }
    }

    #myBtn {
      position: absolute;
      z-index: 99;
      left: 10px;
      background-color: white;
      width: 36px;
      margin-top: 0.7px;
      font-size: 22px !important;
      border: 0.3px solid black;
      border-radius: 5px 5px 5px 5px;
      height: 40px;
    }

    .container {
      align-items: center;
      position: fixed;
      z-index: 1;
      display: flex;
      height: 200px;
      justify-content: center;
      top: -2.5em;
      right: -4em;
      width: 360px;
    }

    @media only screen and (max-width: 400px) {
      .modal-content {
        width: 100%;
      }
    }

    @media screen and (max-width: 700px) and (min-width: 400px) {
      .modal-content {
        width: 60%;
      }
    }

    @media only screen and (max-width: 320px) {
      #myBtn {
        left: 0.2em;
      }
    }

    .auth-form {
      padding: 40px;
      border-radius: 10px;      
      font-size: 14px;
      width: 400px;
    }

    .auth-header {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;      
    }
    .form-control {
      font-size: 14px;
    }
    .form-label {
      font-weight: 500;
    }
    button {
      font-size: 14px !important;
    }
    .app-title {
      font-size: 26px;
      position: absolute;
      color: white;
      padding: 20px;
      font-weight: 500;
    }
    html {
      font-family: 'Fira Sans', sans-serif;
      height:100%;
    }
    
    body {
      margin:0;
    }
    
    .bg {
      animation:slide 3s ease-in-out infinite alternate;
      background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
      bottom:0;
      left:-50%;
      opacity:.5;
      position:fixed;
      right:-50%;
      top:0;
      z-index:-1;
    }
    
    .bg2 {
      animation-direction:alternate-reverse;
      animation-duration:4s;
    }
    
    .bg3 {
      animation-duration:5s;
    }
    
    .auth-container {
      background-color:white;      
      border-radius:.25em;
      box-shadow:0 0 .25em rgba(0,0,0,.25);
      box-sizing:border-box;
      left:50%;      
      position:fixed;      
      top:50%;
      transform:translate(-50%, -50%);      
    }
    
    h1 {
      font-family:monospace;
    }
    
    @keyframes slide {
      0% {
        transform:translateX(-25%);
      }
      100% {
        transform:translateX(25%);
      }
    }
    .animate-form {
      animation: wobble .5s 1;
      animation-timing-function	: ease-in;
    }
    @keyframes wobble {
      25% {
        margin-left: 50px;
      }
      50% {
        margin-left: 200px;
      }
      75% {
        margin-left: 400px;
      }
      100% {
        margin-left: 700px;
      }
    }
    .animate-modal {
      animation: modal-animation .5s 1;
      animation-timing-function	: ease-in;
    }
    @keyframes modal-animation {      
      0% {
        margin-left: -1000px;
        opacity: 0;
      }
      33% {
        margin-left: -500px;
        opacity: 0.3;
      }
      66% {
        margin-left: -300px;
        opacity: 0.7;
      }
      90% {
        margin-left: -150px;
        opacity: 0.9;
      }
      100% {
        margin-left: 0px;
        opacity: 1;
      }
    }
    .animate-close-modal {
      animation: modal-close-animation .5s 1;
      animation-timing-function	: ease-in;
    }
    @keyframes modal-close-animation {
      25% {
        margin-left: 50px;
        opacity: 1;
      }
      50% {
        margin-left: 200px;
        opacity: 0.5;
      }
      75% {
        margin-left: 400px;
        opacity: 0.3;
      }
      100% {
        margin-left: 700px;
        opacity: 0;
      }
    }
    .info-modal {
      top: 220px !important;
    }
    .modal-content {      
      padding: 0 !important;
      top: 60px;
    }
    .close-popup-icon {
      color: #000000bf;
      font-size: 24px;
      cursor: pointer;
    }
    .modal {
      padding-top: 0;
    }
    .react-rater-star.is-active {
      color: #ddb745 !important;
    }
    .react-rater-star.will-be-active {
      color: #e3cc86 !important;
    }
    .modal-disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    
    nav {
      margin: auto;
      position: absolute;
      left: 2.5em;
      top: 10px;
      cursor: pointer;
    }
    
    nav h2 {
      font-size: 1.2rem;
      z-index: 1;
      border-radius: 2px;
      position: relative;
      background: white;
      border:  0.3px solid black;
      border-radius: 5px 5px 5px 5px;
      height: 40px;
      text-transform: uppercase;
      color: ivory;
      font-weight: 200;
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      box-shadow: 4px 4px 20px -2px rgba(0,0,0,.35);
      transition: all .4s;
      padding: 0 10px;
    }
    
    nav:hover h2{
      transform: translateY(-2px);
      box-shadow: 2px 2px 5px -1px rgba(0,0,0,.35);
     }
    nav:hover:active h2{
      transform: translateY(10px);
      box-shadow: 0px -1px 2px 0px rgba(0,0,0,.35);
     }
    
    #toggle {
      position: absolute;
      left: 0;
      top: 0;
      width: 20vw;
      z-index: 1;
      opacity: 0;
      cursor: pointer;
      height: 40px;
    }
    
    #toggle:checked ~ul {
      height: 0%;
    }
    
    nav ul {
      padding-left: 0;
      padding-top: 0;
      margin-top: 0;
      list-style: none;      
      text-align: right;
      margin-bottom: 22px;
      text-align: center;
      width: 20vw;
      min-width: 20vw;
      transition: all .4s ease-out;      
      border-radius: 5px 5px 5px 5px;
      max-height: 600px;
      overflow-y: auto;
    }
    nav ul li {
      position: relative;
      display: inline-block;
      border: 1px solid black;
      border-radius: 5px 5px 5px 5px;
      border-top-right-radius: 5px;
      margin-left: 35px;
      line-height: 1.5;
      width: 20vw;
      padding: 0.3em;
      margin: 0;
      margin-bottom: 6px;
      background: white;
      transition: background 3s;
      box-shadow: 2px 2px 10px -2px rgba(0,0,0,.35);
      z-index: 3;
    }
    
    nav ul li:hover {
      background: rgb(77, 152, 223);
      transition: background .45s;
    }
    
    nav ul a {
      display: block;
      color: rgb(17, 17, 16);
      text-transform: lowercase;
      font-size: 18px;
      font-weight: 200;
      text-decoration: none;
      transition: color .3s;
      border-radius: 5px 5px 5px 5px;
    }
    
    li {
        border-top-right-radius: 5px;
    }

    .menu-element:hover {
      color: #FFFFFF;
      text-decoration: none;
    }

    img {
      border-radius: 50%;
    }

    .logout-container {
      position: absolute;
      right: 0px;      
      z-index: 3;      
    }

    .logout-container:hover {
      background-color: #FFFFFF;
    }
    
    .profile-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      float: left;
    }
    
    .logout {
      font-weight: 500;
      color: black;
      font-size: 14px;
      position: relative;
      right: -18px;
      bottom: -12px;
      margin-top: 0.5em;
      overflow: hidden;
      letter-spacing: 3px;
      opacity: 0;
      transition: opacity .45s;
      -webkit-transition: opacity .35s;
      cursor: pointer;
    }  

    .logout-button {
      text-decoration: none;
      float: right;      
      margin: 10px;
      color: black;
      width: 60px;      
      transition: width .35s;
      -webkit-transition: width .35s;
      overflow: hidden;
      text-decoration: none;
    }
    
    .logout-button:hover {
      width: 170px;
    }
    
    .logout-button:hover .logout{
      opacity: .9;
    }

    .dest-modal {
      width: 100%;
    }

    .hide-element {
      visibility: hidden;
    }

    @media screen and (max-width: 750px) {
      .profile-img {
        width: 40px;
        height: 40px;       
      }
      .signup-form {
        padding: 20px !important;
      }
      .app-title {
        padding: 5px;
      }
    }

    @media screen and (max-width: 450px) {
      .auth-form {
        padding: 30px;
        width: 350px;
      }
      .signup-form {
        padding: 20px !important;
      }
    }
    @media screen and (max-width: 360px) {
      .auth-form {
        padding: 20px;
        width: 300px;
      }
      .signup-form {
        padding: 10px !important;
      }
    }
    .align-center {
      text-align : center;
    }
`;

export default GlobalStyle;
