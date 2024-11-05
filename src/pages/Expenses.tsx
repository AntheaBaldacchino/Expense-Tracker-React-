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
    IonToolbar,
    IonAlert,
    IonBadge
        } from '@ionic/react';


import { useState } from "react";
import { useTheme} from '../App';



const Expenses: React.FC = () => {


    const {theme} = useTheme();


    const initialTodoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    
    const [todo, setTodo] = useState("");
    const [count, setCount] = useState(0);
    const [alert, setAlert] = useState<boolean>(false);

    const username =  localStorage.getItem('name');

    const [todoList, setTodoList] = useState<string[]>(initialTodoList);



    const handleCount = () => {
        const newCount = count + 1;
        localStorage.setItem('count' ,newCount.toString());
        setCount(newCount);
    }


    {/*Function that handles user's input */}
    const handleUserInput = (event : any) => {


        setTodo(event.target.value);


    }


    {/*Function that handles the alert */}
    const handleAlert = () => {


        if( todo === "") {
            setAlert(true);
            
        }
    }


    
    const handleDidDismissAlert = () => {
        setAlert(false);
    }



    const handleAddInput = () => {
        let temparray = todoList;


        if( todo === "") {
            setAlert(true);
            return;


        }else{
            temparray.push(todo);
            localStorage.setItem('todoList', JSON.stringify(temparray));
            setTodoList(temparray);
            setTodo("");
        }
            
           
    }


    const handleDelete = (indexToDelete: number) => {


        let tempArray = [];


        for(let i = 0; i < todoList.length; i++){


            if(i != indexToDelete){
                tempArray.push(todoList[i]);
            }
        }


        localStorage.setItem('todoList', JSON.stringify(tempArray));
        setTodoList(tempArray);
    }
/*     const handleDeleteDrag = (indexToDrag : number) => {
        let tempArray = [];
        for(let i = 0; i < todoList.length; i++){
            if(i != indexToDrag){
                tempArray.push(todoList[i]);
            }
        }
        localStorage.setItem('todoList', JSON.stringify(tempArray));
        setTodoList(tempArray);
    } */


    const renderTodoList = () => {


        const formattedArray = [];


        for (let i = 0 ; i < todoList.length; i++) {


             formattedArray.push(
             
                    <IonItemSliding key={i} /*onIonDrag={() => handleDeleteDrag(i)} */>


                        <IonItem  >
                            <IonLabel>{todoList[i]}</IonLabel>
                            <IonButton  color={'danger'} onClick={() => handleDelete(i)} >Delete</IonButton>
                        </IonItem>


                        <IonItemOptions side='end'  >
                            <IonLabel color={'danger'} position='stacked'>Swipe to Delete</IonLabel>
                        </IonItemOptions>


                    </IonItemSliding>
        
            );
        }
       return formattedArray;
    }





    return (
        <>
        <IonPage>
            <IonAlert
                isOpen={alert}
                onDidDismiss={handleDidDismissAlert}
                header="Error"
                message="You must enter an expense"
                buttons={['OK']}
            ></IonAlert>
            <IonHeader >
                <IonToolbar color={theme}
                >
                    
                    <IonTitle  class='ion-text-center'> Expense Tracker <IonBadge  color={'danger'}>{todoList.length}</IonBadge>
                    </IonTitle>
                    
                </IonToolbar>
            </IonHeader>


            <IonContent class='ion-padding'>
                <IonList>
                    {renderTodoList()}
                </IonList>
            </IonContent>

            <IonFooter class='ion-padding'>
                <IonList>
                    <IonItem>
                        <IonInput
                        
                        placeholder='Add new Expense'
                        onIonInput={handleUserInput}
                        value={todo}
                        >
                        </IonInput>
                    </IonItem>
                <hr />
                </IonList>
                <IonButton size='small' onClick= { handleAddInput} color={theme}>Add</IonButton>
                <hr />


                <IonText style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: ".8em"
                }}> Registered to: {username}
                </IonText>
            </IonFooter>


        </IonPage>
        
        </>
    )
}
export default Expenses;