import { createAction } from '@reduxjs/toolkit';

export const updateUser = createAction<string>('UPDATE_USER');