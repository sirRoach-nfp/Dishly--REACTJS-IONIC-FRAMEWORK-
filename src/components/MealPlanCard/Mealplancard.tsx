

interface MealItem{
    ingredient:string;
    quantity:string;
    checked:boolean;
}


interface MealPlan{
    id:string;
    title:string;
    items:MealItem[];
    createdAt:String;
}
interface MealplancardProps {
    data: MealPlan;
    onDelete: (id: string) => void;
    
}


import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';

import { trashOutline } from 'ionicons/icons';
import { createOutline } from 'ionicons/icons';
import './mealplan.scss'


const Mealplancard: React.FC<MealplancardProps> = ({data,onDelete}) =>{
    return(
        <div className="mealCardWrapper">


            <div className="titleDivMC">
                <h5 className="title">
                    {data.title}
                </h5>

                <span className="dateTag">
                    12-20-2024
                </span>
            </div>

            <div className="iconDivMC">
                <IonButton className='editButtonMC' href={`/cart/editplan/${data.id}`}> <IonIcon icon={createOutline}/></IonButton>
                <IonButton className='deleteButtonMC' onClick={()=> onDelete(data.id)}><IonIcon icon={trashOutline}/></IonButton>
            </div>



        </div>
    )
}


export default  Mealplancard