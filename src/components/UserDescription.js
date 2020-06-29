import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Avatar } from '@material-ui/core';

export default function UserDescription() {
  return (
    <section className="info">
      <article>
        <Skeleton variant="text" />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rect" width={210} height={118} />
      </article>
    </section>
  );
}
