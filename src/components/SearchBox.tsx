import { useState } from 'react';

type SearchBoxProps = {
    onSearch: (id: string) => void;
}

function SearchBox({ onSearch }: SearchBoxProps) {
  const [search, setSearch] = useState("");
  return (
      <div className="row">
        <div className="col">
          <label htmlFor="searchField" className="form-label">Search for:</label>
        </div>
        <div className="col">
          <input type="text" className="form-control" id="searchField" value={search} onChange={(event) => { setSearch(event.target.value)}}/>
        </div>
        <div className="col">
          <button type="button" className="btn btn-primary" onClick={() => { onSearch(search) }}>Search</button>
        </div>
      </div>
    )
}

export default SearchBox;
