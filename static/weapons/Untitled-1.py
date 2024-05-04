import json
import os
import requests
import time

f = open("C:/Users/nicke/Downloads/weapons.json")
data = json.load(f)
'''
statParams = {
    'action': "query",
    'titles': "file:Burnt_Sienna.png",
    'prop': 'imageinfo',
    'format': "json"
}
url = "https://calamitymod.wiki.gg/api.php"

res = requests.get(url=url, params=statParams)
data = res.json()
print(data)'''

for weapon in data:
    name = weapon.replace(" ", "_")
    img_data = requests.get(f'https://calamitymod.wiki.gg/Special:FilePath/File:{name}.png').content
    with open(f'{name}.png', 'wb') as handler:
        handler.write(img_data)
    time.sleep(1)