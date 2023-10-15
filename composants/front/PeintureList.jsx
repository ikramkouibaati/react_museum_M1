import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from '../config';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, Button } from 'react-native';

const PeintureList = () => {
    const [oeuvres, setOeuvres] = useState([]);
    const navigation = useNavigation(); 

    useEffect(() => {
        const fetchOeuvres = async () => {
            const oeuvresCollection = collection(db, "oeuvres");
            const snapshot = await getDocs(oeuvresCollection);

            const oeuvresData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOeuvres(oeuvresData);
        }

        fetchOeuvres();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "oeuvres", id));
        setOeuvres(prevState => prevState.filter(oeuvre => oeuvre.id !== id));
    }

    const handleEdit = async (id, field, value) => {
        const oeuvreRef = doc(db, "oeuvres", id);
        await updateDoc(oeuvreRef, { [field]: value });
        setOeuvres(prevState => prevState.map(oeuvre => oeuvre.id === id ? { ...oeuvre, [field]: value } : oeuvre));
    }

    return (
        <View>
         
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {oeuvres.map(oeuvre => (
                    <Card key={oeuvre.id} style={{ margin: 8, width: '30%' }}>
                        <Card.Cover source={{ uri: oeuvre.image }}  />
                        <Card.Content>
                            <Title onPress={() => navigation.navigate('OeuvreDetail', { id: oeuvre.id })}>{oeuvre.nom}</Title>
                           
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </View>
    );
}

export default PeintureList;
