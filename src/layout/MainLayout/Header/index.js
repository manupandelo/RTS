import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Button } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';

// assets
import { IconMenu2, IconLogout } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        window.location.href = '/';
    };


    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.grey[300],
                            color: theme.palette.error.dark,
                            '&:hover': {
                                background: theme.palette.error.dark,
                                color: theme.palette.grey[300]
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="error"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Box sx = {{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.grey[300],
                            color: theme.palette.error.dark,
                            '&:hover': {
                                background: theme.palette.error.dark,
                                color: theme.palette.grey[300]
                            }
                        }}
                        onClick={handleLogout}
                        color="error"
                    >
                        <IconLogout stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
