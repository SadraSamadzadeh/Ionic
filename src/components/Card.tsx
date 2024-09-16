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

function Example({ parties}) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Upcoming Parties</IonCardTitle>
        <IonCardSubtitle>Parties available in the next 30 days</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
        {parties.map((item, index) => (
            <IonItem button={true} key={index} href='/people' >
            <IonThumbnail slot="start">
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel>{item.name}</IonLabel>
            <IonLabel>{item.description}</IonLabel>
            </IonItem>
        ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );

}
export default Example;