from flask import Flask, request, jsonify, render_template
from sorting_totalDonation import rank_donations
from stats import Ratio
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)

ratio = Ratio()
user_inputs = []

@app.route('/data_submit', methods=['POST'])
def add_input():
    data = request.json
    if data:
        user_inputs.append(data)

        with open('donations.csv', mode='a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=data.keys())
            if file.tell() == 0:
                writer.writeheader()
            writer.writerow(data)

        with open("templates/ranked_donations.csv", mode='w', newline='') as file: 
            ranked_donos = rank_donations()

            ranked_donos_dicts = ranked_donos.to_dict(orient='records')

            writer = csv.DictWriter(file, fieldnames=ranked_donos.columns)
            if file.tell() == 0:
                writer.writeheader()

            writer.writerows(ranked_donos_dicts)

        return jsonify({"message": "Inputlar başarıyla algılandı", "inputs": user_inputs}), 200
        

    return jsonify({"error": "Inputlar algılanamadı"}), 400

@app.route('/data_view', methods=['GET'])
def get_inputs():
    return jsonify({"inputs": user_inputs}), 200

@app.route('/donation_values', methods=['GET'])
def get_values():
    callback = request.args.get("callback", "callback")
    try:
        data = {"status": "success", "values": ratio.output()}
        response = f"{callback}({jsonify(data).get_data(as_text=True)})"
        return response, 200, {"Content-Type": "application/javascript"}
    except Exception as e:
        error_data = {"status": "error", "message": str(e)}
        response = f"{callback}({jsonify(error_data).get_data(as_text=True)})"
        return response, 500, {"Content-Type": "application/javascript"}

if __name__ == '__main__':
    app.run(debug=True)

