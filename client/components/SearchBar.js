import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
export const SearchBar = (props) => {
    const { searchBooks, loadBooks } = props

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Search by title here..."
                    onChange={(evt) => {
                        loadBooks();
                        searchBooks(evt.target.value);
                    }}
                />
            </form>
        </div>
    )
}
