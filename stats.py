import numpy as np
import pandas as pd

class Ratio:
    def __init__(self):
        self.outputs = []
        self.trash = 0.7
        self.data = pd.read_csv('donations.csv', header=None)

    def total_donations(self):
        return self.data[2].sum()
    
    def ratio(self):
        return self.total_donations()*self.trash
    
    def output(self):
        return self.outputs.append(self.total_donations(), self.ratio())
        
