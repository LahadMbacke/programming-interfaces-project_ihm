class Model extends Observable {
  constructor() {
    super();
    this.courseData = {
      id: 1, // Commencez avec l'ID 1
      nom: '',
      lieu: '',
      date: '',
      heure: '',
      preferences: '',
      genre: '',
      niveau: '',
    };
  }

  addCourse(courseData) {
    courseData.id = this.courseData.id; // Attribuez l'ID actuel à la nouvelle donnée
    this.courseData = courseData;
    this.courseData.id++; // Incrémentez l'ID pour le prochain cours
    this.setChanged();
    this.notifyObservers(courseData);
    return this.courseData;
  }

  // Méthode pour mettre à jour un cours existant
  updateCourse(courseId, updatedCourseData) {
    if (courseId === this.courseData.id) {
      if (updatedCourseData.nom) {
        this.courseData.nom = updatedCourseData.nom;
      }
      if (updatedCourseData.lieu) {
        this.courseData.lieu = updatedCourseData.lieu;
      }
      if (updatedCourseData.date) {
        this.courseData.date = updatedCourseData.date;
      }
      if (updatedCourseData.heure) {
        this.courseData.heure = updatedCourseData.heure;
      }
      if (updatedCourseData.preferences) {
        this.courseData.preferences = updatedCourseData.preferences;
      }
      if (updatedCourseData.genre) {
        this.courseData.genre = updatedCourseData.genre;
      }
      if (updatedCourseData.niveau) {
        this.courseData.niveau = updatedCourseData.niveau;
      }

      this.setChanged();
      this.notifyObservers(this.courseData);
    }
  }

  // Méthode pour supprimer un cours par son ID
  deleteCourse(courseId) {
    if (courseId === this.courseData.id) {
      // Réinitialisez les données du cours
      this.courseData = {
        id: '', // Réduisez l'ID pour éviter les trous dans la séquence
        nom: '',
        lieu: '',
        date: '',
        heure: '',
        preferences: '',
        genre: '',
        niveau: '',
      };

      this.setChanged();
      this.notifyObservers(this.courseData);
    }
  }
  // deleteCourse(courseId) {
  //   const indexToDelete = this.courses.findIndex(course => course.id === courseId);
    
  //   if (indexToDelete !== -1) {
  //     this.courses.splice(indexToDelete, 1); // Supprime l'élément du tableau
  //     this.setChanged();
  //     this.notifyObservers(this.courses); // Notifie les observateurs avec le tableau mis à jour
  //   }
  // }
  

  getData() {
    return this.courseData;
  }
}
