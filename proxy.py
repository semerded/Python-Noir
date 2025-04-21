from flask import Flask, request, Response
import requests

app = Flask(__name__)

@app.route('/proxy', methods=['GET', 'POST', 'OPTIONS'])
def proxy():
    target_url = request.args.get('url')
    if not target_url:
        return 'Missing URL', 400

    if request.method == 'OPTIONS':
        # Handle preflight
        response = Response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS'
        return response

    if request.method == 'POST':
        resp = requests.post(target_url, data=request.data, headers=request.headers)
    else:
        resp = requests.get(target_url, headers=request.headers)

    excluded = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(k, v) for k, v in resp.raw.headers.items() if k.lower() not in excluded]

    proxy_response = Response(resp.content, resp.status_code, headers)
    proxy_response.headers['Access-Control-Allow-Origin'] = '*'
    return proxy_response

if __name__ == '__main__':
    app.run(port=5000)
