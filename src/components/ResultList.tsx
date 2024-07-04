type ResultListProps = {
    elements: string[]; // Array of the various ids to display
    totalResults: number; // Total number of results from the query
    onSelect: (x: string) => void; // Handler callback for clicking on one element of the list
}


function ResultList({ elements, totalResults, onSelect }: ResultListProps) {
    // Displays the list of elements returned by the query on the remote source   
    const entries = elements.map((x) => {
        return (
            <li key={x} 
                className="list-group-item highlight-hover" 
                data-id={x} 
                onClick={
                    (event) => { 
                        let id = (event.target as Element).getAttribute("data-id") 
                        if (!id) {
                            id = ""
                        }
                        
                        onSelect(id)
                }}>
            {x}
            </li>
        )
    })
    return (
        <div>
            <ul className="list-group mt-3">{entries}</ul>
            <div>
                Showing first {entries.length} of {totalResults}
            </div>
        </div>
    )
}

export default ResultList;
