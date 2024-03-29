function date_() {
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const year = now.getFullYear();
    const formattedDate = day + '/' + month + '/' + year;
    // console.log(formattedDate); // affiche la date sous la forme JJ/MM/AAAA
    return formattedDate
};

function heure_h24() {
    const now = new Date();
    const hours = ('0' + now.getHours()).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const minutes = ('0' + now.getMinutes()).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const seconds = ('0' + now.getSeconds()).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const formattedTime = hours + ':' + minutes + ':' + seconds;
    // console.log(formattedTime); // affiche l'heure sous format 24h (ex: 14:23:58)
    return formattedTime
};





function recup_data(button, i) {

  const input = document.getElementById('images');
  const files = input.files;
  const file      = files[i];
  const file_name = file.name;
  console.log(file_name)
    const stock_data = {};
    const regex2 = /\s(\S+)$/;
    let res_label = document.getElementById("btn_cat_id" + i);
    let res_model = document.getElementById("btn_id" + i);
    let res_pred = document.getElementById("pred_id" + i);
    let res_img = document.getElementById("img_id" + i);
    let res_label_model = document.getElementById("label_id" + i);
    const  Heure = heure_h24();
    const date = date_();
    if (res_label.textContent !== null & res_model.textContent !== null) {
      res_label = res_label.textContent;
      res_model= res_model.textContent;
      res_pred = res_pred.textContent;
      res_img = res_img.src;
      res_label_model = res_label_model.textContent;
    };
    stock_data["nomimage"] = file_name; // Nom de l'image
    stock_data["imgB64"] = res_img; // Image au format 64
    stock_data["date"] = date; // Date récupérer
    stock_data["heure"] = Heure; // Heure récupérer
    stock_data["ctgbyuser"] = res_label; // Label choisi par l'utilisateur pour le monitoring
    stock_data["ctgbymodel"] = res_label_model; // Label prédit par le model
    stock_data["namemodel"] = res_model; // Nom du modèle
    stock_data["accuracy"] = res_pred; // Précision du modèle

    const url = 'monitoring'; // URL de votre endpoint Django
    const csrftoken = $('input[name="csrfmiddlewaretoken"]').val() // collecter le token CSRF

    $.ajaxSetup({
      headers: {
        'X-CSRFToken': csrftoken // Ajouter le token CSRF en tant qu'en-tête
      }
    });

    $.ajax({
      url: url, // l'URL à laquelle envoyer les données.
      type: "POST", //  la méthode HTTP à utiliser.
      data: stock_data, // les données à envoyer.
      success: function(response) { // la fonction à exécuter si la requête est réussie.
        console.log("Données envoyées avec succès !");
        console.log(response)
      },
      error: function(jqXHR, textStatus, errorThrown) { // la fonction à exécuter si la requête échoue.
        console.error("Une erreur s'est produite lors de l'envoi des données : " + textStatus, errorThrown);
      }
    });

}
