import os
import json
import logging
from langchain_openai import OpenAI
from lamda.utils import DecimalEncoder, get_secret

logger = logging.getLogger()
logger.setLevel(logging.INFO)

secret_name = "near_by_connect_keys"
openai_api_key_name = "openai_api_key"
openai_api_key = get_secret(secret_name, openai_api_key_name)

if "OPENAI_API_KEY" not in os.environ:
    os.environ["OPENAI_API_KEY"] = openai_api_key

def generate_message(event, context):
    logger.info("event: %s", event)

    body = json.loads(event['body'])
    prompt = body['prompt']

    llm = OpenAI()
    response = llm.invoke(prompt)

    logger.info("response: %s", response)

    return {
        'statusCode': 200,
        'body': json.dumps({'message': response})
    }