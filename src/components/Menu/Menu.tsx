import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import './Menu.css';

type Props = {
    handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void
}

const Header: FC<Props> = ({handleLogout}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" >Booksapp</Typography>
                <Link to="/">
                    <Button color="inherit">Home</Button>
                </Link>                
                <Link to="/login">
                    <Button color="inherit">Login</Button>
                </Link>
                <Link to="/books">
                    <Button color="inherit">Books</Button>
                </Link>
                <Button color="inherit" onClick={handleLogout} >Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
