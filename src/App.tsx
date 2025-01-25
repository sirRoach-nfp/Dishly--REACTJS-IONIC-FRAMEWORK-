import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Accesspage from './pages/AccessPage/Accesspage';
import Loginpage from './pages/LoginPage/Loginpage';
import Signuppage from './pages/SignupPage/Signuppage';
import Forgotpasspage from './pages/ForgotpasswordPage/Forgotpasspage';
import MainPage from './pages/Main/MainPage';
import Recipepage from './pages/RecipePage/Recipepage';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import MealTab from './tabs/MealPlanEditTab/Mealplantab';
import Expandedpage from './pages/ExpandedPage/Expandedpage';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact  path="/home">
          <Home />
        </Route>

        <Route exact path="/welcome">
          <Accesspage/>
        </Route>

        <Route exact path="/login">
          <Loginpage/>
        </Route>

        <Route exact path="/signup">
          <Signuppage/>
        </Route>

        
        <Route exact path="/forgotpass">
          <Forgotpasspage/>
        </Route>


        <Route exact path="/Recipe">
          <Recipepage/>
        </Route>

        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>

        <Route exact path= "/main">
          <MainPage/>
        </Route>

        <Route exact path={"/cart/editplan/:id"}>
          <MealTab/>
        </Route>
        <Route exact path="/viewAll" component={Expandedpage}/>



      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
