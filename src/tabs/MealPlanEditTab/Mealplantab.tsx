import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,
    IonInput} from '@ionic/react';



import './mealplantab.scss'
import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc,updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import MealItem from '../../components/MealItem/MealItem';








interface MealItem{
    id:string;
    ingredient:string;
    quantity:string;
    checked:boolean;
}


interface MealPlan{
    id:string;
    title:string;
    items:MealItem[] | null;
    createdAt:String;
}







const MealTab: React.FC = () => {


    const userDocId = localStorage.getItem("userDocId") as string

    const {id} = useParams<{id:string}> ();
    const [present] = useIonToast()


    const [mealPlan,setMealPlan] = useState<MealPlan | null> (null)
    const [mealItems,setMealItems] = useState<MealItem[] | null> (null)
    const [mealTitle,setMealTitle] = useState("");



    useEffect(()=>{

        const fetchMealPlan = async () =>{

            const docRef = doc(db,"users",userDocId)
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                const data = docSnap.data().mealPlanner.find((meal:MealPlan) => meal.id == id);
                setMealPlan(data);
                setMealItems(data.items)
            }


        };

        fetchMealPlan();
        console.log("test")
        
     
    },[id]);



    const handleAddItem = () => {
        console.log("Old ", mealItems)
        setMealItems((prev)=>[
            ...(prev || []),
            {id:Date.now().toString(),ingredient:'',quantity:'',checked:false}
        ])
        updateMealPlanItems()
        console.log("New ",mealItems)
    }

    const handleDeleteItem =(id:string) => {
 
        setMealItems((prev) => (prev ? prev.filter((item) => item.id !== id) : prev));
        updateMealPlanItems()

    }

    const handleItemChange = (
        id: string,
        field: 'ingredient' | 'quantity',
        value: string,
        checked: boolean
    ) => {
        setMealItems((prev) =>
            prev ? prev.map((item) => 
                item.id === id ? { ...item, [field]: value, checked } : item
            ) : prev
        );
    };


    const updateMealPlanItems = () => {
        setMealPlan((prev) => (prev ? { ...prev, items: mealItems || [] } : null));
        console.log(mealPlan)
    };


    const handleTitleChange = (event: CustomEvent) => {
        const newTitle = event.detail.value;
        setMealPlan((prev) => (prev ? { ...prev, title: newTitle || "" } : null));
        
    };


    const synchronizeItems = () => {


    }

    const saveChanges = async () => {
        console.log(" before ", mealItems)
        updateMealPlanItems()
        console.log("updated items ",mealPlan)

        
        if (!mealPlan){
            console.error("Meal plan is null")
            return; 
        }

        const updatedMealPlan: MealPlan = {
            id: mealPlan.id || '',
            title: mealPlan.title || '',
            items: mealItems || [] , // Ensure mealItems is not null
            createdAt: mealPlan.createdAt|| new Date().toISOString()
        };

        setMealPlan(updatedMealPlan)









        const userDocRef = doc(db,'users',userDocId);
        const userDocSnap = await getDoc(userDocRef)


        if (userDocSnap.exists()){
            const userData = userDocSnap.data()

            if (!mealPlan) {
                console.error("Meal plan is null or undefined.");
                return; // Exit the function if mealPlan is null
            }


            const mealPlanner = userData.mealPlanner || [];
            const mealPlannerIndex = mealPlanner.findIndex(
                (meal:MealPlan) => meal.id === updatedMealPlan.id
            );


            if (mealPlannerIndex > -1){

                mealPlanner[mealPlannerIndex] = updatedMealPlan;


                await updateDoc(userDocRef,{updatedMealPlan})
                present({
                    message: 'Meal Plan is updated !',
                    duration: 1500,
                    position: "top",
                  
                    color:"success" 
                    });
            } else {
                console.error("Meal Plan not found")
            }
        }
            

        console.log(mealPlan)
    }

   

    return(

        <IonPage>


            <IonContent>


                <div className="mealContainer">
                    <div className="headerMC">
                        <h4 className="planName">Edit Meal Plan</h4>
                    </div>

                    <div className="namefieldDiv">
                        <span className="nametag">Meal Plan Name : </span>
                        <IonInput labelPlacement="floating" fill="solid" placeholder="Enter meal plan title..." clearInput={true} className='inputsChangeFontP' value={mealPlan?.title} onIonChange={(e) => handleTitleChange(e)}></IonInput>
                    </div>

                    <div className="itemsDivMC">


                        <div className="itemsDivEnumMC">

                            {mealItems && mealItems.length > 0 ? (
                                mealItems.map((item,index) => (
                                    <MealItem data={item} onDelete={handleDeleteItem} onChange={handleItemChange}/>
                                ))
                            ):(<p>No Items available</p>)}
             

                        </div>



                        

                    </div>

                    <div className="buttonsDiv">
                            <IonButton className='addItemButton' onClick={handleAddItem} > Add item  </IonButton>
                            <IonButton className='addItemButton'onClick={saveChanges} > Save changes </IonButton>

                        </div>
                </div>


            </IonContent>


        </IonPage>
    )


}


export default MealTab