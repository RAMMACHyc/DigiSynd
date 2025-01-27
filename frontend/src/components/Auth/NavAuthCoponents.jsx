import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { jwtDecode } from 'jwt-decode';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const location = useLocation();
 

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/auth');
    };

    useEffect(() => {
        try {
            const storedProfile = localStorage.getItem('profile');

            if (storedProfile) {
                const parsedProfile = JSON.parse(storedProfile);
                setUser((prevUser) =>
                    JSON.stringify(prevUser) !== JSON.stringify(parsedProfile) ? parsedProfile : prevUser
                );
            }
        } catch (error) {
            console.error('Error parsing profile:', error);
        }

        const UserToken = user?.token;
        if (UserToken) {
            const decodedToken = jwtDecode(UserToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
                // add rdirect to login page

            }
        }
    }, [location, user]);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar alt={user?.firstName} style={{ backgroundColor: "rgb(200 159 154)" }}>{user?.firstName.charAt(0)}</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
                        <Link to="/auth" style={{ textDecoration: 'none', color: 'gray' }}>
                            Login
                        </Link>
                    </Typography>
                </Box>
            )}

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Divider />
                {user && (
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                )}
            </Menu>
        </React.Fragment>
    );
}
