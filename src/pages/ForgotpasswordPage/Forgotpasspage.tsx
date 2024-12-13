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

import './forgotpasspage.scss'


const Forgotpasspage: React.FC = () => {

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
                                <TextField id="input-with-sx" label="Email" variant="standard" />
                            </Box>
                        </div>
                        <div className="buttonBox">
                             <Button variant="contained" className='buttonStyleLogin'>RESET PASSWORD</Button>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )

}

export default Forgotpasspage