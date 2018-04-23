import { createActions } from 'redux-actions';

export const INSERT = 'action/INSERT';
export const REMOVE = 'action/REMOVE';

export const insert = createActions(INSERT);
export const remove = createActions(REMOVE, id => id);


