from functools import wraps

from flask import Response, request


def add_cors_preflight_headers(response):
    allow_request = "foo" in request.origin
    response.headers["Access-Control-Expose-Headers"] = "*"
    if allow_request:
        response.headers["Access-Control-Allow-Origin"] = request.origin
    if request.method == "OPTIONS":
        response.headers[
            "Access-Control-Allow-Methods"
        ] = "GET, OPTIONS, POST, PUT, DELETE"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        # Allow chrome to access private network ajax requests
        response.headers["Access-Control-Allow-Private-Network"] = "true"
    return response


def handle_cors(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        if request.method == "OPTIONS":
            response = Response()
            response.headers["Access-Control-Expose-Headers"] = "*"
        else:
            response = func(*args, **kwargs)
        response = add_cors_preflight_headers(response)
        return response

    return decorator
