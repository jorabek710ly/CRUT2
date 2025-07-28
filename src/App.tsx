import React, { useState } from 'react'
import Header from './components/Header';
import Create from './components/Form';
import Card from './components/Card';
import type { IStudent } from './types';
import Footer from './components/Footer';

const App = () => {
  const [update, setUpdate] = useState<IStudent | null>(null);
  return (
    <>
      <Header />
      <Create update={update} setUpdate={setUpdate} />
      <Card update={update} setUpdate={setUpdate} />
      <Footer/>
    </>
  )
}

export default React.memo(App);