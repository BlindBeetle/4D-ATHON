import pandas as pd

def rank_donations():
    data = pd.read_csv('donations.csv')

    if "donationAmount" not in data.columns:
        raise ValueError("Column 'donationAmount' is missing.")

    sorted_donations = data.sort_values(by='donationAmount', ascending=False)
    
    return sorted_donations

