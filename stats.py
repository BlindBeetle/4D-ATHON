import pandas as pd

class Ratio:
    def __init__(self):
        self.trash = 0.7

    def reload_data(self):
        try:
            self.data = pd.read_csv('donations.csv', header=None)
        except FileNotFoundError:
            self.data = pd.DataFrame(columns=[0, 1, 2, 3])

    def total_donations(self):
        try:
            self.reload_data()
            self.data[2] = pd.to_numeric(self.data[2], errors="coerce")
            return float(self.data[2].sum())
        except Exception as e:
            print(f"Error while collecting money: {e}")
            return 0

    def trash_calc(self):
        try:
            return self.total_donations() * self.trash
        except Exception as e:
            print(f"Error while collecting trash: {e}")
            return 0

    def output(self):
        return {"total_donations": self.total_donations(), "trash_ratio": self.trash_calc()}