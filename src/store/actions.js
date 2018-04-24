import { createAction } from 'redux-actions';

export const INSERT = 'INSERT';
export const REMOVE = 'REMOVE';


export const insert = createAction(INSERT);
export const remove = createAction(REMOVE, id => id);


