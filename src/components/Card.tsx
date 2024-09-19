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

function Example({ parties, children}) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Upcoming Parties</IonCardTitle>
        <IonCardSubtitle>Parties available in the next 30 days</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {children}
        <IonList>
        {parties.map((item, index) => (
            <IonItem button={true} key={index} href='/people' >
            <IonLabel>{item.name}</IonLabel>
            <IonButton href={'/details/' + item.name} slot='end'>More Details</IonButton>
            </IonItem>
        ))}
        </IonList>
        
      </IonCardContent>
    </IonCard>
  );

}
export default Example;