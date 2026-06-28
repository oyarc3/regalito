document.addEventListener("DOMContentLoaded", () => {

    const canams = document.querySelectorAll(".canam");

    console.log("CanAm encontrados:", canams.length);

    canams.forEach(c => {

        c.addEventListener("click", () => {

            alert("FUNCIONA 🚙");

        });

    });

});
