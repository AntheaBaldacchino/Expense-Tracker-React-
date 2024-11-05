import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonInput,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonPage,
    IonText,
    IonTitle,
    IonToggle,
    IonToolbar
        } from '@ionic/react';

import { useState } from "react";
import { useTheme } from '../App';



const Preferences: React.FC = () => {
    
    const {theme, handleTheme} = useTheme();
    
    const [name, setName] = useState(localStorage.getItem('name') || '');
    
    const handleRegister = (updatedname: string) => {
        
        setName(updatedname);
        localStorage.setItem('name', updatedname);
      
    
    };


    const [toggle, setToggle] = useState<boolean>(() => {
        const storedToggleState = localStorage.getItem('toggleState');

        if(storedToggleState){
            return JSON.parse(storedToggleState)
        }
        else{
            return false;
            
        }
    });


    const handleToggle = () => {
        const newToggleState = !toggle;
        
        setToggle(newToggleState);
        localStorage.setItem('toggleState', JSON.stringify(newToggleState));
        handleTheme();
    };

    return (
        <>
        <IonPage>
            <IonHeader >
                <IonToolbar color={theme}
                >
                    <IonTitle
                        style={{fontStyle: 'bold'}}>
                        Preferences
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent class='ion-padding' >
                
                <IonList>
                    <IonItem>
                        <IonInput
                            value={name}
                            placeholder="Name"
                            
                            onIonChange={e => handleRegister(e.detail.value!)}
                            labelPlacement='stacked'
                            label='Registered to: '
                        >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonToggle checked={toggle} onIonChange={handleToggle} onClick={handleTheme} justify="space-between">Color Theme</IonToggle>
                    </IonItem>
                <hr />
                </IonList>

            </IonContent>

            <IonFooter >
            <IonText style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: ".8em"
                }} className='ion-text-center'
            >
                <p>Registered to: {name}</p>
            </IonText>
            </IonFooter>


        </IonPage>
        
        </>
    )
}
export default Preferences;