function date() {
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const year = now.getFullYear();
    const formattedDate = day + '/' + month + '/' + year;
    console.log(formattedDate); // affiche la date sous la forme JJ/MM/AAAA
};

function heure_h24() {
    const now = new Date();
    const hours = ('0' + now.getHours()).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const minutes = ('0' + now.getMinutes()).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const seconds = ('0' + now.getSeconds()).slice(-2); // ajoute un zéro devant si nécessaire et prend les deux derniers caractères
    const formattedTime = hours + ':' + minutes + ':' + seconds;
    console.log(formattedTime); // affiche l'heure sous format 24h (ex: 14:23:58)
};

function recup_data(button, i) {
    const stock_data = {date : "date", cat_modele : "cat_modele"};
    const regex2 = /\s(\S+)$/;
    let res_label = document.getElementById("btn_cat_id" + i);
    let res_model = document.getElementById("btn_id" + i);
    if (res_label.textContent !== null & res_model.textContent !== null) {
      res_label = res_label.textContent.match(regex2)[1].trim();
      res_model= res_model.textContent.match(regex2)[1].trim();
    };
    
  }
//   const now = new Date();
//   const hours = now.getHours();
//   console.log(now)








