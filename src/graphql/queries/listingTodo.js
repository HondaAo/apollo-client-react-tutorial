import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query Listing{
    listing {
      id
      content
      createdAt
    }
  }
`;