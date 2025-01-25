import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton,useIonToast } from '@ionic/react';
import { globe } from 'ionicons/icons';
import { closeCircleOutline } from 'ionicons/icons';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useIonRouter } from '@ionic/react';

import { SetStateAction, useState } from 'react';
import './loginpage.scss'



import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

const Loginpage: React.FC = () => {

    const router = useIonRouter();


    const [present] = useIonToast();

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")


    const usernameHandler = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUsername(event.target.value);
        console.log(username)
    }

    const passwordHandler = (event:{target:{value: SetStateAction<string>;};}) =>{
        setPassword(event.target.value)
    }


    const emailHandler = (event:{target:{value: SetStateAction<string>;};}) =>{
        setEmail(event.target.value)
    }


    const handleLogin = async () => {
        
        try{
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            console.log("Logged in user:", userCredential.user)






            const userId = userCredential.user.uid;
            //const username = userCredential.use
            console.log(userId)







            const userdocRef = doc(db,"users",userId)

            const userDocSnap = await getDoc(userdocRef)
            console.log("doc snap ", userDocSnap.data())
            
            

            if(userDocSnap.exists()) {

                const userData = userDocSnap.data()

         
                const username = userData?.username;
                localStorage.setItem("userDocId", userId);
                localStorage.setItem("username", username);
                router.push("/main");
    



            }
            else{
                console.error("No user found with this UID. ");
            }
                
            
        }
        catch(error: any){
            console.error("Error during login: ", error.message)
            setError(error.message)
           

            if (error.code == "auth/invalid-credential"){
                console.log("Account don't exist")
                present({
                    message: 'Account dont exist ',
                    duration: 1500,
                    position: "top",
                    icon: closeCircleOutline,
                    color:"danger" 
                  });
            }

            if (error.code == "auth/invalid-email"){
                console.log("Account don't exist")
                present({
                    message: 'The email format is invalid please try again',
                    duration: 1500,
                    position: "top",
                    icon: closeCircleOutline,
                    color:"danger" 
                  });
            }
        }
    }



    return (
        <IonPage>
            <IonContent>
                <div className="container">

                    <div className="headerBox">
                        <h2 className="header">
                            LOGIN
                        </h2>

                    </div>
            
                    <div className="fieldBox">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon'/>
                            <TextField id="input-with-sx" label="Email" variant="standard" onChange={emailHandler} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                            <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon' />
                            <TextField id="input-with-sx" label="Password" variant="standard" onChange={passwordHandler}/>
                        </Box>
                    </div>

                    <div className="buttonBox">
                        <Button variant="contained" className='buttonStyleLogin' onClick={handleLogin}>LOGIN</Button>
                        <span className="forgotPass"><a href="/forgotpass">FORGOT PASSWORD?</a></span>
                    </div>
                    <div className="footerBox">
                        <span className="singup">NOT A MEMBER ? <a href="/signup">SIGNUP</a></span>
                    </div>

                </div>


            </IonContent>
        </IonPage>
    );
};

export default Loginpage