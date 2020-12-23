
import React from 'react';
import TOCsidedrawer from "../../UI/TOCsidedrawer/TOCsidedrawer";
import AdminTOC from "./AdminTOC/AdminTOC";

const managePageSidedrawer = (props) => {

    return (
        <TOCsidedrawer
            title="Manage Page"
        >
            <AdminTOC />
        </TOCsidedrawer>
    )
}

export default managePageSidedrawer;