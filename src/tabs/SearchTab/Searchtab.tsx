
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,IonSearchbar} from '@ionic/react';


import Smallcard from '../../components/SmallCard/Smallcard';


import quickeasy from '../../AssetsImg/quickNeasy.svg'
import healthy from '../../AssetsImg/healthy.svg'
import sushi from '../../AssetsImg/sushi.svg'
import kwasong from '../../AssetsImg/kwasong.svg'
import breakfast from '../../AssetsImg/breakfast.svg'
import comfort from '../../AssetsImg/comfort.svg'
    
import { searchCircle } from 'ionicons/icons';
import './searchtab.scss'
const Searchtab: React.FC = () =>{
    return(
        <IonPage>

            <IonContent>

                <div className="searchContainer">
                    <div className="searchWrapper">
                        <IonSearchbar showClearButton="always" value="Always Show"></IonSearchbar>
                    </div>

                    <div className="categoryWrapper">


                        <div className="iconWrapper">
                            <img src={quickeasy} alt="" className="catIcon" />
                            <span className="categoryNameS">
                                Quick And Easy
                            </span>

                        </div>

                        <div className="iconWrapper">
                            <img src={healthy} alt="" className="catIcon" />
                            <span className="categoryNameS">
                                Healthy Choice
                            </span>
                        </div>

                        <div className="iconWrapper">
                            <img src={sushi} alt="" className="catIcon" />
                            <span className="categoryNameS">
                                Global Cuisine
                            </span>
                            
                        </div>
                        
                        <div className="iconWrapper">
                            <img src={kwasong} alt="" className="catIcon" />
                            <span className="categoryNameS">
                                Desserts
                            </span>
                            
                        </div>


                        <div className="iconWrapper">
                            <img src={breakfast} alt="" className="catIcon" />
                            <span className="categoryNameS">
                                Breakfast Ideas
                            </span>
                        </div>

                        <div className="iconWrapper">
                            <img src={comfort} alt="" className="catIcon" />
                            <span className="categoryNameS">
                                Comfort Foods
                            </span>
                            
                        </div>
                    </div>


                    <div className="likeWrapper">

                        <div className="likeHeaderWrapper">
                            <h3 className="likeHeader">You may Like...</h3>
                        </div>

                        <div className="resultsWrapperS">
                            <Smallcard/>
                            <Smallcard/>
                            <Smallcard/>
                            <Smallcard/>
                            <Smallcard/>
                            <Smallcard/>
                        </div>

                    </div>



                </div>

            </IonContent>

        </IonPage>
    )
}

export default Searchtab;