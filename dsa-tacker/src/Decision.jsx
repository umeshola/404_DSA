import React from 'react';
import { Button } from "@mui/material";
import {  useNavigate } from 'react-router-dom';

function Decision() {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/admin/home');
    };

    const handleUserClick = () => {
        navigate('/user/home');
    };

    return (
        <div style={{
            backgroundImage: "url('https://img.freepik.com/free-photo/modern-background-with-white-round-lines_23-2148811507.jpg?w=1380&t=st=1706698117~exp=1706698717~hmac=38d159510de0c8a0d6ee72485c743207ac5427ba52374aefbd37623deade3152')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh"}}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2 style={{ fontSize: "75px" }}>404 DSA Cracker!</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ fontSize: "25px" }}>Choose your path:</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button  variant="contained" onClick={handleUserClick} style={{marginRight:"5px"}}>User Side</Button>
                <Button  variant="contained" onClick={handleAdminClick}>Admin Side</Button>
            </div>
        </div>
    );
}

export default Decision;
