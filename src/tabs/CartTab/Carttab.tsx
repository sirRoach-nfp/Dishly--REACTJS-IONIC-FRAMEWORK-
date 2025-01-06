
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';


import { addCircleOutline } from 'ionicons/icons';
import DummyData from '../../DummyData/userData.json'
import Mealplancard from '../../components/MealPlanCard/Mealplancard';


import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig'; 
import { useEffect, useState } from 'react';

import './carttab.scss'






interface MealItem{
    id:string,
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
const Carttab: React.FC = () =>{


    const [mealPlanner,setMealPlanner] = useState<MealPlan[]>([])
    const userDocId = localStorage.getItem("userDocId") as string




    useEffect(()=>{

        const fetchMealPlanner = async () => {
            try{
                const docRef = doc(db,'users',userDocId);
                const docSnap = await getDoc(docRef);



                if(docSnap.exists()){
                    const userData = docSnap.data();
                    setMealPlanner(userData.mealPlanner || [])
                }

                else {
                    console.log("No such Document!")
                }
            }
            catch(error){
                console.error("Error fetching meal planner",error)
            }
        };

        fetchMealPlanner();
        console.log(mealPlanner)
        console.log(mealPlanner)

    },[])




    const addMealPlan = async () =>{

        const newMealPlan = {
            id: Date.now().toString(),
            items:[],
            title:"New Meal Plan",
            createdAt:new Date().toISOString(),
        };



        try{
            const docRef = doc(db,"users",userDocId);
            const updatedMealPlanner = [...mealPlanner,newMealPlan];
            await updateDoc(docRef,{mealPlanner: updatedMealPlanner});
            setMealPlanner(updatedMealPlanner);
        }

        catch(error){
            console.error("Cant add new meal plan ",error)
        }
    }


    const deleteMealPLan = async (id:string) => {
        try{
            const updatedMealPlanner = mealPlanner.filter((meal)=> meal.id !== id);
            const docRef =doc(db,"users",userDocId);
            await updateDoc(docRef,{mealPlanner:updatedMealPlanner})
            setMealPlanner(updatedMealPlanner)
        }catch(error){
            console.error("Error deleting meal plan:",error)
        }
    };


 

    return(


       

        <IonPage>

            <IonContent>

                <div className="cartContainer">



                    <div className="headerDivCC">
                        <h4 className="headerCC">
                            Your Meal Plans
                        </h4>
                    </div>

                    <div className="mealplansDiv">

                        {mealPlanner.map((meal)=>(
                            <Mealplancard data={meal} onDelete={deleteMealPLan} />
                        ))}


                    </div>

                    <IonButton className='addMealPlan' onClick={addMealPlan}> <IonIcon icon={addCircleOutline} slot='end'/>Add New Meal Plan </IonButton>


                </div>

            </IonContent>

        </IonPage>
    )
}

export default Carttab;