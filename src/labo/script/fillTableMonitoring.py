from model.models import Monitoring, Modeles
import os
import random
import datetime

print("working dir: " + os.getcwd())

# ============================================================================
#                             Monitoring
# ============================================================================

m = ["dali", "monet"]
d = { "monet": ["tulipe", "rose", "tournesol"], 
     "dali": ["tulipe", "rose", "tournesol", "pizza", "gateau"],     
}

def random_date(start_date, end_date):
    """
    Génère une date aléatoire entre start_date et end_date.
    """
    start_timestamp = datetime.datetime.timestamp(start_date)
    end_timestamp = datetime.datetime.timestamp(end_date)
    random_timestamp = random.uniform(start_timestamp, end_timestamp)
    random_date = datetime.datetime.fromtimestamp(random_timestamp)
    return random_date


start_date = datetime.datetime(2022, 1, 1)
end_date = datetime.datetime(2023, 12, 31)

for i in range(2000):
    date = random_date(start_date, end_date)
    k = random.choice(list(d.keys()))
    v = random.choice(d[k])
    idm = random.choice([1, 2])
    Monitoring.objects.create(date = date.strftime('%d/%m/%Y'), idmodele=Modeles.objects.get(id=idm), 
                              ctgbyuser = v, pathimg= "( ^_^)／ 凸(｀0´)凸", ctgbymodel= "(╯ರ ~ ರ)╯︵┻━┻ ",
                              accuracy=random.random())
    print("ajouté: " + str(i))
