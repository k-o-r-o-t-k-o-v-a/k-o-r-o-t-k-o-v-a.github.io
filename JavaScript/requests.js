function sleep(milliseconds) {

    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

window.addEventListener('load', () => {

    let id = 1;
    const preloader = document.getElementById("preloader");
    const cards = document.getElementById("cards");
    const button = document.getElementById("add-card");



    button.addEventListener('click', async function (e) {
        button.disabled = true;
        const card = document.getElementById("one-card").content.cloneNode(true);
        const card_body = card.getElementById("card-body");
        const card_title_h1 = card.querySelector("h1");
        preloader.classList.remove('disabled');

        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
            if (response.ok) {
                let json = await response.json();
                card_title_h1.innerHTML = json.title;
                card_body.innerHTML = json.body;
                id = id + 1;
                sleep(1000);
                preloader.classList.add('disabled');
                cards.insertBefore(card, preloader);
            }
            else
            {
                alert("Error1");
            }
            button.disabled = false;
        } catch (error)
        {
            alert("Error2");
            preloader.classList.add('disabled');
            button.disabled = false;
        }
    });
})
