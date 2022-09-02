import React, { createContext, useReducer } from 'react';

const initialState = {
  forms: localStorage['forms'] ? JSON.parse(localStorage['forms']) : []
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    const forms = state.forms;
    const currentForm = forms.find(form => form.name === action.payload.formName);
    switch(action.type) {
      case 'addForm':
        localStorage.setItem('forms', JSON.stringify([...state.forms, action.payload]));
        return { ...state, forms: [...state.forms, action.payload]};
      case 'removeForm':
        forms.splice(action.payload, 1);
        break;
      case 'addQuestion':
        let newQuestion = {name: action.payload.name, type: action.payload.type};
        if (action.payload.choices.length > 0) newQuestion.choices = action.payload.choices;
        currentForm.questions = [...currentForm.questions, newQuestion];
        break;
      case 'removeQuestion':
        currentForm.questions.splice(action.payload, 1);
        break;
      case 'moveQuestion':
        const question = currentForm.questions[action.payload.fromIndex];
        currentForm.questions.splice(action.payload.fromIndex, 1);
        currentForm.questions.splice(action.payload.toIndex, 0, question);
        break;
      default:
        throw new Error();
    };

    localStorage.setItem('forms', JSON.stringify(forms));
    return { ...state, forms};
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
