let name_img; 
let id_btn;
function view_details(button) { 
    name_img = button.getAttribute('name')
}

function show_pred(i) {
    id_btn = i
    const dataURL = imgToBase64("img_id" + id_btn)

    d = {"name": name_img, "image": dataURL}
    dataRequest(d)
}

function imgToBase64(name_img){
    const img = document.getElementById(name_img)
    
    // Create a new canvas element
    const canvas = document.createElement('canvas');

    // Set the canvas dimensions to the same as the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Get the canvas context and draw the image on the canvas
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);

    // Convert the canvas data to a Base64-encoded string
    const dataURL = canvas.toDataURL('image/png');

    return dataURL

}

function dataRequest(d){
    const csrf  = $('input[name="csrfmiddlewaretoken"]').val()   // collect token
    // ------------------- Send data to view -------------------
    $.ajax({
        type: "POST",
        url: 'makesThePrediction', // Name of the django view that will retrieve the data, 
                                // Perform an asynchronous HTTP (Ajax) request. 
        data: {
            csrfmiddlewaretoken : csrf,
            "result": d,       // data to send
        },
        dataType: "json",     // The type of data that you're expecting back from the server.
        // ------------------- Receiving data from the view -------------------
        success: function (response) {
            const acc = response["acc"]
            const imgname = response["name"]
            const h5 = document.getElementById("pred_id" + id_btn)
            h5.innerHTML = acc
        },
        failure: function () {
            alert("failure");
        }
    })
  }