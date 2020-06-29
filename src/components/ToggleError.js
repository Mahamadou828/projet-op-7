import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';

export default function ToggleError({ message }) {
  return (
    <section className="container-row bg-red toggle">
      <ErrorIcon />
      <p>{message}</p>
    </section>
  );
}
