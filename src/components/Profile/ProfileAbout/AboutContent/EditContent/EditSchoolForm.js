

import React, {useState} from 'react';
import Input from '../../../../UI/Input/Input'
import Button from '../../../../UI/Button/Button'
import {fieldBuilder} from "../../../../../shared/utility";
import classes from './SharedEditFormUI.css'

const editWorkForm = (props) => {

    const [school, setSchool] = useState(props.school || '');
    const [startDate, setStartDate] = useState(props.startDate || '');
    const [endDate, setEndDate] = useState(props.endDate || '');
    const [graduated, setGraduated] = useState(false);
    const [description, setDescription] = useState(props.description || '');

    // const formFields = {
    //     school: fieldBuilder(
    //         "input",
    //         "text",
    //         "Company",
    //         school,
    //         {required: true},
    //         false,
    //         false
    //     ),
    //     position: fieldBuilder(
    //         "input",
    //         "text",
    //         "Position",
    //         position,
    //         null,
    //         true,
    //         null
    //     ),
    //     location: fieldBuilder(
    //         "input",
    //         "text",
    //         "City/Town",
    //         location,
    //         null,
    //         true,
    //         null
    //     ),
    //     description: fieldBuilder(
    //         "textarea",
    //         "text",
    //         "Description",
    //         description,
    //         null,
    //         true,
    //         null
    //     )
    // }
    //
    // const updateInput = (event, key) => {
    //     switch (key) {
    //         case "company":
    //             setCompany(event.target.value)
    //             break;
    //         case "position":
    //             setPosition(event.target.value)
    //             break;
    //         case "location":
    //             setLocation(event.target.value)
    //             break;
    //         case "description":
    //             setDescription(event.target.value)
    //             break;
    //         default:
    //             throw new Error("Oops, shouldn't be here")
    //     }
    // }
    //
    // const formInputs = Object.keys(formFields).map(key => {
    //     return (
    //         <Input
    //             key={key}
    //             elementType={formFields[key].elementType}
    //             type={formFields[key].elementConfig.type}
    //             placeholder={formFields[key].elementConfig.placeholder}
    //             rows={formFields[key].elementConfig.rows}
    //             cols={formFields[key].elementConfig.cols}
    //             value={formFields[key].value}
    //             validation={formFields[key].validation}
    //             invalid={!formFields[key].valid}
    //             touched={formFields[key].touched}
    //             changed={(event) => updateInput(event,key)}
    //         />
    //     )
    // })
    //
    // const submitChangesHandler = (event) => {
    //     event.preventDefault();
    // }
    //
    // return (
    //     <form onSubmit={submitChangesHandler} className={classes.EditForm}>
    //         {formInputs}
    //         <hr/>
    //         <div className={classes.Buttons}>
    //             <Button addClass="Neutral">Privacy</Button>
    //             <div className={classes.SubmitOrCancel}>
    //                 <Button addClass="Neutral" clicked={props.cancel}>Cancel</Button>
    //                 <Button addClass="Save">Save</Button>
    //             </div>
    //         </div>
    //     </form>
    // )

    return null;
}


export default editWorkForm;