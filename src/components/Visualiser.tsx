import { useEffect } from 'react';

type VisualiserProps = {
    displayed: string // The structure code to be displayed. Empty string will keep the current display. 
}

function Visualiser({ displayed }: VisualiserProps) {
    // We use effects and push the info with a side effect because 3dmol is not monitoring the change to the 
    // data-pdb argument, hence we have to inject the new data programmatically, instead of declaratively.
    useEffect(() => {
        if (displayed === "") { 
            return
        }
        console.log("displaying " + displayed);
        const viewer = (window as any).$3Dmol.viewers[0]
        if (viewer === undefined) {
            return
        }
        (window as any).$3Dmol.download('pdb:'+displayed, viewer, {multimodel:true, frames:true},function(){
	        viewer.setStyle({}, {cartoon:{color:"spectrum"}});
            viewer.zoomTo();
	        viewer.render();
        })
    }, [ displayed ])

    return (
        <>
            <h1>{displayed}</h1>
            <div style={{height: "800px", width: "100%", position: "relative"}}
             className='viewer_3Dmoljs' 
             data-backgroundcolor='0xffffff' data-style='stick' data-ui='true'>
            </div>
        </>
    )
}


export default Visualiser;
