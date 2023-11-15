class UpdateViewCourse extends Observer {
  constructor(view) {
    super();
    this.view = view;
  }

  update(observable) {
    // Mettre à jour la vue en utilisant les données
    this.view.updateCourseList(observable.getData());
  }
}

class Controler {

  constructor(model){

      this.view = new View();
      this.model = model;

      // update
      const updateViewCourse = new UpdateViewCourse(this.view);
      this.model.addObservers(updateViewCourse);
      //  action
      //Add
      this.view.addButton.addEventListener('click', () => {
        this.AddButtonClick();
      });
 
}

   // Gérer l'événement de clic sur le bouton "Ajouter"
  // Dans votre méthode AddButtonClick
// AddButtonClick() {
//   const nom = this.view.nameInput.value;
//   const lieu = this.view.locationInput.value;
//   const date = this.view.dateInput.value;
//   const time = this.view.timeInput.value;
//   console.log(nom)

//   if (nom.trim() !== '' && lieu.trim() !== '' && date.trim() !== '' && time.trim() !== '') {
//     const courseData = {
//       nom,
//       lieu,
//       date,
//       heure: time,
//     };
//     this.model.addCourse(courseData);

//     // Ajoutez un gestionnaire d'événements "Modifier" au nouveau cours
//     this.addModifyEventListeners(courseData.id);
//     this.addSaveEventListeners(courseData.id)
//     this.addDeleteEventListeners(courseData.id)


//     // Effacez les champs d'entrée
//     this.view.nameInput.value = '';
//     this.view.locationInput.value = '';
//     this.view.dateInput.value = '';
//     this.view.timeInput.value = '';
//   }
// }

AddButtonClick() {
  const nom = this.view.nameInput.value;
  const lieu = this.view.locationInput.value;
  const date = this.view.dateInput.value;
  const time = this.view.timeInput.value;
  const preferences = this.view.preferencesInput.value; // Récupérer la valeur de préférences
  const genre = this.view.genreInput.value; // Récupérer la valeur de genre
  const niveau = this.view.niveauInput.value; // Récupérer la valeur de niveau

  if (
    nom.trim() !== '' &&
    lieu.trim() !== '' &&
    date.trim() !== '' &&
    time.trim() !== '' &&
    preferences.trim() !== '' && // Vérifier si les valeurs ne sont pas vides
    genre.trim() !== '' &&
    niveau.trim() !== ''
  ) {
    const courseData = {
      nom,
      lieu,
      date,
      heure: time,
      preferences,
      genre,
      niveau,
    };

    this.model.addCourse(courseData);

    // Ajouter les gestionnaires d'événements "Modifier", "Enregistrer" et "Supprimer" pour le nouveau cours
    this.addModifyEventListeners(courseData.id);
    this.addSaveEventListeners(courseData.id);
    this.addDeleteEventListeners(courseData.id);

    // Effacer les champs d'entrée
    this.view.nameInput.value = '';
    this.view.locationInput.value = '';
    this.view.dateInput.value = '';
    this.view.timeInput.value = '';
    this.view.preferencesInput.value = ''; // Effacer la valeur de préférences
    this.view.genreInput.value = ''; // Effacer la valeur de genre
    this.view.niveauInput.value = ''; // Effacer la valeur de niveau
  }
}

// Méthode pour gérer les événements "Modifier"
addModifyEventListeners(courseId) {
  // Trouvez le bouton "Modifier" pour le cours spécifique en fonction de l'ID du cours
  const modifyButton = this.view.getModifyButton(courseId);
  console.log(modifyButton)

  if (modifyButton) {
    // Ajoutez un gestionnaire d'événements pour le bouton "Modifier"
    modifyButton.addEventListener('click', () => {
      console.log(courseId)
      this.handleModifyClick(courseId);
      
    });
  }
}
//Méthode pour gérer les événements "Save"
addSaveEventListeners(courseId) {
  // Trouvez le bouton "Modifier" pour le cours spécifique en fonction de l'ID du cours
  const saveButton = this.view.getSaveButton(courseId);
  console.log(saveButton)


  if (saveButton) {
    // Ajoutez un gestionnaire d'événements pour le bouton "Modifier"
    saveButton.addEventListener('click', () => {
      console.log(courseId)
      this.handleSaveClick(courseId);
      
    });
  }
}

//Méthode pour gérer les événements "Delete"
addDeleteEventListeners(courseId) {
  // Trouvez le bouton "Modifier" pour le cours spécifique en fonction de l'ID du cours
  const deleteButton = this.view.getDeleteButton(courseId);
  console.log(deleteButton)


  if (deleteButton) {
    // Ajoutez un gestionnaire d'événements pour le bouton "Modifier"
    deleteButton.addEventListener('click', () => {
      console.log(courseId)
      this.handleDeleteClick(courseId);
    });
  }
}

// Méthode pour gérer l'événement "Modifier"
handleModifyClick(courseId) {
  this.view.enableEditFields(courseId);
  // Récupérez le bouton "Enregistrer" correspondant au cours actuel
  const saveButton = this.view.getSaveButton(courseId);
  if (saveButton) {
   // saveButton.classList.remove('invisible'); // Retirez la classe "invisible" pour afficher le bouton "Enregistrer"
  }
  // // Cachez le bouton "Modifier" si nécessaire
  // const modifyButton = this.view.getModifyButton(courseId);
  // if (modifyButton) {
  // }
}



// Méthode pour gérer l'événement "Enregistrer"
handleSaveClick(courseId) {
  this.view.disableEditFields(courseId);
  this.view.toggleEditSaveButtons(courseId);
  // Obtenez les données éditées et mettez à jour le modèle si nécessaire
  //const editedData = this.view.getEditedData(courseId);
  // Mettez à jour le modèle ici
}
// Dans votre contrôleur
handleDeleteClick(courseId) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
    // Demandez une confirmation à l'utilisateur (vous pouvez utiliser une boîte de dialogue ou une autre méthode)
    
    // Supprimez le cours du modèle
    this.model.deleteCourse(courseId);

    // Supprimez visuellement le cours de la vue (vous devrez ajouter cette fonction à votre vue)
    this.view.removeCourse(courseId);
  }
}
}