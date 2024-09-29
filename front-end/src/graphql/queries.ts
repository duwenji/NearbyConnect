/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getMessages = /* GraphQL */ `query GetMessages($id: ID!) {
  getMessages(id: $id) {
    id
    author
    title
    location {
      latitude
      longitude
      __typename
    }
    media_type
    description
    priority
    tags
    contents
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMessagesQueryVariables,
  APITypes.GetMessagesQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $id: ID
  $filter: ModelMessagesFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMessages(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      author
      title
      media_type
      description
      priority
      tags
      contents
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const messagesByAuthorAndPriority = /* GraphQL */ `query MessagesByAuthorAndPriority(
  $author: String!
  $priority: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMessagesFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByAuthorAndPriority(
    author: $author
    priority: $priority
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      author
      title
      media_type
      description
      priority
      tags
      contents
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.MessagesByAuthorAndPriorityQueryVariables,
  APITypes.MessagesByAuthorAndPriorityQuery
>;
