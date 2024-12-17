import { IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton } from '@ionic/react';
import { closeCircleOutline, mailOutline } from 'ionicons/icons';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import { SetStateAction, useState } from 'react';
//import { Auth } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

import './forgotpasspage.scss'


const Forgotpasspage: React.FC = () => {


    const [email,setEmail] = useState("");

    const [present] = useIonToast()

    const emailHandler = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
        
    }


    const handleReset = async () => {
        try{
            await sendPasswordResetEmail(auth,email)

            present({
                message: 'Password reset email sent! Please check your inbox ',
                duration: 5500,
                position: "top",
                icon: mailOutline,
                color:"success" 
                });
        }catch(error:any){
            
            if (error.code == "auth/invalid-email"){
                present({
                    message: 'This email is invalid. Please enter a valid email. ',
                    duration: 2500,
                    position: "top",
                    icon: closeCircleOutline,
                    color:"danger" 
                    });
            }
            else if(error.code == "auth/user-not-found"){
                present({
                    message: 'No user found with this email address. ',
                    duration: 2500,
                    position: "top",
                    icon: closeCircleOutline,
                    color:"danger" 
                    });
            }
            else if(error.code == "auth/missing-email"){
                present({
                    message: 'Email address is required',
                    duration: 2500,
                    position: "top",
                    icon: closeCircleOutline,
                    color:"danger" 
                    });
            }
            else{
                present({
                    message: 'An unknown error occured. Pleasae try again. ',
                    duration: 2500,
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
                    <div className="card">
                        <div className="tagBox">
                            <h2 className="header">FORGOT PASSWORD</h2>
                            <span className="tag">REMEMBER YOUR PASSWORD? <a href="/login">LOGIN HERE</a></span>
                        </div>
                        <div className="fieldBox">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                                <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon' />
                                <TextField id="input-with-sx" label="Email" variant="standard" onChange={emailHandler} value={email}/>
                            </Box>
                        </div>
                        <div className="buttonBox">
                             <Button variant="contained" className='buttonStyleLogin' onClick={handleReset}>RESET PASSWORD</Button>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )

}

export default Forgotpasspage