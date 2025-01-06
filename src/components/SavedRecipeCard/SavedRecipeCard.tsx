
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';


import { closeCircleOutline } from 'ionicons/icons';
import './savedrecipecard.scss'


const SavedRecipeCard: React.FC = ()=> {

    return(

        <div className="srCardWrapper">


            <div className="srInfoWrapper">
                <h5 className="srRecipeName">Test</h5>
                <span className="srAuthorTag">author: test</span>
            </div>

            <div className="srDeleteWrapper">
                <IonButton className='srButton'><IonIcon className='srIcon' icon={closeCircleOutline}/></IonButton>
            </div>
        </div>

    )

}


export default SavedRecipeCard