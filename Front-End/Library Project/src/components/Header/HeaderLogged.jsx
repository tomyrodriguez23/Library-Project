import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { useNavigate } from 'react-router-dom';
import { useGlobalStates } from '../../context/GlobalContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';



function HeaderLogged() {

    const pages = ['Categories', 'Books'];

    const { user, logout } = useGlobalStates()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navigatePage = (page) => {
        navigate(`/${page}`)
    }

    const handleUserMenuClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorElUser(null);
    };

    const handleMyAccountClick = () => {
        navigate('/account');
        handleUserMenuClose();
    };

    const handleAddCategoryClick = () => {
        navigate('/admin/category');
        handleUserMenuClose();
    };

    const handleAddBookClick = () => {
        navigate('/admin/book');
        handleUserMenuClose();
    };

    const handleListMembersClick = () => {
        navigate('/admin/members');
        handleUserMenuClose();
    };

    const handleMyOrdersClick = () => {
        navigate('/orders');
        handleUserMenuClose();
    };

    const logoutClick = () => {
        logout()
        navigate('/')
    }

    const handleAdmin = () => {
        navigate('/admin/category')
    }

    const navigateHome = () => {
        navigate('/')
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <AutoStoriesOutlinedIcon sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', cursor: 'pointer', '&:hover': { color: '#d7d7d7' } }, mr: 1 }} />
                    {/* ICONO BIG */}

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', sm: 'flex', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': { color: '#d7d7d7' }
                        }}
                        onClick={navigateHome}
                    >
                        Library
                    </Typography>
                    {/* Library BIG */}

                    <Box sx={{ flexGrow: 1, alignItems: "center", display: { xs: 'flex', sm: 'none', md: 'none' } }}>

                        {/* BOX SMALL */}

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => {
                                    handleCloseNavMenu();
                                    navigatePage(page);
                                }} >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <AutoStoriesOutlinedIcon onClick={() => navigate('/')} sx={{ mr: 1 }} />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => { handleCloseNavMenu(); navigatePage(page); }}
                                sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: '#d7d7d7' } }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Grid sx={{ display: 'flex', alignItems: 'center' }}>

                            {
                                user?.roles.map((rol) => (
                                    rol.name === "ROLE_ADMIN" || rol.name === "ROLE_MOD" ?
                                        <Box key={rol.id} sx={{ mr: 1 }}>

                                            <IconButton key={rol.id} color="inherit" onClick={handleUserMenuClick}>
                                                <AdminPanelSettingsIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleUserMenuClose}
                                            >
                                                <MenuItem onClick={handleAddCategoryClick}>Add Category</MenuItem>
                                                <MenuItem onClick={handleAddBookClick}>Add Book</MenuItem>
                                                <MenuItem onClick={handleListMembersClick}>List Members</MenuItem>
                                            </Menu>
                                            

                                        </Box>

                                        :
                                        
                                        <Box key={rol.id} sx={{ mr: 1 }}>

                                            <IconButton
                                                onClick={handleUserMenuClick}
                                                color="inherit"
                                            >
                                                <AccountCircleIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleUserMenuClose}
                                            >
                                                <MenuItem onClick={handleMyAccountClick}>Account</MenuItem>
                                                <MenuItem onClick={handleMyOrdersClick}>Orders</MenuItem>
                                            </Menu>
                                        </Box>

                                ))
                            }

                            <IconButton
                                color="inherit"
                                onClick={logoutClick}
                            >
                                <LogoutIcon />
                            </IconButton>
                        </Grid>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default HeaderLogged;