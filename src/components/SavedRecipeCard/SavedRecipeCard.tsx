
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';


import { closeCircleOutline } from 'ionicons/icons';
import './savedrecipecard.scss'


interface propdata {
    recipeId: string,
    recipeName: string,
    recipeCover: string
}

interface props {
    data:propdata;
    onDelete: (id:string) => void
}


const SavedRecipeCard: React.FC<props> = ({data,onDelete})=> {

    return(

        <div className="srCardWrapper">

            <div className="coverWrapperSR">
                <img src={data.recipeCover}alt="" className="coverSR" />
            </div>


            <div className="srInfoWrapper">
                <h5 className="srRecipeName">{data.recipeName}</h5>
                <span className="srAuthorTag">author: test</span>
            </div>

            <div className="srDeleteWrapper">
                <IonButton className='srButton' onClick={()=>{onDelete(data.recipeId)}}><IonIcon className='srIcon' icon={closeCircleOutline}/></IonButton>
            </div>
        </div>

    )

}


export default SavedRecipeCard