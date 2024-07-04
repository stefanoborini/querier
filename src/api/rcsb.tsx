import axios from 'axios'
const ENDPOINT_URL = "https://search.rcsb.org/rcsbsearch/v2/query"

type QueryResults = {
    ids: string[];
    total_results: number;
}

export async function searchForIdOrGeneName(search: string) : Promise<QueryResults> { 
    const empty: QueryResults = {
        ids: [],
        total_results: 0
    }

    let res = undefined
    try {
        res = await axios.post(ENDPOINT_URL, 
            {
              "query": {
                "type": "group",
                "nodes": [
                  {
                    "type": "terminal",
                    "service": "text",
                    "parameters": {
                      "attribute": "rcsb_entity_source_organism.rcsb_gene_name.value",
                      "operator": "exact_match",
                      "negation": false,
                      "value": search
                    }
                  },
                  {
                    "type": "terminal",
                    "service": "text",
                    "parameters": {
                      "attribute": "rcsb_entry_container_identifiers.entry_id",
                      "operator": "in",
                      "negation": false,
                      "value": [
                        search
                      ]
                    }
                  }
                ],
                "logical_operator": "or",
                "label": "text"
              },
              "return_type": "entry",
              "request_options": {
                "paginate": {
                  "start": 0,
                  "rows": 10
                },
                "results_content_type": [
                  "experimental"
                ],
                "sort": [
                  {
                    "sort_by": "score",
                    "direction": "desc"
                  }
                ],
                "scoring_strategy": "combined"
              }
            }, {
                "headers" : {
                    "Content-Type": "application/json"
                }
            })
    } catch (error) {
        console.log(error)
        return empty
    }
    console.log(res)
    if (res.data.result_set === undefined) {
        return empty
    }
    const all_ids = res.data.result_set.map((x: any) => x.identifier)
    return {
        ids: all_ids,
        total_results: res.data.total_count
    }
}
