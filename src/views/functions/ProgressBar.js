import '../../ui-component/progressBar/style.scss';

export default function ProgressBar(props){
    return( 
        <div className="progressbar-container">
            <div className="progressbar-complete" style={{width: `${props.props.filledQuantity}%`}}>
                <div className="progressbar-liquid"></div>
            </div>
            <div className="progress">{props.props.filledQuantity}%</div>
        </div>
    );
}