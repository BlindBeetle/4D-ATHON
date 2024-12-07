from flask import Flask, request, jsonify
from sorting_totalDonation import rank_donations
from stats import Ratio
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

        with open('donations.csv', mode='a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=data.keys())
            if file.tell() == 0:
                writer.writeheader()
            writer.writerow(data)
            
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

@app.route('/donation_values', methods=['GET'])
def get_values():
    return jsonify({"values": Ratio.output()})

if __name__ == '__main__':
    app.run(debug=True)

