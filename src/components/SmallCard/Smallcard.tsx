import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,
    useIonRouter} from '@ionic/react';
import { useHistory,useParams } from 'react-router-dom';

import TimerIcon from '@mui/icons-material/Timer';
import StarRateIcon from '@mui/icons-material/StarRate';


import './smallcard.scss'



interface propStructure{

    id:string,
    cover:string,
    title:string,

}

interface cardProps{
    data:propStructure
}

const Smallcard: React.FC<cardProps> = ({data}) =>{
    
    //const navigate = useHistory()
    const router = useIonRouter()
    const handleNavigate = () => {
        router.push(`/Recipe/${data.id}`,'forward')
    }


  


    return(
        <div className="smallCardContainer" onClick={handleNavigate}>
            <div className="previewDivSC">
                <img src={data.cover} alt="" className="previewShotSC" />
            </div>
            <div className="reviewsDivSC">
                <StarRateIcon className='starReviewSC'/>
                <StarRateIcon className='starReviewSC'/>
                <StarRateIcon className='starReviewSC'/>
                <StarRateIcon className='starReviewSC'/>
                <StarRateIcon className='starReviewSC'/>
            </div>
            <div className="infoWrapperSC">
                <h4 className="recipeTagSC">{data.title}</h4>
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