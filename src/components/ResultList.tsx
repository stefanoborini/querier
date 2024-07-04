type ResultListProps = {
    elements: string[];
    totalResults: number;
    onSelect: (x: string) => void;
}


function ResultList({ elements, totalResults, onSelect }: ResultListProps) {
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
