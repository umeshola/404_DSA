import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
  } from 'recoil';
import { totall,totala,totalg,totalt, totaladv } from '../atoms/total';
import { userstate } from "../atoms/atom";
import { useEffect, useState } from 'react';

function Home() {
    const navigate = useNavigate()

    const handleStartClick = () => {
        window.open('https://www.codingninjas.com/studio/problem-lists/register/45-day-coding-challenge?utm_source=website&utm_medium=affiliate&utm_campaign=codestudio_45daycodingchallenge_450dsa', '_blank');
    };

    const array=useSetRecoilState(totala);
    const arrayvalue=useRecoilValue(totala);

    const ll=useSetRecoilState(totall);
    const llvalue=useRecoilValue(totall);

    const adv=useSetRecoilState(totaladv);
    const advvalue=useRecoilValue(totaladv);

    const tree=useSetRecoilState(totalt);
    const treevalue=useRecoilValue(totalt);

    const graph=useSetRecoilState(totalg);
    const graphvalue=useRecoilValue(totalg);

   const init = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/array/total`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            array(response.data.numberOfDocuments);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const init2 = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/tree/total`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            tree(response.data.numberOfDocuments);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const init3 = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/graph/total`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            graph(response.data.numberOfDocuments);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const init4 = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/adv/total`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            adv(response.data.numberOfDocuments);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const init5 = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/ll/total`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            ll(response.data.numberOfDocuments);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        init();
        init2();
        init3();
        init4();
        init5();
    }, []);
    return (
        <div style={{
            backgroundImage: "url('https://img.freepik.com/free-photo/modern-background-with-white-round-lines_23-2148811507.jpg?w=1380&t=st=1706698117~exp=1706698717~hmac=38d159510de0c8a0d6ee72485c743207ac5427ba52374aefbd37623deade3152')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh"}}>
            <div>
                <Topbar/>
            </div>
            <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <h1 style={{ paddingLeft: "40px",fontSize:"75px" }}>404 DSA Cracker</h1>
                        <h2 style={{fontSize:"40px",paddingLeft:"40px"}}>Your Gateway to crack DSA 🔥</h2>
                        <h3 style={{ paddingLeft: "240px",fontSize:"25px"}}>Start Solving</h3>
                    </div>
                </div>
                <div style={{ paddingLeft: "200px", paddingRight: "200px", paddingTop: "50px" }}>
                    <Card style={{ display: "flex", justifyContent: "space-around", padding: "10px", borderRadius: "30px" ,backgroundColor:"lightgoldenrodyellow"}}>
                        <div style={{ color: "blue", fontWeight: "bold", fontSize:"22px"}}>
                            Code your way to the top and win big in the 45 day coding Challenge by CodeStudio!
                        </div>
                        <Button variant="contained" color="success" style={{ borderRadius: "25px",fontWeight:"bold",fontFamily:"monospace" }} onClick={handleStartClick}>Start</Button>
                    </Card>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",padding:"22px"}}>
            <Button variant="outlined" color="error" style={{fontSize:"15px",fontWeight:"bold"}} onClick={()=>{
                navigate("/admin/add")
            }}>Add Question</Button>
            </div>
            <div style={{ paddingLeft: "100px", paddingRight: "100px", paddingTop: "50px" ,display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                <Card style={{ width: "400px", borderRadius: "25px",margin:"10px",backgroundColor:"lightblue"}}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ paddingLeft: "15px" }}>
                            <h1>Array</h1>
                            <h3>Total question {arrayvalue}</h3>
                        </div>
                        <div style={{ paddingTop: "50px", paddingRight: "10px" }}>
                            <Button variant="contained" style={{borderRadius:"17px",fontWeight:"bold",fontFamily:"monospace"}} onClick={()=>{
                                let type="array"
                                navigate("/admin/Data/"+type);
                            }}>Start</Button>
                        </div>
                    </div>

                </Card>
                <Card style={{ width: "400px", borderRadius: "25px",margin:"10px" ,backgroundColor:"lightsteelblue"}}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ paddingLeft: "15px" }}>
                            <h1>LinkList</h1>
                            <h3>Total question {llvalue}</h3>
                        </div>
                        <div style={{ paddingTop: "50px", paddingRight: "10px" }}>
                            <Button variant="contained" style={{borderRadius:"17px",fontWeight:"bold",fontFamily:"monospace"}} onClick={()=>{
                                let type="ll"
                                navigate("/admin/Data/"+type);
                            }}>Start</Button>
                        </div>
                    </div>

                </Card>
                <Card style={{ width: "400px", borderRadius: "25px" ,margin:"10px",backgroundColor:"lavender"}}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ paddingLeft: "15px" }}>
                            <h1>Tree</h1>
                            <h3>Total question {treevalue}</h3>
                        </div>
                        <div style={{ paddingTop: "50px", paddingRight: "10px" }}>
                            <Button variant="contained" style={{borderRadius:"17px",fontWeight:"bold",fontFamily:"monospace"}} onClick={()=>{
                                let type="tree"
                                navigate("/admin/Data/"+type);
                            }}>Start</Button>
                        </div>
                    </div>

                </Card>
                <Card style={{ width: "400px", borderRadius: "25px" ,margin:"10px",backgroundColor:"rebeccapurple"}}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ paddingLeft: "15px" }}>
                            <h1>Graph</h1>
                            <h3>Total question {graphvalue}</h3>
                        </div>
                        <div style={{ paddingTop: "50px", paddingRight: "10px" }}>
                            <Button variant="contained" style={{borderRadius:"17px",fontWeight:"bold",fontFamily:"monospace"}} onClick={()=>{
                                let type="graph"
                                navigate("/admin/Data/"+type);
                            }}>Start</Button>
                        </div>
                    </div>

                </Card>
                <Card style={{ width: "400px", borderRadius: "25px",margin:"10px",backgroundColor:"powderblue" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ paddingLeft: "15px" }}>
                            <h1>Adv</h1>
                            <h3>Total question {advvalue}</h3>
                        </div>
                        <div style={{ paddingTop: "50px", paddingRight: "10px" }}>
                            <Button variant="contained" style={{borderRadius:"17px",fontWeight:"bold",fontFamily:"monospace"}} onClick={()=>{
                                let type="adv"
                                navigate("/admin/Data/"+type);
                            }}>Start</Button>
                        </div>
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

export default Home;



