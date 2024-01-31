import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userstate } from '../atoms/atom';
import { totala,totaladv,totalg,totall,totalt } from '../atoms/total';
function Add() {
    const [type, setType] = useState("");
    const [title, setT] = useState("");
    const [lk, setL] = useState("");
    return (
        <div style={{
            backgroundImage: "url('https://img.freepik.com/free-photo/modern-background-with-white-round-lines_23-2148811507.jpg?w=1380&t=st=1706698117~exp=1706698717~hmac=38d159510de0c8a0d6ee72485c743207ac5427ba52374aefbd37623deade3152')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh"}}>
            <div>
                <Topbar></Topbar>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 style={{ fontSize: "65px" }}>404 DSA Cracker</h1>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "100px",
                paddingRight: "100px",
            }}>
                <Link to="/admin/home" style={{ textDecoration: "none", color: "blue", transition: "text-decoration 0.3s" }}
                    onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                    onMouseLeave={(e) => e.target.style.textDecoration = "none"}>
                    <h2 style={{ fontSize: "35px", fontWeight: "lighter" }}>Topics</h2>
                </Link>
                <h2 style={{ fontSize: "35px", fontWeight: "lighter" }}>/Add</h2>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ width: "350px", borderRadius: "22px", padding: "7px",backgroundColor:"lemonchiffon" }}>
                    <div>
                        <TextField fullWidth={true} id="standard-basic" label="type" variant="standard" onChange={(e) => {
                            setType(e.target.value);
                        }} />
                    </div>
                    <div>
                        <TextField fullWidth={true} id="standard-basic" label="Title" variant="standard" onChange={(e) => {
                            setT(e.target.value);
                        }} />
                    </div>
                    <div>
                        <TextField fullWidth={true} id="standard-basic" label="Link" variant="standard" onChange={(e) => {
                            setL(e.target.value);
                        }} />
                    </div>
                    <div style={{ paddingTop: "7px" }}>
                        <Button variant="contained" style={{ fontWeight: "bold", fontFamily: "monospace" }} onClick={async () => {
                            try {
                                const response = await axios.post(
                                    `http://localhost:3000/admin/add/${type}`,
                                    {
                                        title,
                                        link: lk,
                                        state: false,
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem('token')}`
                                        }
                                    }
                                );
                            } catch (error) {
                                console.error('Error adding data:', error);
                            }
                        }}>Add</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

function Topbar(){
    const navigate = useNavigate()
    const name=useRecoilValue(userstate);
    const setUser = useSetRecoilState(userstate);
    if(name){
        return(
            <div style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                <div style={{fontSize:"30px",fontWeight:"bold"}}>404</div>
                <div style={{fontSize:"30px",fontWeight:"lighter"}}>aDmin</div>
                <div style={{display:"flex"}}>
                <h1 style={{fontSize:"17px",marginRight:"5px"}}>{name}</h1>
                <Button variant="contained" style={{borderRadius:"22px",fontWeight:"bold"}} onClick={()=>{
                     localStorage.setItem("token",null);
                     setUser(null);
                     navigate("/");
                }}>Logout</Button>
                </div>
            </div>
        );
    }
    else{
        return(
            <div style={{display:"flex",justifyContent:"space-between",padding:"5px"}}>
                <div style={{fontSize:"30px",fontWeight:"bold"}}>404</div>
                <div style={{fontSize:"30px",fontWeight:"lighter"}}>aDmin</div>
                <div>
                <Button variant="contained" style={{borderRadius:"22px",fontWeight:"bold"}} onClick={()=>{
                     navigate("/admin/Signup")
                }}>Signup</Button>
                </div>
            </div>
        );
    }
}
export default Add;