import React, {useState, useEffect} from 'react'
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from './components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({})

    const fetchProducts = async () =>{  
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, []);

    const handleToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart)
    }


    return (
        <Router>
        <div>
           <Navbar totalItems={ cart.total_items }/>
           <Switch>
              <Route exact path="/">
                <Products products={products} onAddToCart={handleToCart} />
              </Route>
              <Route exact path="/cart">
                  <Cart cart={cart} />
              </Route>
           </Switch>
        </div>
        </Router>
    )
}

export default App;
