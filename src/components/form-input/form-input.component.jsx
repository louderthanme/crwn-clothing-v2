import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && ( //if there is a label then render, else, don't
                <label className={`${otherProps.value.length ? 'shrink' : null} form-input-label`}> {label} </label>
                // if there are other props, then append class 'shrink', if not, add nothing                
            )}
        </div >
    )
}

export default FormInput