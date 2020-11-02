
import React, {useState, useEffect,useRef} from 'react'
import {connect} from 'react-redux'
import classes from './Searchbar.css'
import Search from '../../assets/images/search'

const searchBar = ({filterResults}) => {

    const [searchTerm, setSearchTerm] =  useState('')
    const userInputRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length) {
                if (searchTerm === userInputRef.current.value) {
                    filterResults(searchTerm)
                }
            }
        },500)
        return () => {
            clearTimeout(timer)
        }
    }, [searchTerm, filterResults, userInputRef])

    return (
        <div className={classes.Container}>
            <div className={classes.SearchIcon}><Search fill="#8c8c8c"/></div>
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