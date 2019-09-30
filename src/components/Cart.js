import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import PropertyCard from "./PropertyCard";

let investor_id = 0;
let property_id = 0;
let amount = 0;

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            sideBarStatus: { properties: "", dashboard: "", holdings: "" }
        };
    }

    makePurchase = () => {
        this.props.cart.map(purchase => {
            investor_id = purchase.investorId;
            property_id = purchase.property.id;
            amount = purchase.amount;
            // console.log(JSON.stringify(purchase.investorId, purchase.property.id, purchase.amount))
            console.log(
                JSON.stringify({
                    holding: { investor_id, property_id, amount }
                })
            );
            fetch("http://localhost:3000/api/v1/holdings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    holding: { investor_id, property_id, amount }
                })
            });
        });
    };

    handleClick = () => {
        this.makePurchase()
        this.props.clearCart()
    }

    render() {
        console.log("checkout:", this.props);
        return (
            <>
                <Header
                    cart={this.props.cart}
                    loginState={this.props.loginState}
                    logout={this.props.logout}
                />
                <div className="d-flex align-items-stretch">
                    <SideBar sideBarStatus={this.state.sideBarStatus} />
                    <div className="page-content">
                        <div className="page-header no-margin-bottom">
                            <div className="container-fluid">
                                <h2 className="h5 no-margin-bottom">Cart</h2>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">Cart</li>
                            </ul>
                        </div>
                        <section>
                            <div className="container-fluid"></div>
                            <h1 className="col-11 text-primary">Checkout</h1>
                            {this.props.cart.length > 0 ? (
                                <div className="container-fluid">
                                    <div
                                        className="row"
                                        style={{ marginBottom: "2rem" }}
                                    >
                                        <div className="col-md-6 col-lg-3">
                                            <Link
                                                to="/properties"
                                                className="btn btn-primary"
                                            >
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {this.props.cart.map(cartItem => {
                                            return (
                                                <>
                                                    <div className="col-md-6 col-lg-3">
                                                        <PropertyCard
                                                            key={
                                                                cartItem
                                                                    .property.id
                                                            }
                                                            property={
                                                                cartItem.property
                                                            }
                                                            tempHouseImages={
                                                                this.props
                                                                    .tempHouseImages
                                                            }
                                                            holdings={
                                                                this.props
                                                                    .holdings
                                                            }
                                                        />
                                                        {cartItem.amount}
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                    <div
                                        className="row"
                                        style={{ marginBottom: "2rem" }}
                                    >
                                        <div className="col-md-6 col-lg-3">
                                            <Link
                                                to="/ordersuccessful"
                                                className="btn btn-primary"
                                                onClick={this.handleClick()
                                                }
                                            >
                                                Place Order
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="col-md-6 col-lg-3">
                                    Your cart is empty.
                                </p>
                            )}
                        </section>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
}

export default Cart;
