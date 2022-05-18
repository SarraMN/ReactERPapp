const initialState = {
  EtatExamen: 'sou',
  ExamenID: '21',
}

const PassageExamen = (state = initialState, action) => {
  console.log('Reducer auth')
  switch (action.EtatExamen) {
    case 'ExamenCommance':
      return { ...state, EtatExamen: 'ExamenCommance', ExamenID: action.IdExamen }

    case 'ExamenTermine':
      return { ...state, EtatExamen: 'ExamenTermine', ExamenID: action.IdExamen }

    default:
      return state
  }
}

export default PassageExamen
