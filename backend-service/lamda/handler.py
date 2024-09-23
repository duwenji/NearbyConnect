import json
import boto3
import logging

from decimal import Decimal
from lamda.utils import DecimalEncoder, get_secret

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Messages')

def create_item(event, context):
    logger.info("event: %s", event)

    body = json.loads(event['body'])
    item = {
        'id': body['id'],
        'name': body['name'],
        'longitude': Decimal(str(body['longitude'])),
        'latitude': Decimal(str(body['latitude']))
    }
    logger.info("item: %s", item)

    table.put_item(Item=item)

    return {
        'statusCode': 200,
        'body': json.dumps(item, cls=DecimalEncoder)
    }

def get_item(event, context):
    logger.info("event: %s", event)

    item_id = event['pathParameters']['id']
    response = table.get_item(Key={'id': item_id})

    item = response.get('Item')
    logger.info("item: %s", item)
    
    if item:
        return {
            'statusCode': 200,
            'body': json.dumps(item, cls=DecimalEncoder)
        }
    else:
        return {
            'statusCode': 404,
            'body': json.dumps({'error': 'Item not found'})
        }

def search_by_location(event, context):
    logger.info("event: %s", event)

    longitude = float(event['queryStringParameters']['longitude'])
    latitude = float(event['queryStringParameters']['latitude'])

    response = table.query(
        IndexName='LocationIndex',
        KeyConditionExpression=boto3.dynamodb.conditions.Key('longitude').eq(longitude) & boto3.dynamodb.conditions.Key('latitude').eq(latitude)
    )
    
    items = response.get('Items', [])
    logger.info("items: %s", items)

    return {
        'statusCode': 200,
        'body': json.dumps(items, cls=DecimalEncoder)
    }
