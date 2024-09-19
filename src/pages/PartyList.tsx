import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Contacts } from "@capacitor-community/contacts";
import Card from '../components/Card';
import Popup from '../components/Popup';
import { add } from 'ionicons/icons';
import './Home.css';

const Partylist: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partyList, setPartyList] = useState<any[]>([]);
  const [party, setParty] = useState({
    name: '',
    description: '',
    date: ''
  });
  let contactsData = [];
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setParty((prevParty) => ({
      ...prevParty,
      [name]: value,
    }));
  };
  const handleContacts = async () => {
    const permissionState: PermissionStatus = await Contacts.requestPermissions();
    if (permissionState.contacts === 'granted') {
     console.log('Permission granted!!');
    }
    const {contacts} = await Contacts.getContacts({projection: {
      name: true,
      phones: true,
      image: true
      }});
      console.log(contacts[0].contactId + "");
      contactsData = contacts;
  }

  useEffect(() => {
    const storedPartyList = localStorage.getItem('partyList');
    if (storedPartyList) {
      setPartyList(JSON.parse(storedPartyList));
    }
   
  }, []);

  const handleSubmit = () => {
    console.log("handleSubmitAddingParties")
    if (party.name && party.description && party.date) {
      const updatedPartyList = [...partyList, { ...party, attendees: [] }];
      setPartyList(updatedPartyList);
      localStorage.setItem('partyList', JSON.stringify(updatedPartyList));

      setParty({
        name: '',
        description: '',
        date: ''
      });
    }
    setIsModalOpen(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Party Planner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Card parties={partyList} /> 
        <IonButton onClick={openModal}>
          <IonIcon icon={add}></IonIcon>
          Add Party
        </IonButton>
        <Popup isOpen={isModalOpen} onClose={closeModal} title="Create Party" buttonText="Close Modal">
          <IonInput name='name' placeholder='Name' value={party.name} onIonChange={handleChange}></IonInput>
          <IonInput name='description' placeholder='Description' value={party.description} onIonChange={handleChange}></IonInput>
          <IonInput type='date' name='date' placeholder='Date' value={party.date} onIonChange={handleChange}></IonInput>
          <IonButton onClick={handleContacts}>Add People</IonButton>
          <IonButton onClick={handleSubmit}>Add</IonButton>
        </Popup>

      </IonContent>
    </IonPage>
  );
};

export default Partylist;
