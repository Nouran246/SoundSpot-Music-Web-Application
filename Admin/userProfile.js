document.addEventListener('DOMContentLoaded', function () {
    var usernameElement = document.getElementById('username');

    var username = usernameElement.textContent;

    usernameElement.textContent = '@' + username;

});
document.addEventListener('DOMContentLoaded', function () {

    const isPremium = true;
    const isFree = false;

    const isAuthEnabled = true;

    const freeOption = document.getElementById('free');
    const premiumOption = document.getElementById('premium');
    const familyOption = document.getElementById('family');

    if (isPremium) {
        premiumOption.classList.add('selected');
    } else if (isFree) {
        freeOption.classList.add('selected');
    }
    else {
        familyOption.classList.add('selected');
    }
    
    const enableAuthen = document.getElementById('enable-authen');
    const disableAuthen = document.getElementById('disable-authen');
    if (isAuthEnabled) {
        enableAuthen.classList.add('selected');
    } else {
        disableAuthen.classList.add('selected');
    }
});
