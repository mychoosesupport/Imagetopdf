async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const input = document.getElementById("fileInput");
  if (!input.files.length) return alert("Please select images");

  const pdf = new jsPDF();
  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i];
    const imgData = await toDataURL(URL.createObjectURL(file));
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 15, 15, 180, 160);
  }
  pdf.save("converted.pdf");
}

function toDataURL(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.getContext("2d").drawImage(this, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.src = url;
  });
}
