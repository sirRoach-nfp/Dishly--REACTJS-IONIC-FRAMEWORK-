import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,useIonRouter,useIonViewDidEnter,IonList,IonItem,IonSelect,IonSelectOption,IonSegment, IonSegmentButton } from '@ionic/react';

import './expandedpage.scss'
import { arrowBackOutline } from 'ionicons/icons';
import { useState,useEffect } from 'react';


//firebase 

import { collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Smallcard from '../../components/SmallCard/Smallcard';




type Recipe = {
    id: string,
    title: string,
    cover: string,
    prepTime: string,
}


const Expandedpage: React.FC = () =>{


    const [preptime,setPrep] = useState("")
    const [recipes,setRecipes] = useState<Recipe[]>([])
    const [allRecipes,setAllRecipes] = useState<Recipe[]>([])
    const router = useIonRouter()

    const handleBack = () => {
        router.push('/main/home','back')
    }


    const handleSegmentChange = (event:CustomEvent) => {
        const value = event.detail.value
        setPrep(value)
        console.log(value)
    }
    

    useEffect(()=>{

        const fetchRecipe = async(mainCategory:string) => {

            try{
                const recipeRef = collection(db,"recipes")
                const q = query(recipeRef,where("mainCategory","==",mainCategory))
                const querySnapshot = await getDocs(q)

                const fetchRecipes = 
                    querySnapshot.docs.map((doc)=>{
                        const data = doc.data();
                        return{
                            id : doc.id,
                            title : data.title,
                            cover : data.recipeCover,
                            prepTime : data.prep
                        }
                    })

                setAllRecipes(fetchRecipes)
                setRecipes(fetchRecipes)
                
            }catch(err){
                console.error(err)
            }
        }

        fetchRecipe("ComfortFoods")
    },[])


    useEffect(()=>{
        if (preptime === "all") {
            setRecipes(allRecipes);
        } else if (preptime.startsWith("<")) {
            const maxTime = parseInt(preptime.replace(/[^\d]/g, ""), 10);
            setRecipes(allRecipes.filter(recipe => parseInt(recipe.prepTime, 10) < maxTime));
        } else if (preptime.startsWith(">")) {
            const minTime = parseInt(preptime.replace(/[^\d]/g, ""), 10);
            setRecipes(allRecipes.filter(recipe => parseInt(recipe.prepTime, 10) > minTime));
        } else {
            const exactTime = parseInt(preptime.replace(/[^\d]/g, ""), 10);
            setRecipes(allRecipes.filter(recipe => parseInt(recipe.prepTime, 10) === exactTime));
        }
    },[preptime,allRecipes])

    return(

        <IonPage>
            <IonContent>


                <div className="containerEP">
                    <div className="headerDivEP">
                        <IonIcon icon={arrowBackOutline} className='backButton' onClick={handleBack}/>

                        <span className="categoryTagEP">Quick And Easy</span>
                    </div>
                    <IonSegment scrollable={true} value={preptime} onIonChange={(e)=> handleSegmentChange(e)}>
                        <IonSegmentButton value="all">
                            <span className="timeprepsort">All</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="< 10 minutes">
                            <span className="timeprepsort">&lt;10 minutes</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="15 minutes">
                            <span className="timeprepsort">15 minutes</span>   
                        </IonSegmentButton>
                        <IonSegmentButton value="20 minutes">
                            <span className="timeprepsort">20 minutes</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="25 minutes">
                            <span className="timeprepsort">25 minutes</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="30 minutes">
                            <span className="timeprepsort">30 minutes</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="35 minutes">
                            <span className="timeprepsort">35 minutes</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="45 minutes">
                            <span className="timeprepsort">45 minutes</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="50 minutes">
                            <span className="timeprepsort">50 minutes</span>
                        </IonSegmentButton>
                        <IonSegmentButton value="> 50 minutes">
                            <span className="timeprepsort">  &gt; 50 minutes</span>
                        </IonSegmentButton>
                    </IonSegment>



                    <div className="itemWrappersEP">
                        {recipes.map((recipe)=>{
                            return <Smallcard data={recipe}/>
                        })}
                    </div>
                </div>



            </IonContent>
        </IonPage>



    )
}


export default Expandedpage