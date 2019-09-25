import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Properties from "./components/Properties.js";
import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import Cart from "./components/Cart.js";
import DashBoard from "./components/DashBoard.js";
import LogOut from "./components/LogOut";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
// import SideBar from "./components/SideBar.js";
import Property from "./components/Property.js";
import Profile from "./components/Profile.js";
import Holdings from "./components/Holdings.js";

import tempHouse1 from "/Users/flatironschool/Development/sunset-investing/src/images/1-Alara-Ariel-Elite_Front-Elevation_1920.jpg";
import tempHouse2 from "/Users/flatironschool/Development/sunset-investing/src/images/1-Estrella-Altamira_Front-Elevation_920.jpg";
import tempHouse3 from "/Users/flatironschool/Development/sunset-investing/src/images/01-Palisades-Santee_Front-Elevation-Twilight_920.jpg";
import tempHouse4 from "/Users/flatironschool/Development/sunset-investing/src/images/1-Solano-Artemis_Front-Elevation_1920.jpg";
import tempHouse5 from "/Users/flatironschool/Development/sunset-investing/src/images/07-Canyon-Oaks-Sage_Front-Elevation_CC_920.jpg";
import tempHouse6 from "/Users/flatironschool/Development/sunset-investing/src/images/14-025-03-Rear-Exterior-over-Fire-Pit.jpg";
const tempHouseImages = {1: [tempHouse1], 2: [tempHouse3], 3: [tempHouse6], 4: [tempHouse4], 5: [tempHouse5], 6: [tempHouse2]}

// blue reference: #37cfdc
// API key= AIzaSyAeXRNUoDujYVkiyawNAFhf7oFDe8vcFn8

const BASE_URL = "http://localhost:3000/api/v1";
const PROPERTIES = "/properties";
const HOLDINGS = "/holdings";
const INVESTORS = "/ investors";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            properties: [],
            holdings: [],
            investors: [],
            cart: []
        };
    }

    componentDidMount() {
        fetch(BASE_URL + PROPERTIES)
            .then(resp => resp.json())
            .then(json =>
                this.setState({ properties: json }, console.log(json)));
        fetch(BASE_URL + HOLDINGS)
            .then(resp => resp.json())
            .then(json => 
                this.setState({ holdings: json }, console.log(json)));
        fetch(BASE_URL + INVESTORS)
            .then(resp => resp.json())
            .then(json =>
                this.setState({ investors: json }, console.log(json))
            );
    }

    sumPropertyHeld = () => {
        let total_held = {}
        this.state.holdings.map(holding => {
            total_held[holding.property_id] = (total_held[holding.property_id]+holding.amount) || holding.amount;            
        })
        return total_held
    }

    addToCart = property => {
        if (!this.state.cart.includes(property)) {
            this.setState({ cart: [...this.state.cart, property] });
        }
    };
    
    
    
    render() {
    return (
            <Router>
                <Header />
                <div className="d-flex align-items-stretch">
                    {/* <SideBar /> */}
                    <Route path="/" exact component={Home} />

                    <Route
                        path="/properties"
                        exact
                        render={props => (
                            <Properties
                                {...props}
                                properties={this.state.properties}
                                holdings={this.state.holdings}
                                tempHouseImages={tempHouseImages}
                            />
                        )}
                    />
                    {/* <Route path="/property" component={Property} /> */}
                    <Route
                        path="/properties/:id"
                        // exact
                        render={props => (
                            <Property
                                {...props}
                                property={this.state.properties}
                                sumPropertyHeld={this.sumPropertyHeld}
                                addToCart={this.addToCart}
                            />
                        )}
                    />

                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/signup" component={SignUp} />
                    <Route
                        path="/dashboard"
                        exact
                        render={props => (
                            <DashBoard holdings={this.state.holdings} />
                        )}
                    />
                    <Route
                        path="/holdings"
                        exact
                        render={props => (
                            <Holdings holdings={this.state.holdings} />
                        )}
                    />
                    {/* <Route path="/cart" component={Cart} /> */}
                    <Route
                        path="/cart"
                        exact
                        render={props => (
                            <Cart
                                {...props}
                                cart={this.state.cart}
                                tempHouseImages={tempHouseImages}
                                holdings={this.state.holdings}
                            />
                        )}
                    />
                    <Route path="/profile" component={Profile} />
                </div>
                <Footer />
            </Router>
        );
    }
}

export default App;
