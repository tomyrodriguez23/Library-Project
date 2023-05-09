import React from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';

const ListMembersRow = ({ id, name, lastName, email, country, city, onDelete }) => {

    const navigate = useNavigate();

    const handleDelete = (memberId) => {
        Swal.fire({
            title: `Are you sure you want to delete?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(memberId);
                success();
            }
        });
    };

    const success = () => {
        Swal.fire({
            title: `Successfully Deleted`,
            text: `Confirm`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        });
    };

    return (
        <TableRow key={id}>
            <TableCell align="center">{id}</TableCell>
            <TableCell align="center">{name}</TableCell>
            <TableCell align="center">{lastName}</TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">{country}</TableCell>
            <TableCell align="center">{city}</TableCell>
            <TableCell align="center">
                <IconButton
                    size="large"
                    color="primary"
                    onClick={() => navigate(`/admin/members/update/${id}`)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    size="large"
                    color="error"
                    onClick={() => handleDelete(id)}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ListMembersRow;