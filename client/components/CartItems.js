import React from 'react';

export default class CartItems extends React.Component{
    render(){
        return(
            <div className="shoppingcartitems">
                <div style={{width: '10%'}}>
                    <div style={{width: '70%', height: '70%'}}><img className='itemimages' src='https://images-na.ssl-images-amazon.com/images/I/51Kb27EcNPL._SL500_SR90,135_.jpg' /></div>
                </div>
                <div style={{width: '50%'}}>This book is damn good. you will read it 100 times</div>
                <div style={{width: '20%'}}>$55.66</div>
                <div style={{width: '20%'}}>3</div>
            </div>
        )
    }
}