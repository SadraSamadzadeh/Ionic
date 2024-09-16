import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, {useState, useEffect} from 'react';
import Card from '../components/Card';
import Popup from '../components/Popup';
import {add} from 'ionicons/icons'
import './Home.css';
const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [partyList, setPartyList] = useState([]);
  const [party, setParty] = useState({
    name: '',
    description: '',
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setParty((prevParty) => ({
      ...prevParty,
      [name]: value,
    }));
  }
  useEffect(() => {
    const storedPartyList = localStorage.getItem('partyList');
    if (storedPartyList) {
      setPartyList(JSON.parse(storedPartyList)); // Parse and set the stored list
    }
  }, []);

  const handleSubmit = () => {
    setIsModalOpen(false);
    if(party.name && party.description) {
      const updatedPartyList = [...partyList, party];
      setPartyList(updatedPartyList);
      localStorage.setItem('partyList', JSON.stringify(updatedPartyList));
      setParty({
        name: '',
        description: '',
      })
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
        <Card
          parties={partyList}
        ></Card>
        <IonButton onClick={openModal}><IonIcon icon={add}></IonIcon></IonButton>
        <Popup
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Create Party"
          buttonText="Close Modal"
        >
        <IonInput name='name' label='Name' onIonChange={handleChange}></IonInput>
        <IonInput name='description' label='Description' onIonChange={handleChange}></IonInput>
        <IonButton onClick={handleSubmit}>Add</IonButton>
        </Popup>
      </IonContent>
    </IonPage>
  );
};

export default Home;
