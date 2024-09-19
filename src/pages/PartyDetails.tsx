import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonList } from '@ionic/react';
import React, { useState, useEffect} from 'react';
import './Home.css';

const PartyDetails: React.FC = () => {
    const urlSearchString = window.location.href.split('/');
    const partyName = urlSearchString[4];;
    const [partyList, setPartyList] = useState<any[]>([]);

    useEffect(() => {
        const storedPartyList = localStorage.getItem('partyList');
        if (storedPartyList) {
          setPartyList(JSON.parse(storedPartyList));
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
           
        </IonList>
    </IonContent>

    </IonPage>
  );
};

export default PartyDetails;
