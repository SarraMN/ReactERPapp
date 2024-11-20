import React from 'react'


//utilisateurs
const listeUtilisateurs = React.lazy(() => import('./views/GestionUtilisateurs/listeUtilisateurs'))
const userProfile = React.lazy(() => import('./views/GestionUtilisateurs/userProfile'))
const listeRH = React.lazy(() => import('./views/GestionUtilisateurs/listeRH'))
const RH = React.lazy(() => import('./views/GestionUtilisateurs/responsable'))
const ajoutRH = React.lazy(() => import('./views/GestionUtilisateurs/AjoutRH'))
const ajoutConge = React.lazy(() => import('./views/Gestion_conges/AddConge'))
const consulterConge = React.lazy(() => import('./views/Gestion_conges/consulterConge'))
const listeConges = React.lazy(() => import('./views/Gestion_conges/ListeConges'))
const ajoutEmploye = React.lazy(() => import('./views/GestionUtilisateurs/AjoutEmploye'))
const compte = React.lazy(() => import('./views/GestionCompte/gestioncompte'))
const listAllLogs = React.lazy(() => import('./views/Gestion_logs/ListAllLogs'))
const listAllTraitedLogs = React.lazy(() => import('./views/Gestion_logs/ListLogsTraitees'))
const mesLogs = React.lazy(() => import('./views/Gestion_logs/ListMesLogs'))
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
const passageexamen2 = React.lazy(() => import('./views/Mes_formations/passageExamen'))
const certificat = React.lazy(() => import('./views/Mes_formations/certificat'))
const Actualites = React.lazy(() => import('./views/Gestion_Actualite/Actualites'))
const AjouterActualite = React.lazy(() => import('./views/Gestion_Actualite/Ajouter_Actualite'))
const consulterActualite = React.lazy(() => import('./views/consulterActualite/consulterActualite'))
const actualiteInfo = React.lazy(() => import('./views/consulterActualite/actualiteInfo'))
const Accueil = React.lazy(() => import('./views/Accueil/accueil'))
const reclamations = React.lazy(() => import('./views/Reclamation/SuiviReclamations'))
const AjoutReclamation = React.lazy(() => import('./views/Reclamation/AjoutReclamation'))
const ConsulterReclamation = React.lazy(() => import('./views/Reclamation/ConsulterReclamation'))
const suivreDemande = React.lazy(() => import('./views/suivreDemande/suivreDemandes'))
const ReclamationsAttentes = React.lazy(() =>
  import('./views/GestionReclamation/ReclamationsAttentes'),
)
const RepondreReclamation = React.lazy(() =>
  import('./views/GestionReclamation/RepondreReclamation'),
)
const ReclamationTraitees = React.lazy(() =>
  import('./views/GestionReclamation/ReclamationsTraitees'),
)
const ConsulterReclamationTraitee = React.lazy(() =>
  import('./views/GestionReclamation/ConsulterReclamationTraitee'),
)
const routes = [
  { path: '/', exact: true, name: 'Utilisateurs' },
  { path: '/accueil', name: 'Accueil', element: Accueil },

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
    path: '/GestionUtilisateurs/Responsables/AjoutRH',
    name: 'Ajout de un RH',
    element: ajoutRH,
  },
  {
    path: '/GestionUtilisateurs/Responsables/AjoutEmploye',
    name: 'Ajout de un employé',
    element: ajoutEmploye,
  },
  {
    path: '/GestionUtilisateurs/RH',
    name: 'listeRH',
    element: listeRH,
  },
  {
    path: '/GestionUtilisateurs/Responsables/RH',
    name: 'RH',
    element: RH,
  },
  {
    path: '/Gestion_conges/consulterConge',
    name: 'consulter Conge',
    element: consulterConge,
  },
  {
    path: '/Gestion_conges/AddConge',
    name: 'Add Conge',
    element: ajoutConge,
  },
  {
    path: '/Gestion_conges/ListeConges',
    name: 'Liste Conges',
    element: listeConges,
  },
  {
    path: '/GestionCompte/gestioncompte',
    name: 'Mon Compte',
    element: compte,
  },
  {
    path: '/Gestion_logs/ListAllLogs',
    name: 'Logs',
    element: listAllLogs,
  },
  {
    path: '/Gestion_logs/ListLogsTraitees',
    name: 'tarited Logs',
    element: listAllTraitedLogs,
  },
  {
    path: '/Gestion_logs/ListMesLogs',
    name: 'Mes journaux',
    element: mesLogs,
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
    name: 'Gestion examens',
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
    path: '/Mes_formations/Mes_formations/FormationInfo/certificat',
    name: 'Voir certificat',
    element: certificat,
  },
  {
    path: '/Mes_formations/Mes_formations/FormationInfo/ExamenInfo',
    name: 'Examen',
    element: passageexamen,
  },
  {
    path: '/Mes_formations/Mes_formations/FormationInfo/ExamenInfo/passageExamen',
    name: 'Passage examen',
    element: passageexamen2,
  },
  {
    path: '/Gestion_Actualite/Actualites',
    name: 'Actualites',
    element: Actualites,
  },
  {
    path: '/Gestion_Actualite/Actualites/Ajouter_Actualite',
    name: 'Ajouter_Actualite',
    element: AjouterActualite,
  },
  {
    path: '/consulterActualite/consulterActualite',
    name: 'Les actualités',
    element: consulterActualite,
  },
  {
    path: '/consulterActualite/consulterActualite/actualiteInfo',
    name: 'Actualite',
    element: actualiteInfo,
  },
  {
    path: '/Reclamations/SuiviReclamations',
    name: 'Reclamations',
    element: reclamations,
  },
  {
    path: '/Reclamations/AjoutReclamation',
    name: 'Ajout reclamation',
    element: AjoutReclamation,
  },
  {
    path: '/Reclamations/SuiviReclamations/ConsulterReclamation',
    name: 'Consulter reclamation',
    element: ConsulterReclamation,
  },
  {
    path: '/GestionReclamation/ReclamationAttentes',
    name: 'Reclamations en attentes',
    element: ReclamationsAttentes,
  },
  {
    path: '/GestionReclamation/ReclamationAttentes/RepondreReclamation',
    name: 'Consulter reclamation',
    element: RepondreReclamation,
  },
  {
    path: '/GestionReclamation/ReclamationAttentes/ReclamationsTraitees',
    name: 'Reclamations traitées',
    element: ReclamationTraitees,
  },
  {
    path: '/GestionReclamation/ReclamationAttentes/ReclamationsTraitees/ConsulterReclamationTraitee',
    name: 'Reclamation',
    element: ConsulterReclamationTraitee,
  },
  {
    path: '/Gestion_Actualite/Actualites/actualiteInfo',
    name: 'Actualite information',
    element: actualiteInfo,
  },
  {
    path: '/suivreDemande/suivreDemandes',
    name: 'Suivre demandes',
    element: suivreDemande,
  },
]

export default routes
