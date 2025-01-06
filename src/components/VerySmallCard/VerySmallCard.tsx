import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';



import './verysmallcard.scss'
import { createOutline } from 'ionicons/icons';


const VerySmallCard: React.FC = () => {
    return(

        <div className="verySmallCardWrapper">
            <div className="imageWrapperVSC">
                <img src="" alt="" className="recipesnapshotvsc" />
            </div>
            <div className="itemInformationWrapper">
                <h4 className="recipenametag">
                    Home made madafaka sht fuck fuck
                </h4>
            </div>

        </div>

    )
}



export default VerySmallCard