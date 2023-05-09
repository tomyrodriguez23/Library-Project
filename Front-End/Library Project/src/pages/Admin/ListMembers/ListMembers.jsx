import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import axios from "axios";
import { url } from "../../../utils.json"
import { useGlobalStates } from "../../../context/GlobalContext";
import HeaderLogged from "../../../components/Header/HeaderLogged";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ListMembersRow from "./ListMembersRow";

const ListMembers = () => {

    const [members, setMembers] = useState([])
    const { user, isLogged } = useGlobalStates()
    const navigate = useNavigate()

    useEffect(() => {
        getMembers()
    }, [])

    const getMembers = async () => {
        try {
            const response = await axios.get(`${url}/members`);
            setMembers(response.data)
        }
        catch (error) {
            console.log(error);
        }
    }


    const onDeleteMember = async (memberId) => {
        axios.delete(`${url}/members/${memberId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
            }
        })
            .then((response) => {
                setMembers(members?.filter((member) => member.id !== memberId));
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            {isLogged ? <HeaderLogged /> : <Header />}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Country</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members?.map((member) => 
                            <ListMembersRow 
                            key={member?.id} 
                            id={member?.id}
                            name={member?.name}
                            lastName={member?.lastName}
                            email={member?.email}
                            country={member?.address?.country}
                            city={member?.address?.city}
                            onDelete={onDeleteMember}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Footer />

        </div>
    );
};

export default ListMembers;