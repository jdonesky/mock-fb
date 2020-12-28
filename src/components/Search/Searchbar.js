
import React, {useState, useEffect,useRef} from 'react'
import classes from './Searchbar.css'
import Search from '../../assets/images/search'

const searchBar = (props) => {


    const {filterResults, className, iconClass, inputClass, placeholder, currentlySelected, focusOnMount} = props

    const [searchTerm, setSearchTerm] =  useState('')
    const userInputRef = useRef()

    useEffect(() => {
        if (focusOnMount) {
            userInputRef.current.focus();
        }
    }, [])


    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length) {
                if (searchTerm === userInputRef.current.value) {
                    filterResults(searchTerm, currentlySelected, props.baseResults)
                }
            }
        },500)
        return () => {
            clearTimeout(timer)
        }
    }, [searchTerm, filterResults, userInputRef])

    const containerClasses = [classes.Container]
    const iconClasses = [classes.SearchIcon]
    const inputClasses = [classes.Input]
    if (className) {
        containerClasses.push(className);
    }
    if (iconClass) {
        iconClasses.push(iconClass)
    }
    if (inputClass) {
        inputClasses.push(inputClass)
    }

    return (
        <div className={containerClasses.join(" ")}>
            <div className={iconClasses.join(" ")}><Search fill="#8c8c8c"/></div>
            <input
                ref={userInputRef}
                value={searchTerm}
                placeholder={placeholder}
                onChange={(event) => setSearchTerm(event.target.value)}
                className={inputClasses.join(" ")}
            />
        </div>
    )
}


export default searchBar;
