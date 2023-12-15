function validate() {
    const pass = document.getElementById('password').value
    const Pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let show = document.getElementById('show')
    let values = pass
    console.log(values);
    const test = Pattern.test(values)

    if (!test) {

        show.style.display = "block"

    } else {
        show.style.display = "none"
    }
}
module.exports = validate