import Data.dataloader
from flask import Flask,request,jsonify
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)

@app.route('/data',methods=['POST','GET'])
 
def process_json():  
       
       company =request.args['CompanyName']
       type = request.args['DataType']
       loader = Data.dataloader.Data()
       data =  loader.LoadData(company,type)
       return jsonify(data)
   

if __name__ =="__main__":
    app.run(debug=True)    
