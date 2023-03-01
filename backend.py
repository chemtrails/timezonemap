import json
from quart import Quart, render_template, request
from timezonefinder import TimezoneFinder


app = Quart(__name__)

@app.route('/')
async def index():
    return await render_template('index.html')

@app.route('/getgeo')
async def gettz():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))

    tf = TimezoneFinder()
    tz = tf.timezone_at(lat=lat, lng=lng)
    geo = tf.get_geometry(tz_name=tz, coords_as_pairs=True)
    
    new_geo = []
    for area in geo:
        new_areas = []
        for poly in area:
            new_poly = [[lat,lng] for [lng,lat] in poly]
            new_areas.append(new_poly)
        new_geo.append(new_areas)

    return json.dumps({
        "geo": new_geo,
        "tz": tz
    })

app.run(debug=True)
