import { useState } from 'react';
import './App.css';
import Visualiser from './components/Visualiser'
import SearchBox from './components/SearchBox'
import ResultList from './components/ResultList'
import { searchForIdOrGeneName } from './api/rcsb'


function App() {
  const [searchResults, setSearchResults] = useState(([] as string[]));
  const [totalResults, setTotalResults] = useState(0);
  const [displayed, setDisplayed] = useState("");

  const searchClicked = async (search: string) => {
    const results = await searchForIdOrGeneName(search)
    setSearchResults(results.ids)
    setTotalResults(results.total_results)
  }

  return (
    <div className="App">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">RCSB Querier</a>
          </div>
        </nav>
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-3">
              <div className="card bg-light">
                <div className="card-body">
                  <SearchBox onSearch={searchClicked} /> 
                  <ResultList elements={searchResults} totalResults={totalResults} onSelect={(id: string) => {setDisplayed(id)}}/>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="card bg-light">
                <div className="card-body">
                    <Visualiser displayed={displayed}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
