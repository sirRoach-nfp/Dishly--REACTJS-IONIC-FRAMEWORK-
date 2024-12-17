
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';

import './hometab.scss'
import { flameOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

//custom components
import Cardslider from '../../components/CardSlider/Cardslider';
import Toppickcard from '../../components/TopPickCards/Toppickcard';
import Smallcard from '../../components/SmallCard/Smallcard';
import CloudOffTwoToneIcon from '@mui/icons-material/CloudOffTwoTone';
import WhatshotIcon from '@mui/icons-material/Whatshot';


import quickeasy from '../../AssetsImg/quickNeasy.svg'
import healthy from '../../AssetsImg/healthy.svg'
import sushi from '../../AssetsImg/sushi.svg'
import kwasong from '../../AssetsImg/kwasong.svg'
import breakfast from '../../AssetsImg/breakfast.svg'
import comfort from '../../AssetsImg/comfort.svg'

import bread from '../../AssetsImg/subcategories/bread.svg'
import grains from '../../AssetsImg/subcategories/grains.svg'
import pasta from '../../AssetsImg/subcategories/pasta.svg'
import poultry from '../../AssetsImg/subcategories/poultry.svg'
import redmeat from '../../AssetsImg/subcategories/redmeat.svg'
import seafood from '../../AssetsImg/subcategories/seafood.svg'
import soup from '../../AssetsImg/subcategories/soup.svg'
import vegetarian from '../../AssetsImg/subcategories/vegetarian.svg'
import sweet from '../../AssetsImg/subcategories/sweet.svg'
import { useEffect, useState } from 'react';
import { arrowForwardOutline } from 'ionicons/icons';


const Hometab: React.FC = () =>{


    const [present] = useIonToast()

    const [connectivity,setConnectivity] = useState<boolean>(navigator.onLine);


    const updateConnectivity = () => {
        const isOnline = navigator.onLine;
        setConnectivity(isOnline)



        present({
            message: isOnline ? 'You are online!' : 'You are offline',
            duration:2000,
            color: isOnline ? 'success' : 'warning',
        })
    }

    useEffect(()=> {
        window.addEventListener('online', updateConnectivity);
        window.addEventListener('offline', updateConnectivity);
    
        
    },[])

    return(
        <IonPage>

            <IonContent>







                {connectivity ? (

                     <div className="homeContainer">


                    
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            navigation
                        >
                            <SwiperSlide>
                                <Cardslider/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Cardslider/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Cardslider/>
                            </SwiperSlide>
                        </Swiper>
    
    
    
    
                        <div className="fireDiv">
                            <div className="headerDiv">
                                <div className="iconDiv">
                                    <WhatshotIcon className='fireIcon'/>
                                
                                </div>
                                <div className="textDiv">
                                    <h2 className="headerText">
                                        Top Picks For You
                                    </h2>
                                </div>
                            </div>
    
    
                            <div className="pickBox">
                                <Toppickcard/>
                                <Toppickcard/>
                                <Toppickcard/>
                            </div>
    
                        </div>


                        <div className="categoryPickerContainer">
                            <div className="headerDivPC">
                                <h3 className="headerTextPC">What's Cooking?</h3>
                            </div>
                            <div className="categoriesWrapper">
                                <div className="categoriesIconWrapper">
                                    <img src={pasta} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Pasta</span>
                                    
                                </div>
                                <div className="categoriesIconWrapper">
                                    <img src={poultry} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Poultry</span>
                                </div>
                                <div className="categoriesIconWrapper">
                                    <img src={redmeat} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Red Meat</span>
                                </div>
                                <div className="categoriesIconWrapper">
                                    <img src={seafood} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Seafood</span>
                                </div>
                                <div className="categoriesIconWrapper">
                                    <img src={soup} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Soup</span>
                                </div>
                                <div className="categoriesIconWrapper">
                                    <img src={bread} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Baked Goods</span>
                                </div>
                                <div className="categoriesIconWrapper">
                                    <img src={sweet} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Sweets</span>
                                </div>
                                <div className="categoriesIconWrapper">
                                    <img src={vegetarian} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Vegetarian</span>
                                </div>
                                <div className="categoriesIconWrapper">
                                    <img src={grains} alt="" className="categoryIcon" />
                                    <span className="categoryNamePC">Rice & Grains</span>
                                </div>
                            </div>
                        </div>
    
    
                        
                        <div className="subCategoryContainer">
                            <div className="headerDivSub">
                                <div className="iconDivSub">
                                    <img src={quickeasy} alt="" className="icon" />
                                </div>
                                <h3 className="headerSub">Quick and Easy!</h3>
                            </div>
    
    
                            <div className="cardWrappers">
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                            </div>


                            <div className="subCategoryButtonContainer">
                                <IonButton className='viewAllButton'> <IonIcon icon={arrowForwardOutline} slot='end'/>View All </IonButton>
                            </div>
                        </div>


                        <div className="subCategoryContainer">
                            <div className="headerDivSub">
                                <div className="iconDivSub">
                                    <img src={healthy} alt="" className="icon" />
                                </div>
                                <h3 className="headerSub">Healthy Choices</h3>
                            </div>
    
    
                            <div className="cardWrappers">
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                            </div>


                            <div className="subCategoryButtonContainer">
                                <IonButton className='viewAllButton'> <IonIcon icon={arrowForwardOutline} slot='end'/>View All </IonButton>
                            </div>
                        </div>


                        <div className="subCategoryContainer">
                            <div className="headerDivSub">
                                <div className="iconDivSub">
                                    <img src={sushi} alt="" className="icon" />
                                </div>
                                <h3 className="headerSub">Global Cuisines</h3>
                            </div>
    
    
                            <div className="cardWrappers">
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                            </div>


                            <div className="subCategoryButtonContainer">
                                <IonButton className='viewAllButton'> <IonIcon icon={arrowForwardOutline} slot='end'/>View All </IonButton>
                            </div>
                        </div>


                        <div className="subCategoryContainer">
                            <div className="headerDivSub">
                                <div className="iconDivSub">
                                    <img src={kwasong} alt="" className="icon" />
                                </div>
                                <h3 className="headerSub">Desserts and Sweets</h3>
                            </div>
    
    
                            <div className="cardWrappers">
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                            </div>


                            <div className="subCategoryButtonContainer">
                                <IonButton className='viewAllButton'> <IonIcon icon={arrowForwardOutline} slot='end'/>View All </IonButton>
                            </div>
                        </div>


                        <div className="subCategoryContainer">
                            <div className="headerDivSub">
                                <div className="iconDivSub">
                                    <img src={breakfast} alt="" className="icon" />
                                </div>
                                <h3 className="headerSub">Breakfast Ideas</h3>
                            </div>
    
    
                            <div className="cardWrappers">
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                            </div>


                            <div className="subCategoryButtonContainer">
                                <IonButton className='viewAllButton'> <IonIcon icon={arrowForwardOutline} slot='end'/>View All </IonButton>
                            </div>
                        </div>



                        <div className="subCategoryContainer">
                            <div className="headerDivSub">
                                <div className="iconDivSub">
                                    <img src={comfort} alt="" className="icon" />
                                </div>
                                <h3 className="headerSub">Comfort Foods</h3>
                            </div>
    
    
                            <div className="cardWrappers">
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                                <Smallcard/>
                            </div>


                            <div className="subCategoryButtonContainer">
                                <IonButton className='viewAllButton'> <IonIcon icon={arrowForwardOutline} slot='end'/>View All </IonButton>
                            </div>
                        </div>



 
                     
 
 
                    </div>

                ) : (
                    <div className="noInternetDiv">
                        <CloudOffTwoToneIcon className='noNetIcon'/>
                        <h4 className="noNetText">No Internet Connection</h4>
                    </div>
                )}

               




            </IonContent>

        </IonPage>
    )
}

export default Hometab;