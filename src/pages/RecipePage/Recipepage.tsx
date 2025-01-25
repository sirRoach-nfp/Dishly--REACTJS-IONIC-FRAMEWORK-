import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,useIonRouter,useIonViewDidEnter,IonSegment, IonSegmentButton,IonToast } from '@ionic/react';

import { useLocation, useParams } from 'react-router';

import "./recipepage.scss"
import { useEffect, useState } from 'react';


import { collection, doc, getDoc, getDocs, QuerySnapshot,getFirestore, updateDoc, arrayUnion  } from 'firebase/firestore';

import { db } from '../../firebaseConfig';

import { bookmarkOutline, saveOutline } from 'ionicons/icons';

type Items = {
    id: string,
    name: string,
    quantity: string,
}


type RecipeData = {
    id: string,
    title: string,
    mainCategory: string,
    subCategory: string,
    description:string,
    items: Items [],
    recipeCover: string,
    procedure:string,
    author:string,

}

type saved = {
    recipeId : string,
    recipeName: string,
    recipeCover: string
}
type SaveRes = {
    savedData: saved 
}


const Recipepage: React.FC = () => {

    //const location = useLocation()
    //const state = location.state as {value:string}

    const [recipeData,setRecipeData] = useState<RecipeData | null>(null)
    const {id} = useParams<{id:string}>();
    const [saved,setSaved] = useState<boolean>(false)
    const [saveRes,setSaveRes] = useState<saved []>([])


    //overide methods
    const [present] = useIonToast()

    const userDocId = localStorage.getItem("userDocId") as string

    
    const saveRecipe = async () => {

        

        const newRecipe = {
            recipeId : recipeData?.id,
            recipeName : recipeData?.title,
            recipeCover : recipeData?.recipeCover

        }

        
        const userRef = doc(db,"users",localStorage.getItem("userDocId") as string)


        try{
            
            await updateDoc(userRef,{
                savedRecipes: arrayUnion(newRecipe)
            })
            
           console.log(newRecipe)
            console.log("Success added recipe to save ")
        }catch(err){console.error(err)}
    }


    


    const router = useIonRouter()



    
    const [option,setOption] = useState("description")





    const handleNavigate = () => {

        router.push('/main/home','back')
    }
    
    useEffect(()=>{
        
        const fetchData = async()=> {
            try{
                const recipeDocRef = doc(db,"recipes",id)
                const docSnap = await getDoc(recipeDocRef)



                if(docSnap.exists()){
                    console.log(docSnap.data())
                    const recipe = docSnap.data() as RecipeData
                    setRecipeData({
                        ...recipe,
                        id: docSnap.id
                    })


                    
                    const userDocRef = doc(db,"users",userDocId)

                    const userDoc = await getDoc(userDocRef)
                    console.log(userDocRef)
                    if(userDoc.exists()){
                        const saves = userDoc.data().savedRecipes;
                        setSaveRes(saves)
                        console.log("saves ", saves)
                        saves.map((save:saved)=>{
                            if(save.recipeId === id){
                                console.log("Existing in save")
                                setSaved(true)
                            }
                        })


                    }





                    console.log(recipeData)
                }
                else{
                    console.log("No document found with the given id ")
                }
            }catch(err){
                console.error(err)
            }
        }


        if(id){
            fetchData()
        }

    },[id])
    




    useEffect(() => {
        const handleBackButton = (e: Event) => {
          e.preventDefault(); // Prevent the default back button behavior
          handleNavigate();   // Navigate to your desired route
        };
    

        document.addEventListener('ionBackButton', handleBackButton);
    
        return () => {
        
          document.removeEventListener('ionBackButton', handleBackButton);
        };
      }, []);


    const handleSegmentChange = (event : CustomEvent) => {
        const value = event.detail.value

        setOption(value)
    }

    return(
        <IonPage>

            <IonContent>

                <IonButton onClick={handleNavigate}>Back</IonButton>
                
                <div className="recipePageContainer">

                    <div className="snapshotDivRP">
                        <img src={recipeData?.recipeCover} alt="" className="imgRP" />
                    </div>

                    <div className="infoWrapperRP">
                        <h4 className="nameTagRP">{recipeData?.title} </h4>
                        <span className="authorTagRP">{recipeData?.author}</span>
                    </div>


                    <IonSegment scrollable={false} value = {option} onIonChange={(e)=>handleSegmentChange(e)}>
                        <IonSegmentButton value="description" className='customSegmentButtonRP'>
                            <span className="timeprepsort">Description</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="ingredients" className='customSegmentButtonRP'>
                            <span className="timeprepsort">Ingredients</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="process" className='customSegmentButtonRP'>
                            <span className="timeprepsort">Process</span>   
                        </IonSegmentButton>

                    </IonSegment>




                    <div className="contentWrapperRP">
                        {option === "description" ? (
                            <p className="descriptionRP">
                            {recipeData?.description}
                            </p>
                        ) : option === "ingredients" ? (
                            <div className="itemsRP">
                            <table>
                                <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {recipeData?.items?.map((item, index) => (
                                    <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        ) : option === "process" ? (
                            <p className="procedureRP">
                            {recipeData?.procedure}
                            </p>
                        ) : (
                            <p>No data available</p> 
                        )
                        
                        }

                    </div>

                    <div className="prepDivRP">
                        <span className="prepTagRP">Total time : <span className="prepTagRPInner">30 Mins</span> </span>
                        <span className="prepTagRP">Serving size : <span className="prepTagRPInner">2 Person</span> </span>
                    </div>


                    <div className="saveButtonDivRP">
                        <div className={`saveIconWrapper ${saved ? 'saved animate' : ''}`} onClick={async ()=> {
                            if(!saved){
                                await saveRecipe()
                                setSaved(true)
                                present({
                                    message: 'Recipe Saved',
                                    duration: 2500,
                                    position: "top",
                                
                                    color:"success" 
                                    });
                                setTimeout(() => {
                                    document.querySelector('.saveIconWrapper')?.classList.remove('animate');
                                    }, 300); // Matches animation duration
                            }
                        }}>
                            <IonIcon className='saveIcon' icon={bookmarkOutline}/>
                        </div>
                    </div>





                </div>

            </IonContent>

        </IonPage>
    )
}


export default Recipepage;