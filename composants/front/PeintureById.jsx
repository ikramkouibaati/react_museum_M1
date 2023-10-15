import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';
import { getDoc, updateDoc, deleteDoc } from 'firebase/firestore'; 
import { doc } from 'firebase/firestore'; 
import db from '../config';

const PeintureById = ({ route }) => {
  const { id } = route.params;
  const [oeuvre, setOeuvre] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [auteur, setAuteur] = useState("");
  const [dateCreation, setDateCreation] = useState("");


  useEffect(() => {
    const fetchOeuvreById = async () => {
      try {
        const docRef = doc(db, 'oeuvres', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setOeuvre({ id: docSnap.id, ...data });
          setNom(data.nom || "");
          setDescription(data.description || "");
          setAuteur(data.auteur || "");
          setDateCreation(data.dateCreation || "");
        } else {
          console.log('Aucun document trouvé !');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'oeuvre :', error);
      }
    };

    fetchOeuvreById();
  }, [id]);

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'oeuvres', id);
      await updateDoc(docRef, {
        nom: nom,
        description: description,
        auteur: auteur,
        dateCreation: dateCreation,
      });
      setEditMode(false); 
      console.log('Données mises à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données :', error);
    }
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, 'oeuvres', id);
      await deleteDoc(docRef);
      console.log('Oeuvre supprimée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'oeuvre :', error);
    }
  };

  if (!oeuvre) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: oeuvre.image }} />
      </View>
      <View style={styles.infoContainer}>
        <Card>
          <Card.Content>
            {editMode ? (
              <>
                <Title>
                  <TextInput
                    value={nom}
                    onChangeText={setNom}
                    style={styles.input}
                    placeholder="Nom de l'oeuvre"
                  />
                </Title>
                <Paragraph>
                  <TextInput
                    value={auteur}
                    onChangeText={setAuteur}
                    style={styles.input}
                    placeholder="auteur de de l'oeuvre"
                  />
                </Paragraph>
                <Paragraph>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                    placeholder="Description de l'oeuvre"
                  />
                </Paragraph>
                <Paragraph>
                  <TextInput
                    value={dateCreation}
                    onChangeText={setDateCreation}
                    style={styles.input}
                    placeholder="Date de création de l'oeuvre"
                  />
                </Paragraph>
                <Button onPress={handleSave}>Enregistrer</Button>
              </>
            ) : (
              <>
                <Title>{nom}</Title>
                <Paragraph>{auteur}</Paragraph>
                <Paragraph>{description}</Paragraph>
                <Paragraph>{dateCreation}</Paragraph>
                <Button onPress={() => setEditMode(true)}>Editer</Button>
              </>
            )}
            <Button onPress={handleDelete}>Supprimer</Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default PeintureById;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
