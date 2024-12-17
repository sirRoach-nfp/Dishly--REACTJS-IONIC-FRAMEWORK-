
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';

import './cardslider.scss'
const Cardslider: React.FC = () =>{
    return(
 

        <div className="cardSliderContainer">

            <img src="https://www.simplyrecipes.com/thmb/9bd4KXYQrjfncVmiu9YmxUCNgM4=/6240x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Spaghetti-Carbonara-LEAD-7-82d6bacf7f3848a4943b14712ab205ff.jpg" alt="" className="imgOverlay" />

            <div className="darkOverlay">

            </div>

            <div className="infoWrapper">

                <h3 className="dishName">Carbonara</h3>
                <span className="author">By: RealNinja</span>
                <IonButton className='readButton'>Read</IonButton>
            </div>

        </div>


    )
}

export default Cardslider;