import React from 'react';
import './styles/globals.css'; // Pode ser removido ou substituído por TailwindCSS
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home'; // Ajuste o caminho conforme a localização do seu arquivo Home

// Criação de uma instância do Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
