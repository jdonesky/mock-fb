
import React, {useState, useEffect,useRef} from 'react'
import {connect} from 'react-redux'
import axios from '../../../axios/db-axios-instance'

function searchBar({loadData,dbDoc,token}) {

    const [searchTerm, setSearchTerm] =  useState('')
    const userInputRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length) {
                if (searchTerm === userInputRef.current.value) {
                    let query = `/${dbDoc}.json?auth=${token}&orderBy="name"&equalTo="${searchTerm}"`
                    console.log(query)
                    axios.get(query)
                        .then(response => {
                            loadData(response.data)
                        })
                        .catch(err => console.log(err));
                }
            }
        },500)
        return () => {
            clearTimeout(timer)
        }
    }, [searchTerm,loadData,userInputRef])

    useEffect(() => {
        console.log(searchTerm)
    })

    return (

        <input
        ref={userInputRef}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        />

    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(searchBar)
