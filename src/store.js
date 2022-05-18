import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  EtatExamen: 0,
  ScoreCandidat: 0,
  app: 0,
  nbrDemandes: 0,
  nbrReclamations: 0,
  nbrFormations: 0,
  image: 0,
  nom: 0,
  prenom: 0,
}
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
