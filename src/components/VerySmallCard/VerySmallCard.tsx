import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';



import './verysmallcard.scss'
import { createOutline } from 'ionicons/icons';



interface propStructure{
    recipeId:string,
    recipeCover:string,
    title:string,
}

interface prop{
    data: propStructure
}

const VerySmallCard: React.FC<prop> = ({data}) => {
    return(

        <div className="verySmallCardWrapper">
            <div className="imageWrapperVSC">
                <img src={data.recipeCover} alt="" className="recipesnapshotvsc" />
            </div>
            <div className="itemInformationWrapper">
                <h4 className="recipenametag">
                    {data.title}
                </h4>
            </div>

        </div>

    )
}



export default VerySmallCard