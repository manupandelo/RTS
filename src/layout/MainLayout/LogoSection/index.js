import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase} from '@mui/material';

// project imports
import config from '../../../config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPDBPkFZcvA943wLGLN9upY8IWC3a-JUIzfQ&usqp=CAU" alt="logo" style={{ width: '30%', height: '30%' }} />
    </ButtonBase>
);

export default LogoSection;
