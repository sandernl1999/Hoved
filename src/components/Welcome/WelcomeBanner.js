import React, { useEffect, useState } from "react";

/**
 * Denne komponenten render en velkomst pop-up som blir vist første gang brukeren logger seg inn i applikasjonen
 */
export default function WelcomeBanner() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("showBanner") === "FALSE") {
      setShowBanner(false);
    }
  }, []);

  function closeBanner() {
    setShowBanner(false);
    localStorage.setItem("showBanner", "FALSE");
  }

  return (
    <div>
      {showBanner && (
        <div
          class="modal"
          id="welcome-banner"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog animate-modal">
            <div class="modal-content dest-modal">
              <div class="modal-body">
                <div className="align-center">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={closeBanner}
                  >
                    Jeg skjønner!
                  </button>
                </div>
                <div className="align-center" style={{marginTop: 40}}>
                  <label>Velkommen til MyTravels, trykk på spørsmålstegnet på kartet hvis du trenger hjelp</label>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
