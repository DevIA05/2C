const input = document.getElementById('images');
const preview = document.getElementById('container_img');
const list_modele = ["M1", "M2", "M3"]



let test_mod = {"M1" : ["Chien" , "Chat", "Tortue"],
                "M2" : ['Clavier', 'Souris', 'Ecran'],
                "M3" : ['Burger', 'Frite', 'Pizza']
};

// for (let key in test_mod) {
//   // console.log(key + ' ' + test_mod[key]);
//   n_model = key;
//   n_label = test_mod[key];
//   for(let i = 0; i < n_label.length; i++ ) {
//     console.log(n_label[i])
//   }
// };

const dict_label = [
  { label: "chien", accuracy: 0.5 },
  { label: "chat", accuracy: 0.6 },
  { label: "pizza", accuracy: 0.9 },
  { label: "burger", accuracy: 0.4 },
  { label: "frite", accuracy: 0.2 }
];

const labels = dict_label.map((item) => item.label);


// Fonction pour le bouton dropdown catégorie
function fill_categorie(tableau) {
  const ul = document.createElement("ul");
  ul.classList.add("dropdown-menu");
 
  for (let i = 0; i < tableau.length; i++) {
    const li = document.createElement("li");
    li.classList.add("dropdown-item");
    li.textContent = `Label: ${tableau[i]}`;
    ul.appendChild(li);
    
  }
  return ul
  
}

// Fonction pour le bouton dropdown Modele
function fill_dropdown(id){
  const ul = document.createElement("ul");
  ul.classList.add("dropdown-menu");

  for (let key in test_mod) {
    const li = document.createElement("li");
    li.classList.add("dropdown-item");
    li.classList.add("cli" + id);
    li.textContent = `Modele: ${key}`;
    ul.appendChild(li);
    
  }
  return ul
}


input.addEventListener('change', () => {
    const files = input.files;
    

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const tableau = []
        
        const file_name = file.name;
        const id = "id" + i;
        const func_drop = fill_dropdown(i)
        const fill_cat = fill_categorie(tableau)
        if (file) {
            const reader = new FileReader();
          
            reader.addEventListener('load', () => {
                const img = new Image();
                img.src = reader.result;
                const card = document.createElement("div")
                card.classList.add("col-sm");
                const card_html = `
                  <div class="card" style="width: 12rem;">
                  <img src="${img.src}" id="img_${id}" class="card-img-top" alt="Avatar">
                  <div class="card-body">
                    <h5 class="card-title">
                      ${file_name}
                    </h5>
                  
                    <button onclick="view_details(this)" name="${file_name}" type="button"  class="btn btn-primary" data-bs-toggle="modal" 
                    data-bs-target="#exampleModal_${id}">Voir détails</button>
                    <div class="modal fade" id="exampleModal_${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Détail prédiction</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="container">
                              <div class="row">
                                <div class="col-lg-8 col-md-8 col-sm-12">
                                  <img src="${img.src}" class="img-thumbnail" alt="Avatar" width="200" height="200">
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-12">
                                  <div>
                                    <h5>Choisir le modèle</h5>
                                    <div class="dropdown">
                                      <button id="btn_id${i}" onclick="select_btn(this)" name="btn_select" class="btn btn-secondary dropdown-toggle" 
                                      type="button"data-bs-toggle="dropdown" aria-expanded="false">
                                      Modele
                                      </button>
                                      ${func_drop.outerHTML}
                                    </div>
                                    
                                    <br><br>
                                    <div>
                                      <button id="button2${i}" onclick="show_pred(${i})" class="btn btn-secondary" type="button">Prédire</button>
                                      <h4 id="pred_${id}"></h4>
                                      <h4 id="label_${id}">Something</h4>
                                      </div>
                                  </div>
                              
                                  <h5 class="button-title">
                                      Faire le monitoring
                                    </h5>
                                    <div class="dropdown">
                                      <button id="btn_cat_id${i}" onclick="select_btn(this)" class="btn btn-secondary
                                      dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      Catégorie
                                      </button>
                                      ${fill_cat.outerHTML}
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onclick="recup_data(this,${i})" type="button" class="btn btn-primary">Sauvegarde pour le monitoring</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    `
                card.innerHTML = card_html
                preview.appendChild(card);
              });
            reader.readAsDataURL(file);
          }
        }
        
      }
      
);

let txt_model = 'M1'
let txt_label = ''


/** Met à jour la valeur du bouton
 * en fonction de l'élément séléctionné dans la liste dropdown
 * @param {object} button, l'élément html du bouton cliqué
 */ 
function select_btn(button) {
  // Récupération du bouton et de la liste déroulante à partir de l'élément bouton fourni en paramètre
  const btn = document.getElementById(button.id);
  const ulElement = button.nextElementSibling;
  const dropdownItems = ulElement.querySelectorAll("li");
  
  // Attend que l'utilisateur clique sur un élément de la liste déroulante pour récupérer la valeur de l'élément
  // Récupère la valeur séléctionnée dans la liste déroule et remplace la valeur du bouton par la valeur séléctionnée
  function waitForClick() {
    return new Promise(resolve => {
      dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
          const selectedText = item.textContent.trim();
          btn.textContent = selectedText
          resolve(selectedText);
        });
      });
    });
  }

  // Attente de la sélection d'un élément de la liste déroulante pour récupérer la valeur
  // retourne le nom du modèle 
  async function getValue() {
    const selectedText = await waitForClick();
    const regex2 = /\s(\S+)$/;
    return selectedText.match(regex2)[1].trim()
  }

  // Met à jour les catégories disponible dans la liste déroule catégorie selon le modèle séléctionné précédemment 
  getValue().then(value => { updateListLabel(value, btn) });

}

/** Met à jour les catégories dans la liste déroulante
 * Remplace l'élément html ul par un nouveau comportant des li comportant les catégories du modèle séléctionné 
 * @param {str} selectedModel, le modèle séléctionné dans la liste déroulante model 
 * @param {object} btn, l'élément html bouton concernant le model  
 * return none
 */
function updateListLabel(selectedModel, btn) {

  const ctg = test_mod[selectedModel]; // Récupération des catégories selon le nom du modèle

  // On récupère l'id du bouton concernant la catégorie puis le bouton lui-même
  const idBtn_ctg =  btn.id.replace("btn_", "btn_" + "cat" + "_"); 
  const btn_ctg = document.getElementById(idBtn_ctg)

  const oldUl_ctg = btn_ctg.nextElementSibling;   // On récupère la structure ul en prenant l'élément suivant au bouton btn_ctg
  const newUl_ctg = fill_categorie(ctg);          // Création de la structure ul comportant les catégories
  const parent_ctg = btn_ctg.parentNode;          // On récupère l'élément parent de btn_ctg
  
  parent_ctg.replaceChild(newUl_ctg, oldUl_ctg);

}
