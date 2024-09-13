from flask import Flask, render_template, request, jsonify
from datetime import datetime
import pytz

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_time():
    data = request.json
    input_time = datetime.fromisoformat(data['time'])
    input_timezone = data['timezone']
    
    results = {}
    for tz in pytz.all_timezones:
        target_timezone = pytz.timezone(tz)
        converted_time = input_time.astimezone(target_timezone)
        results[tz] = converted_time.strftime('%Y-%m-%d %H:%M:%S')
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
