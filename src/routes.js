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
const ConsulterLog = React.lazy(() => import('./views/Gestion_logs/ConsulterLog.js'))


const Actualites = React.lazy(() => import('./views/Gestion_Actualite/Actualites'))
const AjouterActualite = React.lazy(() => import('./views/Gestion_Actualite/Ajouter_Actualite'))
const consulterActualite = React.lazy(() => import('./views/consulterActualite/consulterActualite'))
const actualiteInfo = React.lazy(() => import('./views/consulterActualite/actualiteInfo'))
const reclamations = React.lazy(() => import('./views/Reclamation/SuiviReclamations'))
const AjoutReclamation = React.lazy(() => import('./views/Reclamation/AjoutReclamation'))
const ConsulterReclamation = React.lazy(() => import('./views/Reclamation/ConsulterReclamation'))
const CongesAttentes = React.lazy(() => import('./views/GestionCongesRH/CongesAttentes'))
const CongesTraitees = React.lazy(() =>
  import('./views/GestionCongesRH/CongesTraitees'),
)
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

  {
    path: '/GestionUtilisateurs/listeUtilisateurs',
    name: 'Utilisateurs',
    element: listeUtilisateurs,
  },
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
    name: 'les journaux',
    element: listAllLogs,
  },
  {
    path: '/Gestion_logs/ListLogsTraitees',
    name: 'les journaux traités',
    element: listAllTraitedLogs,
  },
  {
    path: '/Gestion_logs/ListMesLogs',
    name: 'Mes journaux',
    element: mesLogs,
  },
  {
    path: '/Gestion_logs/ConsulterLog',
    name: 'Consulter un journal',
    element: ConsulterLog,
  },
  {
    path: '/GestionUtilisateurs/listeUtilisateurs/userProfile',
    name: 'Profil utilisateur',
    element: userProfile,
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
    path: '/GestionCongesRH/CongesAttentes',
    name: 'Congés en attentes',
    element: CongesAttentes,
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
    path: '/GestionConges/CongesAttentes/CongesTraitees',
    name: 'Congés traitées',
    element: CongesTraitees,
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
    path: '/operation_rh/evaluations',
    name: 'Evaluation',
    element: React.lazy(() => import('./views/operation_rh/listEvaluation')),
  },

  {
    path: '/operation_rh/evaluationsEmployee',
    name: 'Evaluations',
    element: React.lazy(() => import('./views/operation_rh/listEvaluationEmployee')),
  },
  {
    path: '/operation_rh/consulterEvaluation',
    name: 'Consultation Evaluation',
    element: React.lazy(() => import('./views/operation_rh/consulterEvaluation')),
  },
  {
    path: '/operation_rh/evaluations/ajout',
    name: 'Ajout Evaluation',
    element: React.lazy(() => import('./views/operation_rh/ajoutEvaluation')),
  },
]

export default routes
