import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';


import './mainpag.scss';
import { IonReactRouter } from '@ionic/react-router';
import { home,addCircleOutline,cartOutline,searchOutline,personOutline } from 'ionicons/icons';

//components

import Hometab from '../../tabs/HomeTab/Hometab'
import Posttab from '../../tabs/PostTab/Posttab';
import Carttab from '../../tabs/CartTab/Carttab';
import Searchtab from '../../tabs/SearchTab/Searchtab';
import Profiletab from '../../tabs/ProfileTab/Profiletab';
import { Redirect, Route } from 'react-router';



const MainPage: React.FC = () =>{
    return(
        
        <IonPage className='mainContainer'>
            

            <IonReactRouter>

                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/main/home" component={Hometab}/>
                        <Redirect exact from='/main' to='/home'/>

                        <Route exact path="/main/post" component={Posttab}/>
                        <Route exact path={"/main/cart"} component={Carttab}/>
                        <Route exact path={"/main/search"} component={Searchtab}/>
                        <Route exact path={"/main/profile"} component = {Profiletab}/>
                    </IonRouterOutlet>




                    <IonTabBar slot='bottom' className='mainTabBar' style={{ '--ion-background-color': '#fff5f5' }}>

                        <IonTabButton tab="home" href='/main/home'>
                            <IonIcon icon={home}/>
                        </IonTabButton>

                        <IonTabButton tab="post" href='/main/post'>
                            <IonIcon icon={addCircleOutline}/>
                        </IonTabButton>

                        <IonTabButton tab="cart" href='/main/cart'>
                            <IonIcon icon={cartOutline}/>
                        </IonTabButton>

                        <IonTabButton tab="search" href='/main/search'>
                            <IonIcon icon={searchOutline}/>
                        </IonTabButton>

                        <IonTabButton tab="profile" href='/main/profile'>
                            <IonIcon icon={personOutline}/>
                        </IonTabButton>

                    </IonTabBar>


                </IonTabs>


            </IonReactRouter>


        </IonPage>
    )
}


export default MainPage;