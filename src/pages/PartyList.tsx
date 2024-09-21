import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonSelect, IonSelectOption} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Contacts } from "@capacitor-community/contacts";
import Card from '../components/Card';
import Popup from '../components/Popup';
import './PartyList.css';
import { CapacitorCalendar } from '@ebarooni/capacitor-calendar';
import { SmsManager } from '@byteowls/capacitor-sms';


const Partylist: React.FC = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedParty, setSelectedParty] = useState<any[]>([]);
  const [contactsList, setContactsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [partyList, setPartyList] = useState<any[]>([]);
  const [party, setParty] = useState({
    name: '',
    description: '',
    date: ''
  });
  
  const openModal = async (info) => {
      const permissionStauts: PermissionStatus = await CapacitorCalendar.requestFullCalendarAccess();
      if (permissionStauts.calendar === 'granted') {
        console.log('Permission granted!! for calendar now');
      }
      
    setIsModalOpen(true);
    const permissionState: PermissionStatus = await Contacts.requestPermissions();
    if (permissionState.contacts === 'granted') {
     console.log('Permission granted!!');
    }
    const result = await CapacitorCalendar.requestFullCalendarAccess();
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
  const openModal2 = () => {
    setIsModal2Open(true);
    partyList.map((party) => (
      console.log(party.name)
    ))
  }
  const closeModal = () => setIsModalOpen(false);
  const closeModal2 = () => setIsModal2Open(false);

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
    console.log(partyList);
   
  }, []);

  const handleSubmit = async () => {
    if (party.name && party.description && party.date) {
      const id = partyList.length + 1;
      const newParty = {id, ...party, selectedContacts};
      const updatedPartyList = [...partyList, newParty];
      setPartyList(updatedPartyList);
      const dateNumber = new Date(party.date).getTime();
      await CapacitorCalendar.createEvent({
        title: newParty.name,
        notes: newParty.description,
        isAllDay: true,
        startDate: dateNumber,
        })
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
  const handleInvite = () => {
    let number: string[];
    number = [];
    selectedParty.selectedContacts.map(contact => (
      number.push(contact.phone)
    ));
    console.log(number);
    SmsManager.send({
    numbers: number,
    text: "this is example and a test",
    }).then(() => {

    }).catch(error => {
      console.error(error);
    })
  }

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
        <IonButton className='add-button' onClick={openModal2} >
          Invite
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
          <IonButton className='add-popup' onClick={handleSubmit}>Add</IonButton>
        </Popup>
        <Popup title="Select Party" buttonText="Close Modal" isOpen={isModal2Open} onClose={closeModal2}>
        <IonSelect placeholder='select party' multiple={false} onIonChange={(e) => setSelectedParty(e.detail.value)}>
        {partyList.map((party) => (
            <IonSelectOption key={party.id} value={party}>
              {party.name}
            </IonSelectOption>
          ))}
        </IonSelect>
          <IonButton onClick={handleInvite}>
            Invite
          </IonButton>
              
        </Popup>
        
      </IonContent>
    </IonPage>
  );
};

export default Partylist;
