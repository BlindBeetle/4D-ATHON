import pandas as pd
import ast

def rank_donations():
    data = pd.read_csv('rankingDonation.csv', header=None)
    data_dicts = [ast.literal_eval(row[0]) for index, row in data.iterrows()]

    data_df = pd.DataFrame(data_dicts)

    sorted_donations = data_df.sort_values(by='totalDonation', ascending=False)

    return sorted_donations

    
