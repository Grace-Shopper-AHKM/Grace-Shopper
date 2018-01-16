import React from 'react';
import enzyme, {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import createRouterContext from 'react-router-test-context';
import {Route, Switch, Router} from 'react-router-dom';

import AllBooks from './AllBooks';
import {SingleBook} from './SingleBook';
import Cart from './Cart';
import CartItems from './CartItems';
import store from '../store';

const con = console.log;

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Cart functionality', () => {
    let book;
    let SingleBookComponent;

    beforeEach(() => {
        book = {
            id: 22,
            author: 'HH',
            title: 'Poby',
            description: 'A book about Poby'
        }
        SingleBookComponent = shallow(<SingleBook match={{params: {bookId: book.id}}} loadBooks={(id) => {}} loadReviews={() => {}} book={book} reviews ={[]} handleSubmit= {() =>{}} maxQuantity={0}/> );
    });

    it('Adding a new book to cart', () => {
        expect(SingleBookComponent.find('h3').text()).to.be.equal('Poby');

    })
})

describe('CartItem functions ', () => {

    let book, CartItemsComp, item, CartComp;

    beforeEach('Create <CartItem /> wrapper', () => {
        book = {
            id: 22,
            author: 'HH',
            title: 'Poby',
            description: 'A book about Poby'
        }
        item = {book};
        CartItemsComp = shallow(<CartItems item={item}/>);
    });

    it('check CartItem ', () => {
        expect(CartItemsComp.find('h3').text()).to.be.equal('Poby');
    });

})

