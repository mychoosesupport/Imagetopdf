import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

window.generatePDF = async function () {
  const input = document.getElementById("fileInput");
  if (input.files.length === 0) {
    alert("Please select at least one image.");
    return;
  }

  const pdf = new jsPDF(); // Portrait, A4 by default
  let firstPage = true;

  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i];

    const imgData = await readFileAsDataURL(file);
    const image = await loadImage(imgData);

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    if (!firstPage) {
      pdf.addPage();
    } else {
      firstPage = false;
    }

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  pdf.save("converted.pdf");
};

// Helper functions
function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
}
