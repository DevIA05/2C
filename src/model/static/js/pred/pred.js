const input = document.getElementById('images');
const preview = document.getElementById('container_img');

input.addEventListener('change', () => {
    const files = input.files;

    let counter = 0;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        counter++;
        const file_name = file.name;

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                const img = new Image();
                img.src = reader.result;
                const card = document.createElement("div")
                const card_html = `
                <div class="card" style="width: 12rem;">
                <img src="${img.src}" id="${file_name}" class="card-img-top" alt="Avatar">
                <div class="card-body">
                  <h5 class="card-title">
                    ${file_name}
                  </h5>
                  <button onclick="view_details(this)" type="button" name="${file_name}" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_${counter}_${file_name}">Voir détails</button>
                  <div class="modal fade" id="exampleModal_${counter}_${file_name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <img src="${img.src}" class="img-thumbnail" alt="Avatar">
                              </div>
                              <div class="col-lg-4 col-md-4 col-sm-12">
                                <div>
                                  <h5 class="button-title">
                                    Selection catégorie
                                  </h5>
                                  <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Catégorie</button>
                                    <ul class="dropdown-menu">
                                      <li><a class="dropdown-item" href="#">Catégorie 1</a></li>
                                      <li><a class="dropdown-item" href="#">Catégorie 2</a></li>
                                      <li><a class="dropdown-item" href="#">Catégorie 3</a></li>
                                    </ul>
                                  </div>
                                  <div class="input-group mb-3">
                                    <h5 class="title">
                                      Crée catégorie
                                    </h5>
                                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                                  </div>
                                  <div>
                                    <button onclick="show_pred()" class="btn btn-secondary" type="button">Prédire</button>
                                    <h4 id="pred_${file_name}"></h4>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
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
});