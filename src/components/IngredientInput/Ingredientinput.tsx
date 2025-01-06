interface IngredientInputProps {
    id: number;
    name: string;
    quantity: string;
    onDelete: (id: number) => void;
    onChange: (id: number, field: 'name' | 'quantity', value: string) => void;
  }
import {   IonTabs,IonTabBar,
IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
IonRouterOutlet,
IonIcon,
IonInput} from '@ionic/react';

import { trashOutline } from 'ionicons/icons';

import './ingredientinput.scss'
const IngredientInput: React.FC<IngredientInputProps> = ({ id, name, quantity, onDelete, onChange }) => {
return (
    <div className="ingredientInputContainer">
    
        <input
            type="text"
            placeholder="Ingredient Name"
            value={name}
            onChange={(e) => onChange(id, 'name', e.target.value)}
            className="ingredientInputField"
        />
        <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => onChange(id, 'quantity', e.target.value)}
            className="quantityInputField"
        />

    
        <IonButton className='deleteButton' onClick={()=> onDelete(id)}><IonIcon icon={trashOutline}/> </IonButton>


    </div>
);
};



export default IngredientInput