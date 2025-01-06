
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,IonAvatar,useIonRouter} from '@ionic/react';
import VerySmallCard from '../../components/VerySmallCard/VerySmallCard';
import SavedRecipeCard from '../../components/SavedRecipeCard/SavedRecipeCard';
import './profiletab.scss'
import Avatar from '@mui/material/Avatar';
import { settingsOutline } from 'ionicons/icons';
import { keyOutline } from 'ionicons/icons';
import { trashBinOutline } from 'ionicons/icons';
import { logOutOutline } from 'ionicons/icons';


import { getAuth, signOut } from "firebase/auth";
const Profiletab: React.FC = () =>{
    const router = useIonRouter()

    const userDocId = localStorage.getItem("userDocId") as string
    const username = localStorage.getItem("username") as string
    const email = localStorage.getItem("")



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

    return(
        <IonPage>

            <IonContent>

                <div className="profileContainer">

                    <div className="accountCardWrapper">
                        <div className="profileIconWrapper">
                            <Avatar className='avatar' {...stringAvatar(username)}/>
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
                            <VerySmallCard/>
                            <VerySmallCard/>
                            <VerySmallCard/>
                            <VerySmallCard/>
                            <VerySmallCard/>
                            <VerySmallCard/>

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
                            <SavedRecipeCard/>
                            <SavedRecipeCard/>
                            <SavedRecipeCard/>
                            <SavedRecipeCard/>
                            <SavedRecipeCard/>
                        </div>
                    </div>



                    <div className="accountManagementDiv">
                        <div className="accountManagementHeaderDiv">
                            <IonIcon icon={settingsOutline} className='settingIcon'/>
                            <h5 className="acHeader">Account management</h5>
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