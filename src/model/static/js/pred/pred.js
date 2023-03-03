const input = document.getElementById('images');
const preview = document.getElementById('container_img');
const list_modele = ["M1", "M2", "M3"]


let test_mod = [ {name_Modele : 'M1',
                  list_Label : ['Chien', 'Chat', 'Tortue']},
                  {name_Modele : 'M1',
                  list_Label : ['Clavier', 'Souris', 'Ecran']},
                  {name_Modele : 'M1',
                  list_Label : ['Chaise', 'Bureau', 'pizza']},
];

// // console.log(test_mod[0].list_Label)
// let array_label = test_mod[0].list_Label
// let x = array_label.entries()
// for ( let i of x) {
//   console.log(i)
// };


// for (let i = 0; i < test_mod.length; i++) {
//   let name_Modele = test_mod[i].name_Modele;
//   let list_Label = test_mod[i].list_Label.join(", ");
//   console.log(`Nom du modèle: ${name_Modele}, et sa liste des labels: ${list_Label}`);
// };
 
// function test_fill() {  
// }

const dict_label = [
  { label: "chien", accuracy: 0.5 },
  { label: "chat", accuracy: 0.6 },
  { label: "pizza", accuracy: 0.9 },
  { label: "burger", accuracy: 0.4 },
  { label: "frite", accuracy: 0.2 }
];

const labels = dict_label.map((item) => item.label);
  // console.log(labels);

// dict_label.forEach((item) => {
//   console.log(item.label, item.accuracy);
// });

function fill_categorie() {
  const ul = document.createElement("ul");
  ul.classList.add("dropdown-menu");

  
  for (let i = 0; i < labels.length; i++) {
    const li = document.createElement("li");
    li.classList.add("dropdown-item");
    li.textContent = `Label: ${labels[i]}`;
    ul.appendChild(li);
    
  }
  return ul
}


function fill_dropdown(id){
  const ul = document.createElement("ul");
  ul.classList.add("dropdown-menu");

  for (let i = 0; i < list_modele.length; i++) {
    const li = document.createElement("li");
    li.classList.add("dropdown-item");
    li.classList.add("cli" + id);
    li.textContent = `Modele: ${list_modele[i]}`;
    ul.appendChild(li);
    
  }
  return ul
}


input.addEventListener('change', () => {
    const files = input.files;
    

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        
        const file_name = file.name;
        const id = "id" + i;
        const func_drop = fill_dropdown(i)
        const fill_cat = fill_categorie(i)
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
                  
                    <button onclick="view_details(this)" name="${file_name}" type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_${id}">Voir détails</button>
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
                                      <button id="btn_id${i}" onclick="select_btn(this)" name="btn_select" class="btn btn-secondary dropdown-toggle" type="button"data-bs-toggle="dropdown" aria-expanded="false">
                                      Modele
                                      </button>
                                      ${func_drop.outerHTML}
                                    </div>
                                    
                                    <br><br>
                                    <div>
                                      <button onclick="show_pred(${i})" class="btn btn-secondary" type="button">Prédire</button>
                                      <h4 id="pred_${id}"></h4>
                                      </div>
                                  </div>
                              
                                  <h5 class="button-title">
                                      Faire le monitoring
                                    </h5>
                                    <div class="dropdown">
                                      <button id="btn_cat_id${i}" onclick="select_btn(this)" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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

function select_btn(button) {
  const parentDiv = button.parentNode;
  let btn = document.getElementById(button.id);
  const ulElement = button.nextElementSibling;
  const dropdownItems = ulElement.querySelectorAll("li");
  const regex2 = /\s(\S+)$/;
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedText = item.textContent.trim();
      btn.textContent = selectedText;
      // if (selectedText.includes("Modele")) txt_model = selectedText.match(regex2)[1];
      // if (selectedText.includes("Label")) txt_label = selectedText.match(regex2)[1];
      
    });
  });
  
}



