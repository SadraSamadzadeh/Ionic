import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Card from '../components/Card'; // Assuming this component renders the parties
import Popup from '../components/Popup'; // Assuming this is a generic modal component
import { add } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partyList, setPartyList] = useState<any[]>([]);
  const [party, setParty] = useState({
    name: '',
    description: '',
    date: ''
  });

  const [attendee, setAttendee] = useState({ name: '', email: '' });
  const [selectedPartyId, setSelectedPartyId] = useState<number | null>(null);
  const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);

  // Open/close modal for adding a new party
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Open/close modal for adding an attendee
  const openAttendeeModal = (partyId: number) => {
    setSelectedPartyId(partyId);
    setIsAttendeeModalOpen(true);
  };
  const closeAttendeeModal = () => setIsAttendeeModalOpen(false);

  // Handle input changes for the party form
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setParty((prevParty) => ({
      ...prevParty,
      [name]: value,
    }));
  };

  // Handle input changes for the attendee form
  const handleAttendeeChange = (e: any) => {
    const { name, value } = e.target;
    setAttendee((prevAttendee) => ({
      ...prevAttendee,
      [name]: value,
    }));
  };

  // Load party list from localStorage on mount
  useEffect(() => {
    const storedPartyList = localStorage.getItem('partyList');
    if (storedPartyList) {
      setPartyList(JSON.parse(storedPartyList)); // Load from localStorage if available
    }
  }, []);

  // Handle form submission to add a new party
  const handleSubmit = () => {
    setIsModalOpen(false);
    if (party.name && party.description && party.date) {
      const updatedPartyList = [...partyList, { ...party, attendees: [] }];
      setPartyList(updatedPartyList);
      localStorage.setItem('partyList', JSON.stringify(updatedPartyList));

      // Reset form inputs
      setParty({
        name: '',
        description: '',
        date: ''
      });
    }
  };

  // Handle form submission to add a new attendee to a party
  const handleAddAttendee = () => {
    if (selectedPartyId !== null && attendee.name && attendee.email) {
      const updatedPartyList = partyList.map((party) => {
        if (party.id === selectedPartyId) {
          return {
            ...party,
            attendees: [...party.attendees, attendee]
          };
        }
        return party;
      });

      setPartyList(updatedPartyList);
      localStorage.setItem('partyList', JSON.stringify(updatedPartyList));

      // Reset attendee form and close modal
      setAttendee({ name: '', email: '' });
      closeAttendeeModal();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Party Planner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Card parties={partyList} /> {/* Display the list of parties */}
        <IonButton onClick={openModal}>
          <IonIcon icon={add}></IonIcon>
          Add Party
        </IonButton>

        <Popup isOpen={isModalOpen} onClose={closeModal} title="Create Party" buttonText="Close Modal">
          <IonInput name='name' placeholder='Name' value={party.name} onIonChange={handleChange}></IonInput>
          <IonInput name='description' placeholder='Description' value={party.description} onIonChange={handleChange}></IonInput>
          <IonInput type='date' name='date' placeholder='Date' value={party.date} onIonChange={handleChange}></IonInput>
          <IonButton onClick={() => openAttendeeModal(party.id)}>
                <IonIcon icon={add} />
                Add Attendee
          </IonButton>
          <IonButton onClick={handleSubmit}>Add</IonButton>
        </Popup>
        {/* Popup modal for adding an attendee */}
        <Popup isOpen={isAttendeeModalOpen} onClose={closeAttendeeModal} title="Add Attendee" buttonText="Close Modal">
          <IonInput name='name' placeholder='Attendee Name' value={attendee.name} onIonChange={handleAttendeeChange}></IonInput>
          <IonInput name='email' placeholder='Attendee Email' value={attendee.email} onIonChange={handleAttendeeChange}></IonInput>
          <IonButton onClick={handleAddAttendee}>Add Attendee</IonButton>
        </Popup>
      </IonContent>
    </IonPage>
  );
};

export default Home;
