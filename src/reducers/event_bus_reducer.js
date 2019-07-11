import { 
  SHOW_FORM_MODAL,
  HIDE_FORM_MODAL
} from '../actions/event_bus'

const initialState = {
  isVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case SHOW_FORM_MODAL:
      return {...state, isVisible: true}
      
    case HIDE_FORM_MODAL:
      return {...state, isVisible: false }

    default:
      return state;
  }
}