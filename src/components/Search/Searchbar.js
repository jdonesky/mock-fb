
import React, {useState, useEffect,useRef} from 'react'
import {connect} from 'react-redux'
import axios from '../../axios/db-axios-instance'
import classes from './Searchbar.css'
import Search from '../../assets/images/search'

const searchBar = ({loadData,dbDoc,token}) => {

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
        <div className={classes.Container}>
            <div className={classes.SearchIcon}><Search /></div>
            <input
                ref={userInputRef}
                value={searchTerm}
                placeholder="Where are you?"
                onChange={(event) => setSearchTerm(event.target.value)}
                className={classes.Input}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(searchBar)
