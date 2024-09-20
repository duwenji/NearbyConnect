import os
import json
import boto3

table_name = os.environ.get('CONNECTIONS_TABLE')

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(table_name)

def send_to_client(domain, stage, connection_id, message):
    endpoint_url = f"https://{domain}/{stage}"
    gatewayapi = boto3.client('apigatewaymanagementapi', endpoint_url=endpoint_url)

    try:
        response = gatewayapi.post_to_connection(
            ConnectionId=connection_id,
            Data=json.dumps(message)
        )
    except gatewayapi.exceptions.GoneException:
        table.delete_item(Key={'connectionId': connection_id})

    return response

def broadcast_message(message):
    connections = table.scan()['Items']
    for connection in connections:
        connection_id = connection['connectionId']
        send_to_client(
            connection['domainName'], 
            connection['stage'], 
            connection_id, 
            {'message': message})

def connect(event, context):
    logger.info("event: %s", event)

    connection_id = event['requestContext']['connectionId']
    domain_name = event['requestContext']['domainName']
    stage = event['requestContext']['stage']

    table.put_item(Item={
        'connectionId': connection_id,
        'domainName': domain_name,
        'stage': stage
        })
    return {
        'statusCode': 200,
        'body': json.dumps('Connected.')
    }

def disconnect(event, context):
    logger.info("event: %s", event)

    connection_id = event['requestContext']['connectionId']
    table.delete_item(Key={
        'connectionId': connection_id
        })
    return {
        'statusCode': 200,
        'body': json.dumps('Disconnected.')
    }

def message(event, context):
    logger.info("event: %s", event)

    message = event['body']
    broadcast_message(message)

    return {
        'statusCode': 200,
        'body': json.dumps('Message received.')
    }

def default(event, context):
    logger.info("event: %s", event)

    message = event['body']

    broadcast_message(message)

    return {
        'statusCode': 200,
        'body': json.dumps('Message processed by default handle.')
    }