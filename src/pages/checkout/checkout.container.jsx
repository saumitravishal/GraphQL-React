import React from "react";
import { Query, Mutation, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { flowRight } from "lodash";

import Checkout from "./checkout.component";

const GET_CART_ITEMS_AND_TOTAL = gql`
  {
    cartItems @client
    cartTotal @client
  }
`;

const CheckOutContainer = ({ data: { cartItems, cartTotal } }) => {
  return <Checkout cartItems={cartItems} total={cartTotal} />;
};

export default flowRight(graphql(GET_CART_ITEMS_AND_TOTAL))(CheckOutContainer);
