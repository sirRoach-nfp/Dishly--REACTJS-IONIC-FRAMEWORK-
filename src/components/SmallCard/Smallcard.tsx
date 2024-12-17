import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon} from '@ionic/react';


import TimerIcon from '@mui/icons-material/Timer';
import StarRateIcon from '@mui/icons-material/StarRate';


import './smallcard.scss'

const Smallcard: React.FC = () =>{
    return(
        <div className="smallCardContainer">
            <div className="previewDivSC">
                <img src="https://bakingamoment.com/wp-content/uploads/2019/02/IMG_2757-croissant-recipe-easy.jpg" alt="" className="previewShotSC" />
            </div>
            <div className="reviewsDivSC">
                <StarRateIcon className='starReviewSC'/>
                <StarRateIcon className='starReviewSC'/>
                <StarRateIcon className='starReviewSC'/>
                <StarRateIcon className='starReviewSC'/>
                <StarRateIcon className='starReviewSC'/>
            </div>
            <div className="infoWrapperSC">
                <h4 className="recipeTagSC">croissantssssssssssssssssssssssssssssssssssssssss</h4>
                <span className="authorTagSC">by: RealNinja</span>
            </div>
            <div className="preptimeDivSC">
                <TimerIcon className='timerIconSC'/>
                <span className="preptimeSC">~10 minutes</span>
            </div>
        </div>
    )
}


export default Smallcard