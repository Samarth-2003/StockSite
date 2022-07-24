from alpha_vantage.timeseries import TimeSeries

class Data():
    def __init__(self):
        self.API_key = "9736384N20VR8Z2B"
        
        self.ts = TimeSeries(key = self.API_key)

    def LoadData(self,Company,type):
        companyList = { 'apple':'AAPL', 'ibm': 'IBM','microsoft':'MSFT','netflix':'NFLX','meta':'META'}
        if type == 'daily':
             data = self.ts.get_daily(companyList[Company.lower()])
        elif type == 'monthly':
            data = self.ts.get_monthly(companyList[Company.lower()])
        elif type == 'intra-day':
            data = self.ts.get_intraday(companyList[Company.lower()])
        elif type == 'weekly':
            data = self.ts.get_weekly(companyList[Company.lower()])             
       

       
        return data[0]