/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMessages = /* GraphQL */ `subscription OnCreateMessages(
  $filter: ModelSubscriptionMessagesFilterInput
  $author: String
) {
  onCreateMessages(filter: $filter, author: $author) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMessagesSubscriptionVariables,
  APITypes.OnCreateMessagesSubscription
>;
export const onUpdateMessages = /* GraphQL */ `subscription OnUpdateMessages(
  $filter: ModelSubscriptionMessagesFilterInput
  $author: String
) {
  onUpdateMessages(filter: $filter, author: $author) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMessagesSubscriptionVariables,
  APITypes.OnUpdateMessagesSubscription
>;
export const onDeleteMessages = /* GraphQL */ `subscription OnDeleteMessages(
  $filter: ModelSubscriptionMessagesFilterInput
  $author: String
) {
  onDeleteMessages(filter: $filter, author: $author) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMessagesSubscriptionVariables,
  APITypes.OnDeleteMessagesSubscription
>;
