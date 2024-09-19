import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonList, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle} from '@ionic/react';
import React, { useState, useEffect} from 'react';
import './Home.css';
import Card from '../components/Card';
import Partylist from './PartyList';

const PartyDetails: React.FC = () => {
    const urlSearchString = window.location.href.split('/');
    const partyID = urlSearchString[4];
    const [party, setParty] = useState<any[]>([]);

    useEffect(() => {
        const storedPartyList = JSON.parse(localStorage.getItem('partyList'));
        if (storedPartyList) {
          const party = storedPartyList.find(p => p.id === parseInt(partyID));
          if (party) {
            setParty(party);
          } else {
            console.error('Party not found in local storage');
          }
        }
      }, []);
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonTitle>Party Planner</IonTitle>
        </IonToolbar>
      </IonHeader>
    <IonContent fullscreen>
        <IonList>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{party.name}</IonCardTitle>
            <IonCardSubtitle>{party.date}</IonCardSubtitle>
            <IonItem lines="none" className='description'><IonLabel >{party.description}</IonLabel></IonItem>
          </IonCardHeader>
    </IonCard>
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Guest List</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {(party?.selectedContacts || []).map((contact, index) => (
          <IonItem lines="none" key={index}>
            <IonLabel>{contact.name}</IonLabel>
            <IonLabel>{contact.phone}</IonLabel>
          </IonItem>
          ))}
          
        </IonList>
      </IonCardContent>
    </IonCard>      
        </IonList>
    </IonContent>
    </IonPage>
  );
};

export default PartyDetails;
