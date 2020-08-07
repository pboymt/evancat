import requests
import json
from os import path

pcr_data_url = "https://raw.githubusercontent.com/Ice-Cirno/HoshinoBot/master/hoshino/modules/priconne/_pcr_data.py"


response = requests.get(pcr_data_url)

exec(response.text)

pcr_json = json.dumps(obj=CHARA_NAME, ensure_ascii=False, indent=2)

pcr_json_path = path.join(path.dirname(
    path.realpath(__file__)), '../statics/pcr-data.json')

f = open(pcr_json_path, mode='w+', encoding="utf-8")
f.write(pcr_json)
f.close()
