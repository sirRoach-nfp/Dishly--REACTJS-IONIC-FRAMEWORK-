import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton } from '@ionic/react';

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

const Signuppage: React.FC = () => {
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
                            <TextField id="input-with-sx" label="Username" variant="standard" />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                            <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon' />
                            <TextField id="input-with-sx" label="Email" variant="standard" />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                            <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon' />
                            <TextField id="input-with-sx" label="Password" variant="standard" />
                        </Box>
                    </div>

                    <div className="buttonBox">
                        <Button variant="contained" className='buttonStyleLogin'>SIGNUP</Button>
                    
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