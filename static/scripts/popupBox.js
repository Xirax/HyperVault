
class PopupBox{
    static show(message, color, fadeSpeed=3000){
        document.getElementById('popupFrame').style.display = 'flex';
        PopupBox.fadeIn(document.getElementById('popupFrame'), 0);
        document.getElementById('popupBox').style.backgroundColor = color;
        document.getElementById('popupMessage').innerText = message;

        setTimeout(() => {
            PopupBox.fadeOut(document.getElementById('popupFrame'), 1);
        }, fadeSpeed);
    }

    static fadeIn(element, startVal){
        if(element.style.opacity < 1){
            console.log(startVal);
            setTimeout(() => {
                element.style.opacity = startVal;
                PopupBox.fadeIn(element, startVal + 0.05);
            }, 9)
        }
        else element.style.opacity = 1;
    }

    static fadeOut(element, startVal){
        if(element.style.opacity > 0){
            setTimeout(() => {
                element.style.opacity = startVal;
                this.fadeOut(element, startVal - 0.05);
            }, 9)
        }
        else {
            element.style.opacity = 0;
            element.style.display = 'none';
        }
    }
}