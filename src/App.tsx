import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { card, settings } from "ionicons/icons";

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
import { useState } from 'react';
import Expenses from './pages/Expenses';
import Preferences from './pages/Preferences';

setupIonicReact();

export const useTheme = () => {
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  // Function to toggle theme
  const handleTheme = () => {
    let newTheme;
    if (theme === 'light'){
      newTheme = 'dark';
    }
    else{
      newTheme = 'light';
    }
    localStorage.setItem('theme', newTheme); 
    setTheme(newTheme);
  };
  return {theme, handleTheme};
};


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
       {/* Menu Tab Bar */}
        <IonTabs>
          <IonTabBar slot='bottom'>


            <IonTabButton tab='Expenses' href='/Expenses'>
              <IonIcon icon={card}></IonIcon>
              <IonLabel>Expenses</IonLabel>
            </IonTabButton>


            <IonTabButton tab='Preferences' href='/Preferences'>
              <IonIcon icon={settings}></IonIcon>
              <IonLabel>Preferences</IonLabel>
            </IonTabButton>


          </IonTabBar>


      <IonRouterOutlet>


        <Route exact path="/expenses">
          <Expenses />
        </Route>


        <Route exact path="/preferences">
          <Preferences />
        </Route>


        <Route exact path="/">
          <Redirect to="/expenses" />
        </Route>


      </IonRouterOutlet>
    </IonTabs>
    </IonReactRouter>
  </IonApp>
);


export default App;