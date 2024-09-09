

type PredictionPageProps = {
    params: {
        id: string
    }
}

export default async function Prediction({params}: PredictionPageProps) {
    const {id} = params;

    console.log(id);
    
    return (
        <div>
            <h1>Prediction</h1>
            <div />
        </div>
    )
}