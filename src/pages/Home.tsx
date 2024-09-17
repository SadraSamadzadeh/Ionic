import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel } from '@ionic/react';
import Popup from '../components/Popup';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Party Planner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Party Planner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem button href="/parties">
          <IonLabel>Go To Parties</IonLabel>
        </IonItem>
        <IonItem button href="/play">
          <IonLabel>Go To Playground</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
