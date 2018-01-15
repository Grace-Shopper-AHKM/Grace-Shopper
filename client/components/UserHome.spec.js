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
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email={'han@email.com'} />)
    
    return db.sync({force: true})
    .then(() => {
      User.create({ 
        firstName: 'han', lastName: 'h', email: 'email@eee.om'
      })
    });
    
    

  })

  it('renders welcome', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, han@email.com')
  })
})