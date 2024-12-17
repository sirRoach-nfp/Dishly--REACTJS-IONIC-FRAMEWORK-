import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';
import { starOutline } from 'ionicons/icons';
import './toppiccard.scss'

import StarRateIcon from '@mui/icons-material/StarRate';
const Toppickcard: React.FC = () =>{
    return(
 

        <div className="cardPickContainer">

            <div className="imgContainer">
                <img src="https://www.simplyrecipes.com/thmb/9bd4KXYQrjfncVmiu9YmxUCNgM4=/6240x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Spaghetti-Carbonara-LEAD-7-82d6bacf7f3848a4943b14712ab205ff.jpg" alt="" className="imgPrev" />
            </div>


            <div className="infoContainer">

                <div className="infoTextContainer">

                    <h4 className="titleRecipe">
                        Carbonara
                    </h4>
                    <span className="titleAuthor">
                        by: RealNinja
                    </span>

                </div>

                <div className="starsContainer">

                    <StarRateIcon className='starReview'/>
                    <StarRateIcon className='starReview'/>
                    <StarRateIcon className='starReview'/>
                    <StarRateIcon className='starReview'/>
                    <StarRateIcon className='starReview'/>
      
                </div>




            </div>

        </div>


    )
}

export default Toppickcard;