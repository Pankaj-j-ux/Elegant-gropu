/** @format */

const scriptURL =
  "https://academy-apiv3.herokuapp.com/api/V1/adddata/1OVMlAToan0iYTY15i6gCER8IXpdZ5cZY_oWkkE0Y82Y";

const forms = document.forms["lead"];
const model_body = document.getElementById("model-body");
const download1 = document.getElementById("Download1");
const findout1 = document.getElementById("Find-Out1");
const findout2 = document.getElementById("Find-Out2");
var notifys = document.getElementById("notify");
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

// SHOW SUCCESS IN FORM
const showSuccess = (message) => {
  notifys.textContent = message;
  notifys.className = "alert alert-success";
};

// SHOW ERROR IN FORM
const ShowWarn = (message) => {
  notifys.textContent = message;
  notifys.className = "alert alert-danger";
};

const thankyou = () => {
  model_body.innerHTML =
    '<div class="thankyou text-center"><img src="./Assets/Img/thankyou.gif" class="img-fluid" > <h5 class="" style=" font-weight:bold; padding:10px">We are soo glad that you connected with us We look forward to being a part of your career Our team will contact you soon for more details.</h5></div>';
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

  if (_.isEmpty(FirstName.value)) {
    return ShowWarn("First name cannot be empty");
  }
  if (_.isEmpty(LastName.value)) {
    return ShowWarn("Last name cannot be empty");
  }
  if (_.isEmpty(Email.value)) {
    return ShowWarn("Email cannot be empty");
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value)) {
    return ShowWarn("Please enter a valid Email");
  }
  if (_.isEmpty(Phone.value)) {
    return ShowWarn("Phone number is required");
  }
  if (Phone.value.length > 10) {
    return ShowWarn("Phone number must consist of 10 numbers");
  }
  if (Phone.value.length !== 10) {
    return ShowWarn("Phone number must consist of 10 numbers");
  }
  if (!/^(?:\W*\d){10}\W*$/.test(Phone.value)) {
    return ShowWarn("Phone number is invalid");
  }

  if (_.isEmpty(City.value)) {
    return ShowWarn("City name is required");
  }

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
