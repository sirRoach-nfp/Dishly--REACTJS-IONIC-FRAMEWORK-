import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,useIonRouter} from '@ionic/react';


import './mainpag.scss';
import { IonReactRouter } from '@ionic/react-router';
import { home,addCircleOutline,cartOutline,searchOutline,personOutline } from 'ionicons/icons';

//components

import Hometab from '../../tabs/HomeTab/Hometab'
import Posttab from '../../tabs/PostTab/Posttab';
import Carttab from '../../tabs/CartTab/Carttab';
import Searchtab from '../../tabs/SearchTab/Searchtab';
import Profiletab from '../../tabs/ProfileTab/Profiletab';
import Recipepage from '../RecipePage/Recipepage';
import Loginpage from '../LoginPage/Loginpage';
import Expandedpage from '../ExpandedPage/Expandedpage';
import MealTab from '../../tabs/MealPlanEditTab/Mealplantab';
import { Redirect, Route, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';



const MainPage: React.FC = () =>{

    const location = useLocation()
    const router = useIonRouter()

    useEffect(() => {
        console.log(`Page mounted: ${location.pathname}`);
        return () => {
          console.log(`Page unmounted: ${location.pathname}`);
        };
      }, [location.pathname]);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userDocId,setUserDocId] = useState<string | null>()
    // Check if the user is logged in
    useEffect(() => {
        const pulledID = localStorage.getItem("userDocId")
      
        if (pulledID) {
            setUserDocId(pulledID)
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            console.log("Redirected")
           
        }
    }, []);

    // If not logged in, redirect to login

    /*
    if (!isLoggedIn) {
        console.log("Redirected")
        return <Redirect to="/login" />;
      
    }
        */

    /*
    if(!isLoggedIn){
   
        return <Redirect to="/welcome" />;
    }
    */

    return(
        
        <IonPage className='mainContainer '>
            <Route exact path="/login" component={Loginpage} />

            <IonReactRouter>


                
                <IonRouterOutlet>
                    <Route exact path="/login" component={Loginpage} />
                    <Route exact path="/Recipe/:id" component={Recipepage} />
                    <Route exact path="/viewAll/:category" component={Expandedpage}/>


                    
                    <Route path="/main">



                        <IonTabs>
                            <IonRouterOutlet key={location.key}>
                                <Route exact path="/main/home" render={() => <Hometab key={location.pathname} />}/>
                                <Route exact path="/main/post" component={Posttab} />
                                <Route exact path="/main/cart" component={Carttab} />
                                <Route exact path="/main/search" component={Searchtab} />
                                <Route exact path="/main/profile" component={Profiletab} />
                            </IonRouterOutlet>

                            <IonTabBar slot="bottom" className="mainTabBar" style={{ '--ion-background-color': '#fff5f5' }}>
                            <IonTabButton tab="home" href="/main/home">
                                <IonIcon icon={home} />
                            </IonTabButton>
                            <IonTabButton tab="post" href="/main/post">
                                <IonIcon icon={addCircleOutline} />
                            </IonTabButton>
                            <IonTabButton tab="cart" href="/main/cart">
                                <IonIcon icon={cartOutline} />
                            </IonTabButton>
                            <IonTabButton tab="search" href="/main/search">
                                <IonIcon icon={searchOutline} />
                            </IonTabButton>
                            <IonTabButton tab="profile" href="/main/profile">
                                <IonIcon icon={personOutline} />
                            </IonTabButton>
                            </IonTabBar>
                        </IonTabs>
                    </Route>

                    {/* Redirects */}
                    <Redirect exact from="/" to="/login" />
                </IonRouterOutlet>
            </IonReactRouter>


        </IonPage>
    )
}


export default MainPage;