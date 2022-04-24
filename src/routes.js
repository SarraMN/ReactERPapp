import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//utilisateurs
const listeUtilisateurs = React.lazy(() => import('./views/GestionUtilisateurs/listeUtilisateurs'))
const userProfile = React.lazy(() => import('./views/GestionUtilisateurs/userProfile'))
const responsables = React.lazy(() => import('./views/GestionUtilisateurs/Responsables'))
const responsable = React.lazy(() => import('./views/GestionUtilisateurs/responsable'))
const ajoutresponsable = React.lazy(() => import('./views/GestionUtilisateurs/Ajoutresponsable'))
const compte = React.lazy(() => import('./views/GestionCompte/gestioncompte'))
const formations = React.lazy(() => import('./views/Consulter_formation/formations'))
const tousFormations = React.lazy(() => import('./views/Consulter_formation/tousFormations'))
const historique = React.lazy(() =>
  import('./views/gestion_demandes/historiques_demandes_formations'),
)
const demandes_formation = React.lazy(() =>
  import('./views/gestion_demandes/demandes_inscription_formation'),
)
const demandes_examen = React.lazy(() =>
  import('./views/gestion_demandes/demandes_inscriptions_examens'),
)
//Formation
const ajouterFormation = React.lazy(() => import('./views/GestionFormation/AjouterFormation'))
const listeFormation = React.lazy(() => import('./views/GestionFormation/listeFormation'))
const formationsByCategorie = React.lazy(() =>
  import('./views/Consulter_formation/formationsByCategorie'),
)
const Info = React.lazy(() => import('./views/Consulter_formation/formationInfo'))
//Cours
const ListeCours = React.lazy(() => import('./views/GestionCours/listeCours'))
const Mes_formations = React.lazy(() => import('./views/Mes_formations/Mes_formations'))
const Ajout_organisme = React.lazy(() =>
  import('./views/gestion_organismes_conventionnes/Ajout_organisme_conventionne'),
)
const modifier_organisme = React.lazy(() =>
  import('./views/gestion_organismes_conventionnes/updateOrganisme'),
)
const organismes_conventionnes = React.lazy(() =>
  import('./views/gestion_organismes_conventionnes/organismes_conventionnes'),
)
const Profile_organisme = React.lazy(() =>
  import('./views/gestion_organismes_conventionnes/organisme_conventionne'),
)
const pdf = React.lazy(() => import('./views/GestionCours/pdf'))
const gestion_examen = React.lazy(() => import('./views/gestion_examen/gestion_examen'))
const test = React.lazy(() => import('./views/gestion_examen/test'))
const Ajoutxamen = React.lazy(() => import('./views/gestion_examen/AjoutExamen'))
const modifierexamen = React.lazy(() => import('./views/gestion_examen/updateExamen'))
const MaFormationInfo = React.lazy(() => import('./views/Mes_formations/FormationInfo'))
const voirCours = React.lazy(() => import('./views/Mes_formations/voirCours'))
const passageexamen = React.lazy(() => import('./views/Mes_formations/ExamenInfo'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  {
    path: '/GestionUtilisateurs/listeUtilisateurs',
    name: 'Utilisateurs',
    element: listeUtilisateurs,
  },
  { path: '/GestionFormation/listeFormation', name: 'Fomations', element: listeFormation },
  {
    path: '/GestionUtilisateurs/listeUtilisateurs/userProfile',
    name: 'userProfile',
    element: userProfile,
  },
  {
    path: '/GestionUtilisateurs/Responsables/ajoutresponsable',
    name: 'Ajout de un responsable',
    element: ajoutresponsable,
  },
  {
    path: '/GestionUtilisateurs/Responsables',
    name: 'responsables',
    element: responsables,
  },
  {
    path: '/GestionUtilisateurs/Responsables/responsable',
    name: 'responsable',
    element: responsable,
  },
  {
    path: '/GestionCompte/gestioncompte',
    name: 'Mon Compte',
    element: compte,
  },
  {
    path: '/Consulter_formation/formations',
    name: 'Les Formations',
    element: formations,
  },
  {
    path: '/Consulter_formation/formations/formationsByCategorie',
    name: 'Formations',
    element: formationsByCategorie,
  },
  {
    path: '/Consulter_formation/formations/tousFormations',
    name: 'Formations',
    element: tousFormations,
  },

  {
    path: '/gestion_demandes/demandes_inscription_formation',
    name: 'Les Demandes',
    element: demandes_formation,
  },
  {
    path: '/gestion_demandes/demandes_inscriptions_examens',
    name: 'Les Demandes',
    element: demandes_examen,
  },
  {
    path: '/gestion_demandes/demandes_inscription_formation/historiques_demandes_formations',
    name: 'Les historiques',
    element: historique,
  },
  {
    path: '/GestionFormation/AjouterFormation',
    name: 'Ajouter fomation',
    element: ajouterFormation,
  },
  {
    path: '/GestionFormation/listeFormation',
    name: 'liste fomations',
    element: listeFormation,
  },
  {
    path: '/GestionUtilisateurs/listeUtilisateurs/userProfile',
    name: 'userProfile',
    element: userProfile,
  },
  {
    path: '/Consulter_formation/formations/formationInfo',
    name: 'Info',
    element: Info,
  },
  {
    path: '/GestionFormation/listeFormation/listeCours',
    name: 'liste Cours',
    element: ListeCours,
  },
  {
    path: '/Mes_formations/Mes_formations',
    name: 'Mes Formations',
    element: Mes_formations,
  },
  {
    path: '/gestion_organismes_conventionnes/organismes_conventionnes',
    name: 'Les organismes onventionnés',
    element: organismes_conventionnes,
  },
  {
    path: '/gestion_organismes_conventionnes/organismes_conventionnes/Ajout_organisme_conventionne',
    name: 'Ajout un organisme convensioné',
    element: Ajout_organisme,
  },
  {
    path: '/gestion_organismes_conventionnes/organismes_conventionnes/updateOrganisme',
    name: 'Modifier un organisme convensioné',
    element: modifier_organisme,
  },
  {
    path: '/gestion_organismes_conventionnes/organismes_conventionnes/organisme_conventionne',
    name: 'Profile organisme',
    element: Profile_organisme,
  },
  {
    path: '/GestionFormation/listeFormation/listeCours/pdf',
    name: 'Cours en PDF',
    element: pdf,
  },
  {
    path: '/gestion_examen/gestion_examen',
    name: 'gestion_examen',
    element: gestion_examen,
  },
  {
    path: '/gestion_examen/test',
    name: 'gestion_examen',
    element: test,
  },
  {
    path: '/gestion_examen/gestion_examen/AjoutExamen',
    name: 'Ajout Examen',
    element: Ajoutxamen,
  },
  {
    path: '/gestion_examen/gestion_examen/updateExamen',
    name: 'modifier Examen',
    element: modifierexamen,
  },
  {
    path: '/Mes_formations/Mes_formations/FormationInfo',
    name: 'consulter formation',
    element: MaFormationInfo,
  },
  {
    path: '/Mes_formations/Mes_formations/FormationInfo/voirCours',
    name: 'Voir cours',
    element: voirCours,
  },
  {
    path: '/Mes_formations/Mes_formations/FormationInfo/ExamenInfo',
    name: 'Passage du examen',
    element: passageexamen,
  },
]

export default routes
