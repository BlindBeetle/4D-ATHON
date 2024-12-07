from flask import Flask, request, jsonify
from sorting_totalPoint import rank_donations
from flask_cors import CORS
import pandas as pd
import csv

app = Flask(__name__)
CORS(app)

user_inputs = []

@app.route('/data_submit', methods=['POST'])
def add_input():
    data = request.json
    if data:
        user_inputs.append(data)

        with open('rankingDonation.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([data])
            
        ranked_donos = rank_donations()
        with open("ranked_donations.csv", mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow([ranked_donos])   
        
        return jsonify({"message": "Inputs succesfully received", "inputs": user_inputs}), 200
        
    return jsonify({"error": "Inputs not received"}), 400


@app.route("/load_rankings", methods=["POST"])
def load_rankings():
    file_path = "ranked_donations.csv"
    data = pd.read_csv(file_path)
    rankings = data.to_dict(orient="records")
    
    return jsonify({"status": "success", "rankings": rankings})
    

@app.route('/data_view', methods=['GET'])
def get_inputs():
    return jsonify({"inputs": user_inputs}), 200

if __name__ == '__main__':
    app.run(debug=True)

