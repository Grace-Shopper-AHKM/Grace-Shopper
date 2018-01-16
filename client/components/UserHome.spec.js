/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './UserHome.js'
import {User, db} from '../../server/db/models'


const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome name={'Cory'} />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome!')
  })
})



describe('Home Page', () => {
  let userHomeComponent

  beforeEach(() => {
    userHomeComponent = shallow(<UserHome name={'doodoo'} isLoggedIn={true} />)
  })
  
  it('renders welcome', () => {
    expect(userHomeComponent.find('h3').text()).to.be.equal('Welcome, doodoo')
  })
})