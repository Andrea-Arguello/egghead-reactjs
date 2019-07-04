import React from 'react';
import { FilterLink } from './filterLink.js'

export const Footer = () => (
    <p>
      Show:
         {' '}
      <FilterLink
        filter='all'
      >
        All
         </FilterLink>
      {' '}
      <FilterLink
        filter='completed'
      >
        Completed
         </FilterLink>
      {' '}
      <FilterLink
        filter='active'
      >
        Active
         </FilterLink>
    </p>
  );