'use client';

import React, { useEffect } from 'react';
import getCurrentUser from '../actions/getCurrentUser';

function Home() {
  useEffect(() => {
    const loadCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      console.log(currentUser);
    };
    loadCurrentUser();
  }, []);

  return <div>home</div>;
}

export default Home;
