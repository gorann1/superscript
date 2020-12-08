import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import './App.css';
import { gql } from 'apollo-boost'

const App: React.FC = () => {
    const {data, loading} = useQuery(gql ` 
      {
        hello
      }
    `);
    if(loading) {
      return <div>Loading...</div>
    }


  return (
    <div>
      {JSON.stringify(data)}
    </div>

  );
}

export default App;
