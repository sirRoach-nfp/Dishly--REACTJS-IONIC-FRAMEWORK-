import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton } from '@ionic/react';
import './accesspage.scss'
import Button from '@mui/material/Button';

const Accesspage: React.FC = () => {

    return(
     <IonPage>
        <IonContent>
            <div className="container">
            
            <div className="iconBox">
                <div className="iconCircle">
                    <img src="Assetsimg/Login.png" alt="" className="logo" />
                </div>
            </div>
            <div className="tagBox">
                <h2 className="appname">DISHLY</h2>
                <span className="tag">
                “From Pantry to Plate”
                </span>
            </div>
            <div className="buttonBox">
                <Button variant="contained" className='buttonStyleLogin' href='/login'>LOGIN</Button>
                <Button variant="outlined" className='buttonStyleS'>SIGNUP</Button>
                <Button variant="outlined" className='buttonStyleS'>CONTINUE AS GUEST</Button>
            </div>
                
            </div>
        </IonContent>
     </IonPage>
    )
}

export default Accesspage 
