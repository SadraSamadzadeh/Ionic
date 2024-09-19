import React from 'react';
import {add} from 'ionicons/icons'
import { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonThumbnail,
} from '@ionic/react';

import './Card.css';

function Card({ parties }) {
  // Load the parties from local storage when the component mounts
  const deleteParty = (index) => {
    const id = index + 1;
    const updatedPartyList = parties.filter(party => party.id !== id);
    localStorage.setItem('partyList', JSON.stringify(updatedPartyList));
    console.log(JSON.parse(localStorage.getItem('partyList')));
  }
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Upcoming Parties</IonCardTitle>
        <IonCardSubtitle>Parties available in the next 30 days</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
        {parties.map((item, index) => (
            <IonItem key={index}>
            <IonLabel>{item.name}</IonLabel>
            <IonButton href={'/details/' + (index + 1)} slot='end' className='forward-button'>Details</IonButton>
            <IonButton onClick={() => deleteParty(index)} className='delete-button'>Delete</IonButton>
            </IonItem>
        ))}
        </IonList>
        
      </IonCardContent>
    </IonCard>
  );

}
export default Card;