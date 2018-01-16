import React from 'react';
import enzyme, {shallow} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16'
import AllBooks from '../client/components/AllBooks';
import SingleBook from '../client/components/SingleBook';
import Cart from '../client/components/Cart';
import store from '../client/store';

const con = console.log;

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Cart functionality', () => {

    //beforeEach('', () => {});

    it('Adding a new book to cart', () => {
        const book = {
            id: 22,
            author: 'HH',
            title: 'Poby',
            description: 'A book about Poby'
        }
        //con('aaaaaaaaaaaa', store.getState());
        //const AllBooksComp = shallow(<AllBooks />);
        const SingleBookComponent = shallow(<SingleBook book={book}/>);
        con('bbbbbbbbbbbb', SingleBookComponent);
        //con('ccccccccccc', store.getState());
        expect(SingleBookComponent.find('h5').text()).to.be.equal('HH');
    })
})

