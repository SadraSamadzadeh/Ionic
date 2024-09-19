import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonSelect, IonSelectOption} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Contacts } from "@capacitor-community/contacts";
import Card from '../components/Card';
import Popup from '../components/Popup';
import { add } from 'ionicons/icons';
import './PartyList.css';

const Partylist: React.FC = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partyList, setPartyList] = useState<any[]>([]);
  const [party, setParty] = useState({
    name: '',
    description: '',
    date: ''
  });
  
  const openModal = async () => {
    setIsModalOpen(true);
    const permissionState: PermissionStatus = await Contacts.requestPermissions();
    if (permissionState.contacts === 'granted') {
     console.log('Permission granted!!');
    }
    const {contacts} = await Contacts.getContacts({projection: {
      name: true,
      phones: true,
      image: true
      }});
      const formattedContacts = contacts.map((contact, index) => ({
        id: contact.contactId,
        name: contact.name?.display || 'UNKOWN',
        phone: contact.phones?.[0]?.number || 'NO PHONE',
      }));
      setContactsList(formattedContacts);
    
  }
  const closeModal = () => setIsModalOpen(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setParty((prevParty) => ({
      ...prevParty,
      [name]: value,
    }));
  };


  useEffect(() => {
    const storedPartyList = localStorage.getItem('partyList');
    if (storedPartyList) {
      setPartyList(JSON.parse(storedPartyList));
    }
   
  }, []);

  const handleSubmit = () => {
    console.log("handleSubmitAddingParties")
    if (party.name && party.description && party.date) {
      const id = partyList.length + 1;
      const newParty = {id, ...party, selectedContacts};
      const updatedPartyList = [...partyList, newParty];
      setPartyList(updatedPartyList);
      localStorage.setItem('partyList', JSON.stringify(updatedPartyList));

      setParty({
        name: '',
        description: '',
        date: ''
      });
      console.log(localStorage.getItem('partyList'));
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
        <Card parties={partyList}>
          </Card> 
        <IonButton className='add-button' onClick={openModal} >
          Add
        </IonButton>
        <Popup isOpen={isModalOpen} onClose={closeModal} title="Create Party" buttonText="Close Modal">
          <IonInput name='name' label='Name' value={party.name} onIonChange={handleChange}></IonInput>
          <IonInput name='description' label='Description' value={party.description} onIonChange={handleChange}></IonInput>
          <IonInput type='date' name='date' label='Date'  value={party.date} onIonChange={handleChange}></IonInput>
            <IonSelect placeholder='Select attendees' multiple={true} onIonChange={(e) => setSelectedContacts(e.detail.value)}>
              {contactsList.map((contact) => (
                <IonSelectOption key={contact.id} value={contact} >
                  {contact.name} - {contact.phone}
                </IonSelectOption>
              ))}
            </IonSelect>
          <IonButton onClick={handleSubmit}>Add</IonButton>
        </Popup>
        
      </IonContent>
    </IonPage>
  );
};

export default Partylist;
