import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,
    IonInput,IonCheckbox} from '@ionic/react';



    
import { trashOutline } from 'ionicons/icons';

import './mealitem.scss'

interface MealItemStruct{
    id:string;
    ingredient:string;
    quantity:string;
    checked:boolean;
}




interface MealItemProp{
    data: MealItemStruct,
    onDelete: (id:string) => void;
    onChange: (id:string, field:'ingredient'|'quantity',value:string,checked:boolean) => void;
}

const MealItem: React.FC<MealItemProp> = ({data,onDelete,onChange})=>{




    return(


        <div className="mealItemWrapper">

            <input type="text" className="nameInputField" value={data.ingredient} onChange={(e)=> onChange(data.id,'ingredient',e.target.value,true)}/>

            <input type="text" className="quantityInputField" value={data.quantity} onChange={(e)=> onChange(data.id,'quantity',e.target.value,true)} />


            <div className="checkBoxMIDIV">
                 <IonCheckbox className='checkboxMIDIV' checked={data.checked}
                    onIonChange={(e) => onChange(data.id, 'ingredient', data.ingredient, e.detail.checked!)}/>
            </div>
           

            <IonButton className='deleteButtonMI' onClick={()=> onDelete(data.id)}><IonIcon icon={trashOutline}/></IonButton>

        </div>



    )
}


export default MealItem