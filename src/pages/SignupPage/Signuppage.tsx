import { IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { closeCircleOutline } from 'ionicons/icons';

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import './signuppage.scss'
import { useState, SetStateAction } from 'react';


import { auth, db } from '../../firebaseConfig';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
const Signuppage: React.FC = () => {

    const [present] = useIonToast();

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")


    const usernameHandler = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUsername(event.target.value);
        console.log(username)
    }

    const emailHandler = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
        console.log(username)
    }


    const passwordHandler = (event:{target:{value: SetStateAction<string>;};}) =>{
        setPassword(event.target.value)
    }


    const handleSignup = async () => {
        try{


            const usernameQuery = query(
                collection(db,"users"),
                where("username","==",username)
            );

            const querysnapshot = await getDocs(usernameQuery)

            if(!querysnapshot.empty){
                present({
                    message: 'This username is already taken. Please choose another ',
                    duration: 2500,
                    position: "top",
                    icon: closeCircleOutline,
                    color:"danger" 
                    });

                    return;
            }


            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;


            await setDoc(doc(db,"users",user.uid),{
                username: username,
                email:user.email,
                createdAt: new Date()
            });

            await sendEmailVerification(user)



            present({
                message: 'Verification email sent! Please check your inbox ',
                duration: 5500,
                position: "top",
                icon: mailOutline,
                color:"success" 
                });

        }

        catch(err:any){
            setError(err.message);
            console.error("Error during signup: ", err)

            if (err.code === "auth/email-already-in-use") {
                present({
                    message: 'This email is already in use. Please try another ',
                    duration: 2500,
                    position: "top",
                    icon: closeCircleOutline,
                    color:"danger" 
                    });
            } else if (err.code === "auth/weak-password") {
                alert("The password is too weak. Please use a stronger password.");
            } else if (err.code === "auth/invalid-email") {
                present({
                    message: 'This email is invalid. Please enter a valid email ',
                    duration: 2500,
                    position: "top",
                    icon: closeCircleOutline,
                    color:"danger" 
                    });
            } else {
                alert("An error occurred during sign-up. Please try again.");
            }
        }
    }


    
    return (
        <IonPage>
            <IonContent>
                <div className="container">

                    <div className="headerBox">
                        <h2 className="header">
                            SIGNUP
                        </h2>
                        <span className="tag">
                            SIGNUP TO CONTINUE
                        </span>

                    </div>
            
                    <div className="fieldBox">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon'/>
                            <TextField id="input-with-sx" label="Username" variant="standard" value={username} onChange={usernameHandler}/>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                            <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon' />
                            <TextField id="input-with-sx" label="Email" variant="standard" value={email} onChange={emailHandler}/>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                            <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon' />
                            <TextField id="input-with-sx" label="Password" variant="standard" value={password} onChange={passwordHandler}/>
                        </Box>
                    </div>

                    <div className="buttonBox">
                        <Button variant="contained" className='buttonStyleLogin' onClick={handleSignup}>SIGNUP</Button>
                    
                    </div>
                    <div className="footerBox">
                        <span className="singup">ALREADY HAVE AN ACCOUNT ? <a href="/login">LOGIN</a></span>
                    </div>

                </div>


            </IonContent>
        </IonPage>
    );
};

export default Signuppage