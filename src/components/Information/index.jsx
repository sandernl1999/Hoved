import React from 'react';

/**
 * Denne komponenten render en informasjons-button øverst i venstre hjørne. 
 */

function Information() {

    const [showModal, setShowModal] = React.useState(false);    

    function openModal() {        
        setShowModal(!showModal);
    }
  
    return (      
        <div style={{position: 'absolute'}}>            
            <label style={{marginBottom: "12px"}}><button id="myBtn" onClick={openModal}>?</button></label>
            { showModal && 
                <div id="myModal" class="modal">
                    <div class="modal-content info-modal">
                        <span tabIndex="1" class="close" onClick={openModal}>&times;</span>
                        <p style={{marginTop: 30}}>Søk opp destinasjoner i søkefeltet og lagre dine besøkte steder i denne digitale reise-boka.</p>
                        <p></p>
                        <p>Utforsk nye områder og del med andre registrerte venner!</p>
                    </div>
                </div> 
            }            
        </div>      
    )    
};
  
export default Information;