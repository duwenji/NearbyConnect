import json
import boto3

from decimal import Decimal

secretsmanager = boto3.client('secretsmanager')

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)


def get_secret(secret_name, key_name):
    response = secretsmanager.get_secret_value(SecretId=secret_name)
    secret = json.loads(response['SecretString'])
    return secret.get(key_name)