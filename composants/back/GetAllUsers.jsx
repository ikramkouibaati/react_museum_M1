import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from '../config';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'react-router-dom';
import './GetAllUsers.css'; 
import { Button as PaperButton } from 'react-native-paper';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation(); 


    useEffect(() => {
        const fetchOeuvres = async () => {
            const oeuvresCollection = collection(db, "users");
            const snapshot = await getDocs(oeuvresCollection);

            const oeuvresData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(oeuvresData);
        }

        fetchOeuvres();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "users", id));
        setUsers(prevState => prevState.filter(oeuvre => oeuvre.id !== id));
    }

    const handleEdit = async (id, field, value) => {
        const oeuvreRef = doc(db, "users", id);
        await updateDoc(oeuvreRef, { [field]: value });
        setUsers(prevState => prevState.map(oeuvre => oeuvre.id === id ? { ...oeuvre, [field]: value } : oeuvre));
    }

    return (
        <div className="art-exhibition"> 
              <PaperButton
                mode="contained"
                onPress={() => navigation.navigate('PostUsers')}
                style={{ marginBottom: 10 }}
                className="button"
            >
                Ajouter un nouveau User
            </PaperButton>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(oeuvre => (
                        <tr key={oeuvre.id}>
                            <td>{oeuvre.id}</td>
                            <td contentEditable onBlur={(e) => handleEdit(oeuvre.id, 'email', e.target.textContent)}>{oeuvre.email}</td>
                            <td contentEditable onBlur={(e) => handleEdit(oeuvre.id, 'role', e.target.textContent)}>{oeuvre.role}</td>
                            <td><button onClick={() => handleDelete(oeuvre.id)}>Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetAllUsers;
