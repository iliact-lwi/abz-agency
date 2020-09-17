import React, { useState } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, POSTForm } from '../redux/root/actions';
import { IRootState, IImageSizes } from '../interfaces/interfaces';

import RegistrationRadiosComponent from './RegistrationRadiosComponent';
import AlertRegistrationComponent from './AlertRegistrationComponent';
import SuccessPostComponent from './SuccessPostComponent';
import FailedPostComponent from './FailedPostComponet';

const RegistrationComponent: React.FunctionComponent = () => {
    const [nameInputValue, setNameInputValue] = useState<string>('');
    const [emailInputValue, setEmailInputValue] = useState<string>('');
    const [phoneInputValue, setPhoneInputValue] = useState<string>('');
    const [currentPosition, setCurrentPosition] = useState<string>('');
    const [imageData, setImageData] = useState<any>(null);
    const [imageSizes, setImageSizes] = useState<IImageSizes>({width: 0, height: 0});
    const [currentUploadImageName, setCurrentUploadImageName] = useState<string>('Upload your photo');

    const dispatch = useDispatch();
    const alert = useSelector((state: IRootState) => state.validation.showAlert);
    const success = useSelector((state: IRootState) => state.validation.postSuccess);
    const failed = useSelector((state: IRootState) => state.validation.postFailed);
    const progress = useSelector((state: IRootState) => state.validation.showProgress);

    
    const nameInputValueHandler = (event: any) => {
        setNameInputValue(event.target.value);
    }

    const emailInputValueHandler = (event: any) => {
        setEmailInputValue(event.target.value)
    }

    const phoneInputValueHandler = (event: any) => {
        setPhoneInputValue(event.target.value);
    }

    const radioInputHandler = (event: any) => {
        const target = event.target;

        setCurrentPosition(target.value);
    }

    const fileHandler = (event: any) => {
        if(event.target.files[0]) {
            event.persist();

            const file  = event.target.files[0];
            const img = new Image();

            img.onload = function() {
                const sizes: IImageSizes = {
                    width: img.width,
                    height: img.height
                };

                setImageSizes(sizes);
                setCurrentUploadImageName(event.target.files[0].name);
                setImageData(event.target.files[0]);
                URL.revokeObjectURL(img.src);
            }

            img.onerror = function() {
                dispatch(showAlert('Please upload a picture'));

                return;
            }

            const objectURL = URL.createObjectURL(file);
            img.src = objectURL;
        } else {
            return;
        } 
    }

    const clearFormAfterPostHandler = () => {
        setNameInputValue('');
        setEmailInputValue('');
        setPhoneInputValue('');

        const currentActivePositionInput: any = document.getElementById('position' + currentPosition);
        currentActivePositionInput.checked = false;
        setCurrentPosition('');

        const inputFile: any = document.getElementById('input-file');
        inputFile.value = '';

        setImageData(null);
        setImageSizes({width: 0, height: 0});
        setCurrentUploadImageName('Upload your photo');
    }

    const submitFormHandler = () => {
        if(nameInputValue.replace(/\s/g, '') === '') {
            setNameInputValue('');
            dispatch(showAlert('Name is a required parameter'));

            return;
        } else {
            if(nameInputValue.length < 2 || nameInputValue.length > 60) {
                setNameInputValue('');
                dispatch(showAlert('Name must be between 2 and 60 characters'));

                return;
            }
        }

        if(emailInputValue.replace(/\s/g, '') === '') {
            setEmailInputValue('');
            dispatch(showAlert('Email is a required parameter'));

            return;
        } else {
            const check = emailInputValue.replace(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, '');

            if(check !== '') {
                setEmailInputValue('');
                dispatch(showAlert('Incorrect email'));

                return;
            }
        }

        if(phoneInputValue.replace(/\s/g, '') === '') {
            setPhoneInputValue('');
            dispatch(showAlert('Phone is a required parameter'));

            return;
        } else {
            if(phoneInputValue.replace(/^[\+]{0,1}380([0-9]{9})/, '') !== '') {
                setPhoneInputValue('');
                dispatch(showAlert('Incorrect phone'));

                return;
            }
        }

        if(currentPosition === '') {
            dispatch(showAlert('Position is a required parameter'));

            return;
        }

        if(imageData === null) {
            dispatch(showAlert('Photo is a required parameter'));
            
            return;
        } else {
            if(!/\.(jpg|jpeg)$/.test(imageData.name)) {
                dispatch(showAlert('The photo format must be jpeg/jpg type'));

                return;
            } else if(imageSizes.width < 70 || imageSizes.height < 70) {
                dispatch(showAlert('Minimum size of photo 70x70px'));
                
                return;
            } else if(imageData.size > 5242880) {
                dispatch(showAlert('The photo size must not be greater than 5 Mb'));

                return;
            }
        }

        const formData: FormData = new FormData();

        formData.append('name', nameInputValue);
        formData.append('email', emailInputValue);
        formData.append('phone', phoneInputValue);
        formData.append('position_id', currentPosition);
        formData.append('photo', imageData);

        dispatch(POSTForm(formData, clearFormAfterPostHandler));
    }

    return (
        <div className="registration-block" id="reg">
            <div className="registration-preview">
                <div className="registration-title">
                    Register to get a work
                </div>
                <div className="registration-subtitle">
                    Attention! After successful registration and alert, update the <br/> list of users in the block from the top
                </div>
            </div>
            { success && <SuccessPostComponent /> }
            { failed && <FailedPostComponent /> }
            { alert && <AlertRegistrationComponent /> }
            <div className="registration-inputs">
                <Form>
                    <Form.Group controlId="formBasicName" className="registrations-inputs-padding">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your name" value={nameInputValue} onChange={nameInputValueHandler} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="registrations-inputs-padding">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Your email" value={emailInputValue} onChange={emailInputValueHandler} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPhone" className="registrations-inputs-padding">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="tel" placeholder="+380 XX XXX XX XX" value={phoneInputValue} onChange={phoneInputValueHandler} />
                        <Form.Text className="text-muted registrations-open-sans">
                            Еnter phone number in open format
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
            <div className="registration-checkboxs">
                <div className="registration-checkboxs-title">Select your position</div>
                <RegistrationRadiosComponent onChange={radioInputHandler}/>
            </div>
            <div className="registration-file">
                <div className="registration-file-title">Photo</div>
                <Form className="registration-file-input">
                    <Form.File id="registration-upload-img" custom>
                        <Form.File.Input id="input-file" onChange={fileHandler}/>
                            <Form.File.Label data-browse="Browse">
                                { currentUploadImageName }
                            </Form.File.Label>
                    </Form.File>
                </Form>
            </div>
            <div className="registration-button">
                <Button variant="primary" className="registration-button-input" onClick={submitFormHandler}>Sign up now</Button>
            </div>
            { progress && <ProgressBar animated now={100} className="registration-progress-bar" />}
        </div>
    );
}

export default RegistrationComponent;