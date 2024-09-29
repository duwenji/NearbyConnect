/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMessagesInput = {
  id?: string | null,
  author: string,
  title: string,
  location: LocationInput,
  media_type: string,
  description: string,
  priority: number,
  tags?: Array< string | null > | null,
  contents?: string | null,
};

export type LocationInput = {
  latitude?: number | null,
  longitude?: number | null,
};

export type ModelMessagesConditionInput = {
  author?: ModelStringInput | null,
  title?: ModelStringInput | null,
  media_type?: ModelStringInput | null,
  description?: ModelStringInput | null,
  priority?: ModelIntInput | null,
  tags?: ModelStringInput | null,
  contents?: ModelStringInput | null,
  and?: Array< ModelMessagesConditionInput | null > | null,
  or?: Array< ModelMessagesConditionInput | null > | null,
  not?: ModelMessagesConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Messages = {
  __typename: "Messages",
  id: string,
  author: string,
  title: string,
  location: Location,
  media_type: string,
  description: string,
  priority: number,
  tags?: Array< string | null > | null,
  contents?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Location = {
  __typename: "Location",
  latitude?: number | null,
  longitude?: number | null,
};

export type UpdateMessagesInput = {
  id: string,
  author?: string | null,
  title?: string | null,
  location?: LocationInput | null,
  media_type?: string | null,
  description?: string | null,
  priority?: number | null,
  tags?: Array< string | null > | null,
  contents?: string | null,
};

export type DeleteMessagesInput = {
  id: string,
};

export type ModelMessagesFilterInput = {
  id?: ModelIDInput | null,
  author?: ModelStringInput | null,
  title?: ModelStringInput | null,
  media_type?: ModelStringInput | null,
  description?: ModelStringInput | null,
  priority?: ModelIntInput | null,
  tags?: ModelStringInput | null,
  contents?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMessagesFilterInput | null > | null,
  or?: Array< ModelMessagesFilterInput | null > | null,
  not?: ModelMessagesFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelMessagesConnection = {
  __typename: "ModelMessagesConnection",
  items:  Array<Messages | null >,
  nextToken?: string | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelSubscriptionMessagesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  media_type?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  priority?: ModelSubscriptionIntInput | null,
  tags?: ModelSubscriptionStringInput | null,
  contents?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMessagesFilterInput | null > | null,
  or?: Array< ModelSubscriptionMessagesFilterInput | null > | null,
  author?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateMessagesMutationVariables = {
  input: CreateMessagesInput,
  condition?: ModelMessagesConditionInput | null,
};

export type CreateMessagesMutation = {
  createMessages?:  {
    __typename: "Messages",
    id: string,
    author: string,
    title: string,
    location:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    },
    media_type: string,
    description: string,
    priority: number,
    tags?: Array< string | null > | null,
    contents?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMessagesMutationVariables = {
  input: UpdateMessagesInput,
  condition?: ModelMessagesConditionInput | null,
};

export type UpdateMessagesMutation = {
  updateMessages?:  {
    __typename: "Messages",
    id: string,
    author: string,
    title: string,
    location:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    },
    media_type: string,
    description: string,
    priority: number,
    tags?: Array< string | null > | null,
    contents?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMessagesMutationVariables = {
  input: DeleteMessagesInput,
  condition?: ModelMessagesConditionInput | null,
};

export type DeleteMessagesMutation = {
  deleteMessages?:  {
    __typename: "Messages",
    id: string,
    author: string,
    title: string,
    location:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    },
    media_type: string,
    description: string,
    priority: number,
    tags?: Array< string | null > | null,
    contents?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetMessagesQueryVariables = {
  id: string,
};

export type GetMessagesQuery = {
  getMessages?:  {
    __typename: "Messages",
    id: string,
    author: string,
    title: string,
    location:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    },
    media_type: string,
    description: string,
    priority: number,
    tags?: Array< string | null > | null,
    contents?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMessagesQueryVariables = {
  id?: string | null,
  filter?: ModelMessagesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessagesConnection",
    items:  Array< {
      __typename: "Messages",
      id: string,
      author: string,
      title: string,
      media_type: string,
      description: string,
      priority: number,
      tags?: Array< string | null > | null,
      contents?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type MessagesByAuthorAndPriorityQueryVariables = {
  author: string,
  priority?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMessagesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MessagesByAuthorAndPriorityQuery = {
  messagesByAuthorAndPriority?:  {
    __typename: "ModelMessagesConnection",
    items:  Array< {
      __typename: "Messages",
      id: string,
      author: string,
      title: string,
      media_type: string,
      description: string,
      priority: number,
      tags?: Array< string | null > | null,
      contents?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMessagesSubscriptionVariables = {
  filter?: ModelSubscriptionMessagesFilterInput | null,
  author?: string | null,
};

export type OnCreateMessagesSubscription = {
  onCreateMessages?:  {
    __typename: "Messages",
    id: string,
    author: string,
    title: string,
    location:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    },
    media_type: string,
    description: string,
    priority: number,
    tags?: Array< string | null > | null,
    contents?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessagesSubscriptionVariables = {
  filter?: ModelSubscriptionMessagesFilterInput | null,
  author?: string | null,
};

export type OnUpdateMessagesSubscription = {
  onUpdateMessages?:  {
    __typename: "Messages",
    id: string,
    author: string,
    title: string,
    location:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    },
    media_type: string,
    description: string,
    priority: number,
    tags?: Array< string | null > | null,
    contents?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessagesSubscriptionVariables = {
  filter?: ModelSubscriptionMessagesFilterInput | null,
  author?: string | null,
};

export type OnDeleteMessagesSubscription = {
  onDeleteMessages?:  {
    __typename: "Messages",
    id: string,
    author: string,
    title: string,
    location:  {
      __typename: "Location",
      latitude?: number | null,
      longitude?: number | null,
    },
    media_type: string,
    description: string,
    priority: number,
    tags?: Array< string | null > | null,
    contents?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
