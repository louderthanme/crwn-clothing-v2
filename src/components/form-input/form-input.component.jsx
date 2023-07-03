import {
    GroupContainer,
    FormInputContainer,
    PasswordInputContainer,
    FormInputLabel
  } from './form-input.styles';
  
  const FormInput = ({ label, ...otherProps }) => {
    const { value } = otherProps;
  
    return (
      <GroupContainer>
        {otherProps.type === 'password' ? (
          <PasswordInputContainer {...otherProps} />
        ) : (
          <FormInputContainer {...otherProps} />
        )        }
        
        {label && (
          <FormInputLabel className={`${value.length ? 'shrink' : ''}`}>
            {label}
          </FormInputLabel>
        )}
      </GroupContainer>
    );
  };
  
  export default FormInput;
  