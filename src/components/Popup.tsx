import React, { useState, useRef } from 'react';
import {close} from 'ionicons/icons'
import {
  IonButton, 
  IonModal,
  IonHeader, 
  IonTitle,
  IonContent,
  IonToolbar,
  IonIcon,
} from '@ionic/react';

const Popup = ({isOpen, onClose, title, children, buttonText}) => {
    return (
        <>
            
            <IonModal isOpen={isOpen} onDidDismiss={onClose}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle slot='start'>
                            {title}
                        </IonTitle>
                        <IonButton slot='end' onClick={onClose}><IonIcon icon={close}></IonIcon></IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {children}
                </IonContent>
                
            </IonModal>
        </>
    )
}


export default Popup;