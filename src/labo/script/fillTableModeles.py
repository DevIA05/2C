from model.models import Modeles
import os
import random

print("working dir: " + os.getcwd())


# ============================================================================
#                             Models
# ============================================================================


d = [ 
    { "path": "models/monet.h5", "name": "monet", "listctg": ["tulipe", "rose", "tournesol"], "perf": random.random() },
    { "path": "models/dali.h5", "name": "dali", "listctg": ["tulipe", "rose", "tournesol", "pizza", "gateau"], "perf": random.random() }
]
     
for modele in d:
    Modeles.objects.create(pathmodele=modele["path"], namemodel=modele["name"], 
                           listctg=", ".join(modele["listctg"]), perf=modele["perf"])


