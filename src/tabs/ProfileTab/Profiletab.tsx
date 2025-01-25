
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,IonAvatar,useIonRouter} from '@ionic/react';
import VerySmallCard from '../../components/VerySmallCard/VerySmallCard';
import SavedRecipeCard from '../../components/SavedRecipeCard/SavedRecipeCard';
import './profiletab.scss'
import Avatar from '@mui/material/Avatar';
import { save, settingsOutline } from 'ionicons/icons';
import { keyOutline } from 'ionicons/icons';
import { trashBinOutline } from 'ionicons/icons';
import { logOutOutline } from 'ionicons/icons';

import { collection, doc, getDoc, getDocs, QuerySnapshot,getFirestore, updateDoc, arrayUnion  } from 'firebase/firestore';

import { db } from '../../firebaseConfig';


import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';



type saved = {
    recipeId : string,
    recipeName: string,
    recipeCover: string
}

type own = {
    recipeId : string,
    title : string,
    recipeCover : string,
}

type savedRecipeData = {
    savedData: saved []
}











const Profiletab: React.FC = () =>{
    const router = useIonRouter()

    const userDocId = localStorage.getItem("userDocId") as string
    const username = localStorage.getItem("username") as string
    const email = localStorage.getItem("")
    const [savedRecipes,setSavedRecipes] = useState<saved []> ([])
    const [ownRecipe,setOwnRecipe] = useState<own []> ([])

    function stringAvatar(name: string) {
        const nameParts = name?.split(' ') || [];
        const firstInitial = nameParts[0]?.[0] || '';
        const secondInitial = nameParts[1]?.[0] || '';
        return {
            children: `${firstInitial}${secondInitial}`,
        };
    }

    
    const handleLogout = async() => {

        const auth = getAuth()
        

        try{
            
            await signOut(auth)
            localStorage.clear();
            router.push("/login","forward","replace")

        }catch(err){

        }

        
    }


    useEffect(()=> {

        const fetchUserRecipeData = async() => {
            try{
                const recipeDataDocRef = doc(db,"users",userDocId)

                const userDoc =await getDoc(recipeDataDocRef)

                if(userDoc.exists()){
                    const savedRecipe = userDoc.data().savedRecipes
                    const ownRecipe = userDoc.data().yourRecipes
                    setOwnRecipe(ownRecipe)
                    setSavedRecipes(savedRecipe)
                   
                }

            }catch(err){}
        }

        fetchUserRecipeData()
    },[])




    const deleteMealPlan = async (id:string) => {
        try{
            const updatedSavedRecipe = savedRecipes.filter((save) => save.recipeId !== id);
            const docRef = doc(db,"users",userDocId)
            await updateDoc(docRef,{savedRecipes:updatedSavedRecipe})
            setSavedRecipes(updatedSavedRecipe)
            console.log("removed Success")
        }catch(err){
            console.error(err)
        }
    }



    const checkdatacontent = () => {
        console.log(savedRecipes)
    }


    return(
        <IonPage>

            <IonContent>

                <div className="profileContainer">

                    <div className="accountCardWrapper">
                        <div className="profileIconWrapper">
                            <Avatar className='avatar' {...stringAvatar(username)} />
                        </div>
                        <div className="profileInfoWrapper">
                            <h5 className="userTag">{username}</h5>
                            <span className="emailTag">@TEST</span>
                        </div>
                    </div>


                    <div className="ownRecipeWrapper">
                        <div className="ownRecipeHeader">
                            <h5 className="orwHeader">Your Recipes</h5>

                            <span className="viewAll">
                                View All &gt;
                            </span>
                        </div>
                        <div className="recipeItemsWrapper">
                            {ownRecipe.map((ownRes)=> {
                                return <VerySmallCard data={ownRes}/>
                            })}
             

                        </div>
                    </div>



                    <div className="savedRecipes">
                        <div className="savedRecipeHeader">
                            <h5 className="orwHeader">Your Saved Recipes</h5>

                            <span className="viewAll">
                                View All &gt;
                            </span>

                        </div>


                        <div className="savedItemsWrapper">


                            {savedRecipes.map((save)=> {
                                return <SavedRecipeCard data={save} onDelete={deleteMealPlan}/>
                            })}
                            
                    
          
                        </div>
                    </div>



                    <div className="accountManagementDiv">
                        <div className="accountManagementHeaderDiv">
                            <IonIcon icon={settingsOutline} className='settingIcon'/>
                            <h5 className="acHeader" onClick={checkdatacontent}>Account management</h5>
                        </div>

                        <div className="optionDiv">
                            <IonIcon className='optionIcon' icon={keyOutline}/>
                            <span className="optionTag">Change password</span>
                        </div>

                        <div className="optionDiv">
                            <IonIcon className='optionIcon' icon={trashBinOutline}/>
                            <span className="optionTag" style={{color: 'red'}}>Delete Account</span>
                        </div>

                        <div className="optionDiv">
                            <IonIcon className='optionIcon' icon={logOutOutline}/>
                            <span className="optionTag" onClick={handleLogout} >Logout</span>
                        </div>
                    </div>

                </div>

            </IonContent>

        </IonPage>
    )
}

export default Profiletab;