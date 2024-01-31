import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import {
    useRecoilValue, useSetRecoilState,
  } from 'recoil';
import { userstate } from "../atoms/atom";

function Signup() {
    const setUser=useSetRecoilState(userstate);
    const navigate = useNavigate()
    const[name,setName]=useState("");
    const[pass,setPass]=useState("");
    return (
        <div style={{
            backgroundImage: "url('https://img.freepik.com/free-photo/modern-background-with-white-round-lines_23-2148811507.jpg?w=1380&t=st=1706698117~exp=1706698717~hmac=38d159510de0c8a0d6ee72485c743207ac5427ba52374aefbd37623deade3152')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh"}}>
            <div>
                <Topbar></Topbar>
            </div>
            <div style={{ display: "flex", justifyContent: "center" ,paddingTop:"200px"}}>
            <Card style={{ width: "400px",borderRadius:"20px"}}>
                <div style={{padding:"20px"}}>
                    <div style={{padding:"3px"}}>
                        <TextField fullWidth={true} id="standard-basic" label="Username" variant="standard" onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                        <TextField fullWidth={true} id="standard-basic" label="Password" variant="standard" onChange={(e) => {
                        setPass(e.target.value);
                    }}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between", padding:"10px",paddingTop:"50px"}}>
                        <Button variant="contained" style={{borderRadius:"22px"}} color="success"  onClick={async() => {
                        const response = await axios.post(`http://localhost:3000/admin/signup`, {
                            username: name,
                            password: pass
                        })
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        setUser(name);
                        navigate("/admin/home")
                        }}>
                            Signup
                        </Button>
                        <Button size="large" onClick={()=>{
                            alert("Don't be a smart ass, Just signup");
                        }}>404</Button>
                    </div>
                </div>
            </Card>
        </div>
        </div>
    );
}

function Topbar(){
    const navigate = useNavigate()
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
export default Signup;