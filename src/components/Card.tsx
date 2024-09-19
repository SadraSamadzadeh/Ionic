import React from 'react';
import {add} from 'ionicons/icons'
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

function Example({ parties }) {
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
            <IonButton href={'/details/' + item.name} slot='end' className='forward-button'>Details</IonButton>
            <IonButton className='delete-button'>Delete</IonButton>
            </IonItem>
        ))}
        </IonList>
        
      </IonCardContent>
    </IonCard>
  );

}
export default Example;