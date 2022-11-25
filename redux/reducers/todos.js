import {  ADD_TODO, DELETE_TODO } from "../actionTypes";

const initialState = {
  todo_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task, asignee} = action.payload
      return {
        ...state,
        todo_list: [ ...state.todo_list, { id, task, asignee}]
      };
    }
    
    case DELETE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id)
      };
    }
    default:
      return state;
  }
}
