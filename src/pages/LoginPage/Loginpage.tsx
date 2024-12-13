import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton } from '@ionic/react';

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import './loginpage.scss'

const Loginpage: React.FC = () => {
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
                            <TextField id="input-with-sx" label="Username" variant="standard" />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="inputBox">
                            <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} className='icon' />
                            <TextField id="input-with-sx" label="Password" variant="standard" />
                        </Box>
                    </div>

                    <div className="buttonBox">
                        <Button variant="contained" className='buttonStyleLogin'>LOGIN</Button>
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