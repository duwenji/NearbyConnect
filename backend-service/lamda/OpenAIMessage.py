import json
import boto3
import logging
from openai import OpenAI

from decimal import Decimal
from lamda.utils import DecimalEncoder, get_secret

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Messages')

secret_name = "near_by_connect_keys"
openai_api_key_name = "openai_api_key"
openai_api_key = get_secret(secret_name, openai_api_key_name)

openAIClient = OpenAI(api_key = openai_api_key)

def generate_message_G1(event, context):
    logger.info("event: %s", event)

    body = json.loads(event['body'])
    prompt = body['prompt']

    response = openAIClient.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": prompt
                }
            ]
            },
            {
            "role": "assistant",
            "content": [
                {
                "type": "text",
                "text": """あなたは、あなたの推論をステップバイステップで説明するエキスパートの AI アシスタントです。
各ステップには、そのステップで何を行っているかを説明するタイトルと内容を入力します。
別のステップが必要かどうか、または最終的な答えを出す準備ができているかどうかを決定します。 
「title」、「content」、および「next_action」（「Continue」または「final_answer」）キーを使用して応答します。できるだけ多くの推論ステップを使用します。少なくとも 3.
LLM としての限界と、できることとできないことを認識してください。
推論には、別の答えの検討を含めてください。
自分が間違っている可能性があることを考えてください。
また、自分の推論が間違っているとしたら、どこが間違っているのかを考えてください。
他のすべての可能性を完全にテストします。
間違っている可能性もあります。再検討していると言ったら、実際に再検討し、別のアプローチを使用してください。 
「再検査中」とだけ言わないでください。
少なくとも 3 つの方法を使用して答えを導き出します。
ベストプラクティスを使用してください。"""
                }
            ]
            }
        ],
        temperature=1,
        max_tokens=2048,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        response_format={
            "type": "text"
        }
    )
    logger.info("response: %s", response)

    message = response.choices[0].message.content
    logger.info("message: %s", message)

    return {
        'statusCode': 200,
        'body': json.dumps({'message': message})
    }

def generate_message(event, context):
    logger.info("event: %s", event)

    body = json.loads(event['body'])
    prompt = body['prompt']

    response = openAIClient.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": prompt
                }
            ]
            },
            {
            "role": "assistant",
            "content": [
                {
                "type": "text",
                "text": "Hello! How can I assist you today?"
                }
            ]
            }
        ],
        temperature=1,
        max_tokens=2048,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        response_format={
            "type": "text"
        }
    )
    logger.info("response: %s", response)

    message = response.choices[0].message.content
    logger.info("message: %s", message)

    return {
        'statusCode': 200,
        'body': json.dumps({'message': message})
    }