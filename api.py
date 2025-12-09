from flask import Flask, request, jsonify
from flask_cors import CORS
from exa_py import Exa

app = Flask(__name__)
CORS(app)

exa = Exa("TA_CLE_EXA_ICI")

@app.get("/search")
def search():
    query = request.args.get("q", "")

    if not query:
        return jsonify([])

    response = exa.search(query, num_results=5, type='keyword')

    results = []
    for r in response.results:
        results.append({
            "title": r.title,
            "url": r.url
        })

    return jsonify(results)


if __name__ == "__main__":
    app.run(port=5000)
