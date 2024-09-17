import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel } from '@ionic/react';
import './Home.css';
import { Contacts } from '@capacitor-community/contacts';

const printContactsData = async () => 
{
  const result = await Contacts.getContacts({
    projection: {
      name: true,
      phones: true,
      postalAddresses: true,
    },
  });

  for (const contact of result.contacts){
    const number = contact.phones?.[0]?.number;
    
    const street = contact.postalAddresses?.[0]?.street;

    console.log(number, street);
  }
}


const Home: React.FC = () => {

  return (
    <IonPage>
      
    </IonPage>
  );
};

export default Home;
