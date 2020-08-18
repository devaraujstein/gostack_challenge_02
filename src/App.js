import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    let repositorie = {
      title: "Desafio goStack 03",
      url: "github.com/gostack03",
      techs: [
        "Nodejs",
        "Reactjs",
        "React Native"
      ],
    }

    const response = await api.post('/repositories', repositorie)

    repositorie = response.data

    setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`)

    setRepositories(repositories.filter(repository => repository.id !== id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>
          <li>
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
