import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
export const SearchBar = (props) => {
    const { books, searchBooks } = props

    return (
        <div>
            <form>
                <input id="search-bar"
                    type="text"
                    placeholder="Search by title here..."
                    onChange={(evt) => {
                        searchBooks(books, evt.target.value);
                    }}
                />
            </form>
        </div>
    )
}
