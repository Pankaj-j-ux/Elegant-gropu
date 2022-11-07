/** @format */

const scriptURL =
  "https://academy-apiv3.herokuapp.com/api/V1/adddata/1OVMlAToan0iYTY15i6gCER8IXpdZ5cZY_oWkkE0Y82Y";

const forms = document.forms["lead"];
const model_body = document.getElementById("model-body");
const download1 = document.getElementById("Download1");
const findout1 = document.getElementById("Find-Out1");
const findout2 = document.getElementById("Find-Out2");
var isDownload = false;
var once = false;

download1.addEventListener("click", () => {
  isDownload = true;
});

findout1.addEventListener("click", () => {
  isDownload = false;
});

findout2.addEventListener("click", () => {
  isDownload = false;
});

const thankyou = () => {
  model_body.innerHTML =
    '<div class="text-center"><img src="./Assets/Img/thankyou.gif" class="img-fluid" > <h5 class="fixed-bottom position-absolute" style="bottom:50px; font-weight:bold;padding:10px">We are soo glad that you connected with us We look forward to being a part of your career Our team will contact you soon for more details.</h5></div>';
};

const downloadFile = (url, fileName) => {
  let link = document.createElement("a");

  link.setAttribute("download", fileName);
  link.href = url;

  document.body.appendChild(link);
  link.click();
  link.remove();
};

forms.addEventListener("submit", async (event) => {
  document.getElementById("submit").innerText = " .  .  .  . ";
  event.preventDefault();
  console.log("CHECK");
  const formData = new FormData(forms);

  // DDEFINE ALL THE FIELDS LIKE THIS IN VARIBLE

  const FirstName = forms.elements["FirstName"];
  const LastName = forms.elements["LastName"];
  const Email = forms.elements["Email"];
  const Phone = forms.elements["Phone"];
  const City = forms.elements["City"];

  await fetch(scriptURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FirstName: FirstName.value,
      LastName: LastName.value,
      Email: Email.value,
      Phone: Phone.value,
      City: City.value,
    }),
  })
    .then((response) => {
      //   console.log(response);
      if (isDownload) {
        console.log("DOWNLOAD");
        downloadFile(
          "./Assets/Doc/NANDIPET BROUCHER NEW PRICE.pdf",
          "NANDIPET BROUCHER NEW PRICE"
        );
      }
      thankyou();
      once = true;
    })

    .catch((err) => {
      console.log(err);
      //   document.getElementById("submit").innerText = "Submit";
    });
});
