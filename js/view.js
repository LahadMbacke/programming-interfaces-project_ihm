class View {
 
  constructor() {
    this.div = document.createElement('div');
    this.div.className = 'container';
  
    const formHTML = `
    <h1>Mes Courses</h1>
    <div class="input-container">
        <div class="row">
            <div class="col-md-4">
                <input type="text" placeholder="Nom du cours" class="form-control">
            </div>
            <div class="col-md-4">
                <input type="text" placeholder="Lieu" class="form-control">
            </div>
            <div class="col-md-4">
                <input type="text" placeholder="Date" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <input type="text" placeholder="Heure" class="form-control">
            </div>
            <div class="col-md-4">
                <input type="text" placeholder="Préférences (Forêt, Parc)" class="form-control">
            </div>
            <div class="col-md-4">
                <select class="form-control">
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="les2">Les deux</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <select class="form-control">
                    <option value="debutant">Débutant</option>
                    <option value="pro">Pro</option>
                    <option value="intermediaire">Intermédiaire</option>
                </select>
            </div>
            <div class="col-md-12 text-center">
                <button class="btn btn-primary">Ajouter nouvelle course</button>
            </div>
        </div>
    </div>
`;

  
    this.div.innerHTML = formHTML; // Ajouter le contenu HTML à l'élément div
  
    // Accès aux éléments du DOM
    this.nameInput = this.div.querySelector('input[placeholder="Nom du cours"]');
    this.locationInput = this.div.querySelector('input[placeholder="Lieu"]');
    this.dateInput = this.div.querySelector('input[placeholder="Date"]');
    this.timeInput = this.div.querySelector('input[placeholder="Heure"]');
    this.preferencesInput = this.div.querySelector('input[placeholder="Préférences (Forêt, Parc)"]');
    this.genreInput = this.div.querySelectorAll('select')[0]; // Premier select
    this.niveauInput = this.div.querySelectorAll('select')[1]; // Deuxième select
    this.addButton = this.div.querySelector('button.btn-primary');
  
      this.courseList = [];
      this.modifyButtons = [];
      this.deleteButtons = [];
      this.saveButtons = [];
  
      this.courseDataArray = []; // Tableau pour stocker les données de chaque cours
  
      let nodeParent = document.querySelector('#outer');
      nodeParent.appendChild(this.div);
  
  
}

createCourseDiv(courseData) {
  const courseDiv = document.createElement('div');
  courseDiv.className = 'card mb-4';
  courseDiv.innerHTML = `
      <div class="card-header" id="courseName-${courseData.id}">${courseData.nom}</div>
      <div class="card-body" id="course-${courseData.id}">
          <div class="row">
              <div class="col-md-6">
                  <p class="card-text"><strong>Lieu: <i class="fas fa-map-marker"></i></strong> <span id="courseLocation-${courseData.id}">${courseData.lieu}</span></p>
                  <p class="card-text"><strong>Date: <i class="far fa-calendar-alt"></i></strong> <span id="courseDate-${courseData.id}">${courseData.date}</span></p>
                  <p class="card-text"><strong>Préférences:</strong> <span id="coursePreferences-${courseData.id}">${courseData.preferences}</span></p>
              </div>
              <div class="col-md-6">
                  <p class="card-text"><strong>Heure: <i class="far fa-clock"></i></strong> <span id="courseTime-${courseData.id}">${courseData.heure}</span></p>
                  <p class="card-text"><strong>Genre: <i class="bi bi-people"></i></strong><span id="courseGenre-${courseData.id}">${courseData.genre}</span></p>
                  <p class="card-text"><strong>Niveau:</strong> <span id="courseNiveau-${courseData.id}">${courseData.niveau}</span></p>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                  <button class="btn btn-primary" data-course-id="modify-${courseData.id}">Modifier</button>
                  <button class="btn btn-success" data-course-id="save-${courseData.id}">Enregistrer</button>
                  <button class="btn btn-danger" data-course-id="delete-${courseData.id}">Supprimer</button>
              </div>
          </div>
      </div>
  `;
  


  // Ajoutez le contenu généré à l'objet du cours
  courseData.preferences = courseData.preferences || '';
  courseData.genre = courseData.genre || '';
  courseData.niveau = courseData.niveau || '';

    // Ajoutez le bouton "Modifier" au tableau des boutons de modification
   // Add the modify button to the modifyButtons array
   const modifyButton = courseDiv.querySelector('.btn-primary');
   this.modifyButtons.push(modifyButton);

   // Add the save button to the saveButtons array
   const saveButton = courseDiv.querySelector('.btn-success');
   this.saveButtons.push(saveButton);
   const deleteButtons = courseDiv.querySelector('.btn-danger');
   this.deleteButtons.push(deleteButtons);
   saveButton.style.display = 'none';

    return courseDiv;
}

  
getModifyButton(courseId) {
  return document.querySelector(`button[data-course-id="modify-${courseId}"]`);
}

getSaveButton(courseId) {
  return document.querySelector(`button[data-course-id="save-${courseId}"]`);
}
getDeleteButton(courseId) {
  return document.querySelector(`button[data-course-id="delete-${courseId}"]`);
}

  updateCourseList(observable) {
    const courseData = observable;
    const courseDiv = this.createCourseDiv(courseData, this.courseList.length);
    this.div.appendChild(courseDiv);
  }


enableEditFields(courseId) {
  const nameElement = document.getElementById(`courseName-${courseId}`);
  console.log(nameElement)
  const locationElement = document.getElementById(`courseLocation-${courseId}`);
  const dateElement = document.getElementById(`courseDate-${courseId}`);
  const timeElement = document.getElementById(`courseTime-${courseId}`);
  const preferencesElement = document.getElementById(`coursePreferences-${courseId}`); // Nouveau champ de préférences
  const genreElement = document.getElementById(`courseGenre-${courseId}`); // Nouveau champ de genre
  const niveauElement = document.getElementById(`courseNiveau-${courseId}`); // Nouveau champ de niveau

  // Récupérez les valeurs actuelles
  const name = nameElement.textContent;
  const location = locationElement.textContent;
  const date = dateElement.textContent;
  const time = timeElement.textContent;
  const preferences = preferencesElement.textContent; // Valeur actuelle de préférences
  const genre = genreElement.textContent; // Valeur actuelle de genre
  const niveau = niveauElement.textContent; // Valeur actuelle de niveau

  // Créez des champs d'entrée éditables pour chaque élément
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = name;
  nameElement.innerHTML = ''; // Supprimez le texte existant
  nameElement.appendChild(nameInput);

  const locationInput = document.createElement('input');
  locationInput.type = 'text';
  locationInput.value = location;
  locationElement.innerHTML = ''; // Supprimez le texte existant
  locationElement.appendChild(locationInput);

  const dateInput = document.createElement('input');
  dateInput.type = 'text';
  dateInput.value = date;
  dateElement.innerHTML = ''; // Supprimez le texte existant
  dateElement.appendChild(dateInput);

  const timeInput = document.createElement('input');
  timeInput.type = 'text';
  timeInput.value = time;
  timeElement.innerHTML = ''; // Supprimez le texte existant
  timeElement.appendChild(timeInput);

  const preferencesInput = document.createElement('input'); // Champ d'entrée pour préférences
  preferencesInput.type = 'text';
  preferencesInput.value = preferences;
  preferencesElement.innerHTML = ''; // Supprimez le texte existant
  preferencesElement.appendChild(preferencesInput);

  const genreInput = document.createElement('input'); // Champ d'entrée pour genre
  genreInput.type = 'text';
  genreInput.value = genre;
  genreElement.innerHTML = ''; // Supprimez le texte existant
  genreElement.appendChild(genreInput);

  const niveauInput = document.createElement('input'); // Champ d'entrée pour niveau
  niveauInput.type = 'text';
  niveauInput.value = niveau;
  niveauElement.innerHTML = ''; // Supprimez le texte existant
  niveauElement.appendChild(niveauInput);

  const modifyButton = this.getModifyButton(courseId);
  const saveButton = this.getSaveButton(courseId);

  // Masquez le bouton "Modifier" et affichez le bouton "Enregistrer"
  if (modifyButton && saveButton) {
    modifyButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
  }
}

disableEditFields(courseId) {
  const nameElement = document.getElementById(`courseName-${courseId}`);
  const locationElement = document.getElementById(`courseLocation-${courseId}`);
  const dateElement = document.getElementById(`courseDate-${courseId}`);
  const timeElement = document.getElementById(`courseTime-${courseId}`);
  const preferencesElement = document.getElementById(`coursePreferences-${courseId}`); // Nouveau champ de préférences
  const genreElement = document.getElementById(`courseGenre-${courseId}`); // Nouveau champ de genre
  const niveauElement = document.getElementById(`courseNiveau-${courseId}`); // Nouveau champ de niveau

  // Récupérez les valeurs éditées depuis les champs d'entrée
  const nameInput = nameElement.querySelector('input');
  const locationInput = locationElement.querySelector('input');
  const dateInput = dateElement.querySelector('input');
  const timeInput = timeElement.querySelector('input');
  const preferencesInput = preferencesElement.querySelector('input'); // Champ d'entrée pour préférences
  const genreInput = genreElement.querySelector('input'); // Champ d'entrée pour genre
  const niveauInput = niveauElement.querySelector('input'); // Champ d'entrée pour niveau

  // Remplacez les champs d'entrée par les valeurs éditées
  nameElement.innerHTML = nameInput.value;
  locationElement.innerHTML = locationInput.value;
  dateElement.innerHTML = dateInput.value;
  timeElement.innerHTML = timeInput.value;
  preferencesElement.innerHTML = preferencesInput.value; // Remplacez le texte par la valeur éditée de préférences
  genreElement.innerHTML = genreInput.value; // Remplacez le texte par la valeur éditée de genre
  niveauElement.innerHTML = niveauInput.value; // Remplacez le texte par la valeur éditée de niveau

  const modifyButton = this.getModifyButton(courseId);
  const saveButton = this.getSaveButton(courseId);
}


 // In the View class
 toggleEditSaveButtons(courseId) {
  const modifyButton = this.getModifyButton(courseId);
  const saveButton = this.getSaveButton(courseId);

  if (modifyButton && saveButton) {
    if (modifyButton.style.display === 'inline-block') {
      modifyButton.style.display = 'inline-block';
      saveButton.style.display = 'none';
    } else {
      modifyButton.style.display = 'inline-block';
      saveButton.style.display = 'none';
    }
  }
}
// Dans votre classe View
 removeCourse(courseId) {
  // Trouvez l'élément du cours correspondant par son ID
  const courseElement = document.querySelector(`#course-${courseId}`);
  console.log(courseElement);
  if (courseElement) {
    // Supprimez tout le contenu de l'élément du DOM
    courseElement.innerHTML = '';
  }
 }
}